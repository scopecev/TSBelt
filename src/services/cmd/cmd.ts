import {Service} from "@tsed/common";
import * as child from 'child_process';

@Service()
export class CMDService {

    private states: Map<string, string> = new Map<string, string>();

    constructor() {

    }

    /**
     * Return the value stored.
     * @param key
     */
    public man(name: string) : Promise<string> {
        return this.run("man " + name + " | col -bx");
    }

    /**
     * Return the value stored.
     * @param key
     */
    public help(name: string) : Promise<string> {
        return this.run( name + " -help | col -bx");
    }

    /**
     * Return the value stored.
     * @param key
     */
    public manToFile(name: string) : Promise<string> {
        return this.run("man " + name + " | col -bx > resources/man/txt/" + name + ".txt");
    }

    /**
     * Return list of commands.
     */
    public list() : Promise<string> {
        return this.run("compgen -c");
    }

    /**
     * Serialize value and store it.
     * @param key
     * @param value
     */
    public set = (key: string, value: any) => this.states.set(key, JSON.stringify(value));

    /**
     * run cmd.
     * @param key
     */
    private run(order: string) : Promise<string> {
        return new Promise<string>((resolve,reject)=>{
            child.exec(order, (error: child.ExecException, stdout: string, stderr: string) => {
                if (error) {
                    console.log(`exec error: ${error}`);
                    reject(error);
                }
                // console.log(`${stdout}`);
                console.log(`${stderr}`);
                resolve(stdout);
            });
        });
        

    }
}
