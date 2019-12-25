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
import { CMDService } from "../../services/cmd/cmd";

const JavaAST = require('./javaAST');
import { X_OK } from "constants";
const mulang = require('mulang')


/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 */
@Controller("/mulang")
export default class MulangCtrl {

    constructor( private cmdService: CMDService ) {

    }

    @Get("/")
    async getAllServices(): Promise<string> {
        var path = "/Users/d062254/Documents/4me/forme-backend/src/main/java/com/sap/me";
        var javaFileNames = await getFiles(path, "java", true);
        var Files = await Promise.all(javaFileNames.map(fName => {
            fileContents(fName);
        }));


        var vertxBaseClassNames = ["DataVerticle","EntityVerticle"];
        var ast;
        return this.cmdService.runJavaParserOnPath("/Users/d062254/Documents/4me/forme-backend/src/main/java/com/sap/me/entities/PortfolioCategoriesVerticle.java");
        var a = Files.map((content) => {
            // JavaAST.parse(content);
            return this.cmdService.runJavaParserOnPath("/Users/d062254/Documents/4me/forme-backend/src/main/java/com/sap/me/entities/PortfolioCategoriesVerticle.java");
            /*
            try {
                ast = mulang.analyse({
                    "sample": {
                        "tag": "CodeSample",
                        "language": "Java",
                        "content": content
                    },
                    "spec": {
                        "includeIntermediateLanguage": true
                    }
                });
                if ( ast.intermediateLanguage && ast.intermediateLanguage.tag == "Class" ) {
                    ast = ast.intermediateLanguage;
                    if( vertxBaseClassNames.includes(ast.contents[1]) ) {
                        return ast;
                    }
                }
                return JavaAST.parse(content);
            } catch (error) {
                console.log(content);
            }
            */
        }).filter( x => x!=null );
        // return new Promise<string[]>( (resolve, reject) => resolve(a) );
    }
}

function fileContents (fPath) {
    return new Promise<string>( (resolve, reject) => {
        readFile(fPath,{ encoding: "utf8" }, (err, data) => {
            if (err) throw err;
            // console.log(data);
            resolve(data);
        });
    });
}

function getFiles ( path: string, typeEnding: string = "java", w: boolean = false): Promise<string[]> {
    var seperator = "/";
    var currentFolderName = path.substr(path.lastIndexOf(seperator)+1);
    var promise = new Promise<string[]>( (resolve, reject) => {
        var filePaths = [];
            readdir(path,{
            encoding: "utf8",
            withFileTypes: true
        }, async (err, files) => {
            
            if( err ) { 
                return reject(err);
            }
            else if( !files ) { 
                return resolve();
            }

            await Promise.all(files.map( async (f) => {
                if (f.name.endsWith("." + typeEnding)) {
                    filePaths.push(path + seperator + f.name);
                } else if ( f.isDirectory ) {
                    return getFiles(path + "/" + f.name);
                }
            }).filter(f => f!=null))
            .then((directories) => {
                if( directories ) {
                    directories.map((dir) => {
                        if( dir ) {
                            filePaths = filePaths.concat(dir);
                        }
                    });
                }
                resolve(filePaths);
            }).catch((reason) => {
                resolve(filePaths);
                // reject(reason)
            });
        });
    });
    
    return promise;
}
