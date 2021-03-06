/*
export as namespace wtf;
export = wtf;

declare interface wtf {
    fetch():string;
}
*/
/** Declaration file generated by dts-gen */

export = wtf_wikipedia;

declare function wtf_wikipedia(wiki: string, options?: any): wtf_wikipedia.Document;

declare namespace wtf_wikipedia {
    class Document {
        text():string;
        categories():[string];
        sections():[Section];
        sections(nr:number):Section;
        sentences():[Sentence];
        sentences(nr:number):Sentence;
    }

    class Section {
        text():string;
        links():[{page:string}];
    }

    class Sentence {
        text():string;
    }
    const version: string;

    function category(cat: any, lang: any, options: any, cb: any): any;

    function fetch(title: string, lang?: string, options?: object,
        cb?: (err:Error, doc:Document )=>void): Promise<Document>;

    function random(lang: any, options: any, cb: any): any;

}