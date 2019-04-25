
export as namespace nlp;
export = nlp;
declare function nlp(str: string, lexicon?: any): nlp.nlp;

declare namespace nlp {

    interface nlp {
        data(): [object];
        found(): boolean;
        match(str: string):nlp;
        sentences(nr?: number): nlp;
        nouns(): nlp;
        terms(): nlp;
        /**
        render parsed data as an output. supports `text`, `normal`, `array`, `html`, `grid`, `color`, `debug`, `csv`
        @param {string} type
        */
        out(type?: string): string;
    }
    
}
    