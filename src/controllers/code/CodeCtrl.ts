import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
    Status
} from "@tsed/common";
import "../../extensions";
import { readFile, readdir } from "fs";
import { VertileSource } from "./VerticleSource";
import { CMDService } from "../../services/cmd/cmd";
import { MemoryStorage } from "../../services/storage/MemoryStorage";

import * as jsonata from "jsonata";
import { AssertionError } from "assert";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 */
@Controller("/code")
export default class CodeCtrl {

    constructor(private memoryStorage: MemoryStorage, private cmdService: CMDService) {
		
	}

    @Get("/")
    async getAllServices(): Promise<string> {
        var path = "/Users/d062254/Documents/4me/forme-backend/src/main/java/com/sap/me";
        var javaFileNames = this.memoryStorage.get<string[]>("files");
        if( true || !javaFileNames ) {
            javaFileNames = await getFiles(path, "java", true);
            this.memoryStorage.set("files", javaFileNames);
        }
        
        
        var Sources = await Promise.all(javaFileNames.map( fName => {
            var source:VertileSource  = this.memoryStorage.get(fName);

            if( source ) {
                return Promise.resolve( source )
            }

            source = new VertileSource(fName);

            return Promise.all([ source.readFileContents(), source.parseSource()]).then( (results) => {
                this.memoryStorage.set(fName,source);
                return source;
            });
        }));

        var vertxBaseClassNames = ["DataVerticle","EntityVerticle"];

        var a = Sources.map((source) => {
            var verticleAst = source.ast.types[0];
            var verticleName = verticleAst.name.identifier;
            var extendedTypes = jsonata("extendedTypes[*].name.identifier").evaluate(verticleAst);
            
            var requireDataBody = jsonata("members[name.identifier='requireData'].body.statements").evaluate(verticleAst);
            var dataRequests = jsonata("**[(type.name.identifier='DataRequest')].arguments[(`!`='com.github.javaparser.ast.expr.FieldAccessExpr') and (name.identifier='NAME')].scope.name.identifier").evaluate(requireDataBody);
            // var dataRequests = jsonata("[`!`='com.github.javaparser.ast.stmt.ObjectCreationExpr' and type.name.identifier='DataRequest']").evaluate(requireDataBody);
            // ! : "com.github.javaparser.ast.expr.ObjectCreationExpr"
            // var returnAst = jsonata("[`!`='com.github.javaparser.ast.stmt.ReturnStmt'].expression").evaluate(requireDataBody);
            
            return { name: verticleName, dataRequests: dataRequests };
        });

        return JSON.stringify(a);
    }
}

async function fileContents (fPath) : Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        readFile(fPath,{ encoding: "utf8" }, (err, data) => {
            if (err) throw err;
            // console.log(data);
            resolve(data);
        });
    });
}

async function getFiles ( path: string, typeEnding: string = "java", w: boolean = false): Promise<string[]> {
    var seperator = "/";
    var currentFolderName = path.substr(path.lastIndexOf(seperator)+1);
    var promise = new Promise<string[]>( (resolve, reject) => {
        readdir(path, {
            encoding: "utf8",
            withFileTypes: true
        }, async (err, files) => {
            
            if( err ) { 
                return reject(err);
            }
            else if( !files ) { 
                return resolve();
            }
            var x;
            await Promise.all(files.map(  (f) => {
                if (f.name.endsWith("." + typeEnding)) {
                    return [path + seperator + f.name];
                } else if ( f.isDirectory ) {
                    return getFiles(path + "/" + f.name);
                }
            }).filter(f => f!=null))
            .then((directories) => {
                x = directories.reduce( (a,b) => a.concat(b));
                resolve(x);
            }).catch((reason) => {
                console.error(reason);
                // resolve([]);
                // reject(reason)
            }).finally(() => {
                resolve(x);
            });
        });
    });
    
    return promise;
}
