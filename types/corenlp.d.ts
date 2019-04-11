export class ConnectorCli {
    constructor({
        classPath,
        mainClass,
        props
    }: any);
    get({
        annotators,
        text
        // TODO options,
        // TODO language
    }: any): any;
}
export class ConnectorServer {
    constructor({ dsn, username, password }: any);
    get({ annotators, text, options, language, utility }: any): any;
}
export class Pipeline {
    constructor(properties: any, language: any, connector: any);
    annotate<T extends _default.simple.Annotable>(annotable: T ): Promise<T>;
    annotateSemgrex(annotable: any, annotateExpression: any): any;
    annotateTokensRegex(annotable: any, annotateExpression: any): any;
    annotateTregex(annotable: any, annotateExpression: any): any;
    assert(methodName: any, requiredAnnotators: any): void;
    getService(): any;
}
export class Properties {
    constructor(props: any);
    getProperties(): any;
    getProperty(name: any, defaultValue: any): any;
    setProperty(name: any, value: any): void;
    toJSON(): any;
    toPropertiessFileContent(): any;
}
export class Service {
    static getGovernorDepInfo(dep: any): any;
    static getSentenceParseInfo(group: any, languageISO: any): any;
    static getTokenPosInfo(pos: any, languageISO: any): any;
    constructor(connector: any, language: any);
    getAnnotationData(text: any, annotators: any, options: any): any;
    getSemgrexData(text: any, pattern: any, annotators: any, options: any): any;
    getTokensRegexData(text: any, pattern: any, annotators: any, options: any): any;
    getTregexData(text: any, pattern: any, annotators: any, options: any): any;
}

declare class Tree { }

export default _default;
export namespace _default {
    export namespace  simple {
        export class Annotable { }
        export class Annotator { }
        export class Document { }
        export class Expression { }
        export class Sentence extends Annotable { 
            constructor(text:string);
            word(inex: number): string;
            words(): string[];
            nerTag(inex: number): string;
            nerTags(): string[];
            toJSON(): {};
        }
        export class Token { }
        export namespace annotator {
            export class CorefAnnotator { }
            export class DependencyParseAnnotator { }
            export class MorphaAnnotator { }
            export class NERClassifierCombiner { }
            export class POSTaggerAnnotator { }
            export class ParserAnnotator { }
            export class RegexNERAnnotator { }
            export class RelationExtractorAnnotator { }
            export class TokenizerAnnotator { }
            export class WordsToSentenceAnnotator { }
        }
        export namespace util {
            export class Tree { }
        }
    }
}