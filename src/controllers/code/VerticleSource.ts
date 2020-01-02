
import { CMDService } from "../../services/cmd/cmd";
import { MemoryStorage } from "../../services/storage/MemoryStorage";
import { readFile } from "fs";

export class VertileSource {
    content: string;
    ast: any;
    constructor(private path : string) {
        
    }

    async readFileContents () : Promise<string> {
        return new Promise<string>( (resolve, reject) => {
            readFile(this.path ,{ encoding: "utf8" }, (err, data) => {
                if (err) throw err;
                // console.log(data);
                this.content = data;
                resolve(data);
            });
        });
    }

    async  parseSource () : Promise<any> {
        this.ast = JSON.parse( await (new CMDService()).runJavaParserOnPath(this.path));
        return Promise.resolve(this.ast);
    }

    
}