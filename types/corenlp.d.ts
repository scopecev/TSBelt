/**
 * @class
 * @classdesc Class representing a Connector CLI (command line interface client)
 */
export class ConnectorCli {
    constructor(config: {
        classPath: string;
        mainClass: string;
        props: string;
    });
    /**
     * @returns {Promise<Object>}
     */
    get(): Promise<any>;
    /**
     * @returns {Promise<Object>}
     */
    get(): Promise<any>;
}

/**
 * @class
 * @classdesc Class representing a Connector Server (web server client)
 */
export class ConnectorServer {
    constructor(config: {
        dsn: string;
        username?: string;
        // username?: string;
    });
    /**
     * @param {Object} config
     * @param {Array.<string>} config.annotators - The list of annotators that defines the pipeline
     * @param {string} config.text - The text to run the pipeline against
     * @param {Object} config.options - Additinal options (properties) for the pipeline
     * @param {string} config.language - Language full name in CamelCase (eg. Spanish)
     * @param {(''|'tokensregex'|'semgrex'|'tregex')} [utility] - Name of the utility to use
     * NOTE: most of the utilities receives properties, these should be passed via the options param
     * @returns {Promise<Object>}
     */
    get(config: {
        annotators: string[];
        text: string;
        options: any;
        language: string;
    }, utility?: '' | 'tokensregex' | 'semgrex' | 'tregex'): Promise<any>;
    /**
     * @param {Object} config
     * @param {Array.<string>} config.annotators - The list of annotators that defines the pipeline
     * @param {string} config.text - The text to run the pipeline against
     * @param {Object} config.options - Additinal options (properties) for the pipeline
     * @param {string} config.language - Language full name in CamelCase (eg. Spanish)
     * @param {(''|'tokensregex'|'semgrex'|'tregex')} [utility] - Name of the utility to use
     * NOTE: most of the utilities receives properties, these should be passed via the options param
     * @returns {Promise<Object>}
     */
    get(config: {
        annotators: string[];
        text: string;
        options: any;
        language: string;
    }, utility?: '' | 'tokensregex' | 'semgrex' | 'tregex'): Promise<any>;
}

export namespace CoreNLP {
    /**
     * @namespace CoreNLP/simple
     * @description NodeJS API that emulates {@link https://stanfordnlp.github.io/CoreNLP/simple.html}
     */
    namespace simple {
        /**
         * @class
         * @classdesc Class representing an Annotable
         * @memberof CoreNLP/simple
         */
        class Annotable {
            constructor(text: string);
            /**
             * Get a string representation of the raw text
             * @return {string} text
             */
            text(): string;
            /**
             * Sets the language ISO (given by the pipeline during the annotation process)
             * This is solely to keep track of the language chosen for further analysis
             * The language string should be passed in lowercase ISO2 format
             * @return {string} text
             */
            setLanguageISO(): string;
            /**
             * Retrieves the language ISO (in lowercase ISO2 format)
             * @return {string} iso
             */
            getLanguageISO(): string;
            /**
             * Marks an annotator as a met dependency
             * @param {Annotator|function} annotator
             */
            addAnnotator(annotator: Annotator | ((...params: any[]) => any)): void;
            /**
             * Marks multiple annotators as a met dependencies
             * @param {Array.<Annotator|function>} annotators
             */
            addAnnotators(annotators: (Annotator | ((...params: any[]) => any))[]): void;
            /**
             * Unmarks an annotator as a met dependency
             * @param {Annotator|function} annotator
             */
            removeAnnotator(annotator: Annotator | ((...params: any[]) => any)): void;
            /**
             * Tells you if an annotator is a met dependency
             * @param {Annotator|function} annotator
             * @returns {boolean} hasAnnotator
             */
            hasAnnotator(annotator: Annotator | ((...params: any[]) => any)): boolean;
            /**
             * Tells you if at least on of a list of annotators is a met dependency
             * @param {Array.<Annotator|function>} annotators
             * @returns {boolean} hasAnyAnnotator
             */
            hasAnyAnnotator(annotators: (Annotator | ((...params: any[]) => any))[]): boolean;
            /**
             * Get a string representation of the raw text
             * @return {string} text
             */
            text(): string;
            /**
             * Sets the language ISO (given by the pipeline during the annotation process)
             * This is solely to keep track of the language chosen for further analysis
             * The language string should be passed in lowercase ISO2 format
             * @return {string} text
             */
            setLanguageISO(): string;
            /**
             * Retrieves the language ISO (in lowercase ISO2 format)
             * @return {string} iso
             */
            getLanguageISO(): string;
            /**
             * Marks an annotator as a met dependency
             * @param {Annotator|function} annotator
             */
            addAnnotator(annotator: Annotator | ((...params: any[]) => any)): void;
            /**
             * Marks multiple annotators as a met dependencies
             * @param {Array.<Annotator|function>} annotators
             */
            addAnnotators(annotators: (Annotator | ((...params: any[]) => any))[]): void;
            /**
             * Unmarks an annotator as a met dependency
             * @param {Annotator|function} annotator
             */
            removeAnnotator(annotator: Annotator | ((...params: any[]) => any)): void;
            /**
             * Tells you if an annotator is a met dependency
             * @param {Annotator|function} annotator
             * @returns {boolean} hasAnnotator
             */
            hasAnnotator(annotator: Annotator | ((...params: any[]) => any)): boolean;
            /**
             * Tells you if at least on of a list of annotators is a met dependency
             * @param {Array.<Annotator|function>} annotators
             * @returns {boolean} hasAnyAnnotator
             */
            hasAnyAnnotator(annotators: (Annotator | ((...params: any[]) => any))[]): boolean;
        }
        /**
         * @class
         * @classdesc Class representing an Annotatror
         * @memberof CoreNLP/simple
         */
        class Annotator {
            constructor(name: string, options?: any, dependencies?: Annotator[]);
            /**
             * Get a string representation
             * @return {string} annotator
             */
            toString(): string;
            /**
             * Defines whether a given annotator is the same as current, using shallow compare.
             * This is useful for a Document or Sentence to validate if the minimum of annotators required
             * were already applied to them.  Allows at the same time the users to instantiate new annotators
             * and configure them as needed.
             * @param {Annotator} annotator
             * @return {boolean}
             */
            equalsTo(annotator: Annotator): boolean;
            /**
             * Get an Object key-value representation of the annotor's options (excluding prefix)
             * @return {Object} options
             */
            options(): any;
            /**
             * Get/Set an option value
             * @param {string} key
             * @param {string|boolean} [value]
             * @return {string} value
             */
            option(key: string, value?: string | boolean): string;
            /**
             * Get a list of annotators dependencies
             * @return {Array.<Annotator>} dependencies
             */
            dependencies(): Annotator[];
            /**
             * Get a list of annotators dependencies, following by this annotator, all this as
             * a list of strings
             * This is useful to fulfill the `annotators` param in CoreNLP API properties.
             * @return {Array.<string>} pipeline
             */
            pipeline(): string[];
            /**
             * Get an object of all the Annotator options including the current and all its
             * dependencies, prefixed by the annotator names
             * This is useful to fulfill the options params in CoreNLP API properties.
             * @return {Array.<string>} pipelineOptions
             */
            pipelineOptions(): string[];
            /**
             * Get a string representation
             * @return {string} annotator
             */
            toString(): string;
            /**
             * Defines whether a given annotator is the same as current, using shallow compare.
             * This is useful for a Document or Sentence to validate if the minimum of annotators required
             * were already applied to them.  Allows at the same time the users to instantiate new annotators
             * and configure them as needed.
             * @param {Annotator} annotator
             * @return {boolean}
             */
            equalsTo(annotator: Annotator): boolean;
            /**
             * Get an Object key-value representation of the annotor's options (excluding prefix)
             * @return {Object} options
             */
            options(): any;
            /**
             * Get/Set an option value
             * @param {string} key
             * @param {string|boolean} [value]
             * @return {string} value
             */
            option(key: string, value?: string | boolean): string;
            /**
             * Get a list of annotators dependencies
             * @return {Array.<Annotator>} dependencies
             */
            dependencies(): Annotator[];
            /**
             * Get a list of annotators dependencies, following by this annotator, all this as
             * a list of strings
             * This is useful to fulfill the `annotators` param in CoreNLP API properties.
             * @return {Array.<string>} pipeline
             */
            pipeline(): string[];
            /**
             * Get an object of all the Annotator options including the current and all its
             * dependencies, prefixed by the annotator names
             * This is useful to fulfill the options params in CoreNLP API properties.
             * @return {Array.<string>} pipelineOptions
             */
            pipelineOptions(): string[];
        }
        /**
         * @class
         * @classdesc Class representing a Document
         * @extends Annotable
         * @memberof CoreNLP/simple
         */
        class Document extends Annotable {
            constructor(text: string);
            /**
             * Get a string representation
             * @return {string} document
             */
            toString(): string;
            /**
             * Get a list of sentences
             * @returns {Array.<Sentence>} sentences - The document sentences
             */
            sentences(): Sentence[];
            /**
             * Get the sentence for a given index
             * @param {number} index - The position of the sentence to get
             * @returns {Sentence} sentence - The document sentences
             */
            sentence(index: number): Sentence;
            /**
             * @todo Missing implementation
             * @see https://stanfordnlp.github.io/CoreNLP/dcoref.html
             * @returns {Array.<CorefChain>}
             */
            corefs(): CorefChain[];
            /**
             * Get the coreference for a given index
             * @param {number} index - 0-based index of the coref chain list
             * @see https://stanfordnlp.github.io/CoreNLP/dcoref.html
             * @returns {CorefChain}
             */
            coref(index: number): CorefChain;
            /**
             * Sets the language ISO (given by the pipeline during the annotation process)
             * This is solely to keep track of the language chosen for further analysis
             * @return {string} text
             */
            setLanguageISO(): string;
            /**
             * Update an instance of Document with data provided by a JSON
             * @param {DocumentJSON} data - The document data, as returned by CoreNLP API service
             * @returns {Document} document - The current document instance
             */
            fromJSON(data: DocumentJSON): Document;
            /**
             * Get an instance of Document from a given JSON
             * @param {DocumentJSON} data - The document data, as returned by CoreNLP API service
             * @returns {Document} document - A new Document instance
             */
            static fromJSON(data: DocumentJSON): Document;
            /**
             * Get a string representation
             * @return {string} document
             */
            toString(): string;
            /**
             * Get a list of sentences
             * @returns {Array.<Sentence>} sentences - The document sentences
             */
            sentences(): Sentence[];
            /**
             * Get the sentence for a given index
             * @param {number} index - The position of the sentence to get
             * @returns {Sentence} sentence - The document sentences
             */
            sentence(index: number): Sentence;
            /**
             * @todo Missing implementation
             * @see https://stanfordnlp.github.io/CoreNLP/dcoref.html
             * @returns {Array.<CorefChain>}
             */
            corefs(): CorefChain[];
            /**
             * Get the coreference for a given index
             * @param {number} index - 0-based index of the coref chain list
             * @see https://stanfordnlp.github.io/CoreNLP/dcoref.html
             * @returns {CorefChain}
             */
            coref(index: number): CorefChain;
            /**
             * Sets the language ISO (given by the pipeline during the annotation process)
             * This is solely to keep track of the language chosen for further analysis
             * @return {string} text
             */
            setLanguageISO(): string;
            /**
             * Update an instance of Document with data provided by a JSON
             * @param {DocumentJSON} data - The document data, as returned by CoreNLP API service
             * @returns {Document} document - The current document instance
             */
            fromJSON(data: DocumentJSON): Document;
            /**
             * Get an instance of Document from a given JSON
             * @param {DocumentJSON} data - The document data, as returned by CoreNLP API service
             * @returns {Document} document - A new Document instance
             */
            static fromJSON(data: DocumentJSON): Document;
        }
        /**
         * @class
         * @classdesc Class representing an Expression
         * @extends Annotable
         * @memberof CoreNLP/simple
         */
        class Expression extends Annotable {
            constructor(text: string, pattern: string);
            /**
             * Get a string representation
             * @return {string} expression
             */
            toString(): string;
            /**
             * Get the pattern
             * @returns {string} pattern - The expression pattern
             */
            pattern(): string;
            /**
             * Get a list of sentences
             * @returns {Array.<ExpressionSentence>} sentences - The expression sentences
             */
            sentences(): ExpressionSentence[];
            /**
             * Get the sentence for a given index
             * @param {number} index - The position of the sentence to get
             * @returns {ExpressionSentence} sentence - An expression sentence
             */
            sentence(index: number): ExpressionSentence;
            /**
             * Hydrate the Expression instance with Token objects from an annotated Document
             * @see {@link ExpressionSentence#mergeTokensFromSentence}
             * @param {Document} document - An annotated document from where to extract the tokens
             * @returns {Expression} expression - The current expression instance
             */
            mergeTokensFromDocument(document: Document): Expression;
            /**
             * Update an instance of Expression with data provided by a JSON
             * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
             * @returns {Expression} expression - The current expression instance
             */
            fromJSON(data: ExpressionJSON): Expression;
            /**
             * Get an instance of Expression from a given JSON
             * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
             * @returns {Expression} expression - A new Expression instance
             */
            static fromJSON(data: ExpressionJSON): Expression;
            /**
             * Get a string representation
             * @return {string} expression
             */
            toString(): string;
            /**
             * Get the pattern
             * @returns {string} pattern - The expression pattern
             */
            pattern(): string;
            /**
             * Get a list of sentences
             * @returns {Array.<ExpressionSentence>} sentences - The expression sentences
             */
            sentences(): ExpressionSentence[];
            /**
             * Get the sentence for a given index
             * @param {number} index - The position of the sentence to get
             * @returns {ExpressionSentence} sentence - An expression sentence
             */
            sentence(index: number): ExpressionSentence;
            /**
             * Hydrate the Expression instance with Token objects from an annotated Document
             * @see {@link ExpressionSentence#mergeTokensFromSentence}
             * @param {Document} document - An annotated document from where to extract the tokens
             * @returns {Expression} expression - The current expression instance
             */
            mergeTokensFromDocument(document: Document): Expression;
            /**
             * Update an instance of Expression with data provided by a JSON
             * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
             * @returns {Expression} expression - The current expression instance
             */
            fromJSON(data: ExpressionJSON): Expression;
            /**
             * Get an instance of Expression from a given JSON
             * @param {ExpressionJSON} data - The expression data, as returned by CoreNLP API service
             * @returns {Expression} expression - A new Expression instance
             */
            static fromJSON(data: ExpressionJSON): Expression;
        }
        /**
         * @class
         * @classdesc Class representing a Governor
         * @memberof CoreNLP/simple
         */
        class Governor {
            constructor(dep: string, dependentToken: Token, governorToken?: Token);
            /**
             * Get a string representation
             * @return {string} governor
             */
            toString(): string;
            /**
             * Get an instance of Governor from a given JSON
             *
             * @todo It is not possible to properly generate a Governor from a GovernorJSON
             *       the Governor requires references to the Token instances in order to work
             * @param {GovernorJSON} data - The token data, as returned by CoreNLP API service
             * @returns {Governor} governor - A new Governor instance
             */
            static fromJSON(data: GovernorJSON): Governor;
            /**
             * Get a string representation
             * @return {string} governor
             */
            toString(): string;
            /**
             * Get an instance of Governor from a given JSON
             *
             * @todo It is not possible to properly generate a Governor from a GovernorJSON
             *       the Governor requires references to the Token instances in order to work
             * @param {GovernorJSON} data - The token data, as returned by CoreNLP API service
             * @returns {Governor} governor - A new Governor instance
             */
            static fromJSON(data: GovernorJSON): Governor;
        }
        /**
         * @class
         * @classdesc Class representing a Sentence
         * @extends Annotable
         * @memberof CoreNLP/simple
         * @see {@link https://github.com/stanfordnlp/CoreNLP/blob/master/src/edu/stanford/nlp/simple/Sentence.java}
         */
        class Sentence extends Annotable {
            constructor(text: string);
            /**
             * Get a string representation
             * @returns {string} sentence
             */
            toString(): string;
            /**
             * Get the index relative to the parent document
             * @returns {number} index
             */
            index(): number;
            /**
             * Get a string representation of the parse tree structure
             * @returns {string} parse
             */
            parse(): string;
            /**
             * Get an array of string representations of the sentence words
             * @requires {@link TokenizerAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Array.<string>} words
             */
            words(): string[];
            /**
             * Get a string representations of the Nth word of the sentence
             * @requires {@link TokenizerAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @throws {Error} in case the token for the given index does not exists
             * @param {number} index - 0-based index as they are arranged naturally
             * @returns {string} word
             */
            word(index: number): string;
            /**
             * Get a string representations of the tokens part of speech of the sentence
             * @returns {Array.<string>} posTags
             */
            posTags(): string[];
            /**
             * Get a string representations of the Nth token part of speech of the sentence
             * @throws {Error} in case the token for the given index does not exists
             * @param {number} index - 0-based index as they are arranged naturally
             * @returns {string} posTag
             */
            posTag(index: number): string;
            /**
             * Get a string representations of the tokens lemmas of the sentence
             * @returns {Array.<string>} lemmas
             */
            lemmas(): string[];
            /**
             * Get a string representations of the Nth token lemma of the sentence
             * @throws {Error} in case the token for the given index does not exists
             * @param {number} index - 0-based index as they are arranged naturally
             * @returns {string} lemma
             */
            lemma(index: number): string;
            /**
             * Get a string representations of the tokens nerTags of the sentence
             * @returns {Array.<string>} nerTags
             */
            nerTags(): string[];
            /**
             * Get a string representations of the Nth token nerTag of the sentence
             * @throws {Error} in case the token for the given index does not exists
             * @param {number} index - 0-based index as they are arranged naturally
             * @returns {string} nerTag
             */
            nerTag(index: number): string;
            /**
             * Get a list of annotated governors by the dependency-parser
             * @requires {@link DependencyParseAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Array.<Governor>} governors
             */
            governors(): Governor[];
            /**
             * Get the N-th annotated governor by the dependency-parser annotator
             * @requires {@link DependencyParseAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Governor} governor
             */
            governor(): Governor;
            /**
             * Get an array of token representations of the sentence words
             * @requires {@link TokenizerAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Array.<Token>} tokens
             */
            tokens(): Token[];
            /**
             * Get the Nth token of the sentence
             * @requires {@link TokenizerAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Token} token
             */
            token(): Token;
            /**
             * Sets the language ISO (given by the pipeline during the annotation process)
             * This is solely to keep track of the language chosen for further analysis
             * @return {string} text
             */
            setLanguageISO(): string;
            /**
             * Get a JSON representation of the current sentence
             * @description
             * The following arrow function `data => Sentence.fromJSON(data).toJSON()` is idempontent, if
             * considering shallow comparison, not by reference.
             * This JSON will respects the same structure as it expects from {@see Sentence#fromJSON}.
             * @returns {SentenceJSON} data
             */
            toJSON(): SentenceJSON;
            /**
             * Update an instance of Sentence with data provided by a JSON
             * @param {SentenceJSON} data - The document data, as returned by CoreNLP API service
             * @param {boolean} [isSentence] - Indicate if the given data represents just the sentence
             * or a full document with just a sentence inside
             * @returns {Sentence} sentence - The current sentence instance
             */
            fromJSON(data: SentenceJSON, isSentence?: boolean): Sentence;
            /**
             * Get an instance of Sentence from a given JSON
             * @param {SentenceJSON} data - The document data, as returned by CoreNLP API service
             * @param {boolean} [isSentence] - Indicate if the given data represents just the sentence of a
             * full document
             * @returns {Sentence} document - A new Sentence instance
             */
            static fromJSON(data: SentenceJSON, isSentence?: boolean): Sentence;
            /**
             * Get a string representation
             * @returns {string} sentence
             */
            toString(): string;
            /**
             * Get the index relative to the parent document
             * @returns {number} index
             */
            index(): number;
            /**
             * Get a string representation of the parse tree structure
             * @returns {string} parse
             */
            parse(): string;
            /**
             * Get an array of string representations of the sentence words
             * @requires {@link TokenizerAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Array.<string>} words
             */
            words(): string[];
            /**
             * Get a string representations of the Nth word of the sentence
             * @requires {@link TokenizerAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @throws {Error} in case the token for the given index does not exists
             * @param {number} index - 0-based index as they are arranged naturally
             * @returns {string} word
             */
            word(index: number): string;
            /**
             * Get a string representations of the tokens part of speech of the sentence
             * @returns {Array.<string>} posTags
             */
            posTags(): string[];
            /**
             * Get a string representations of the Nth token part of speech of the sentence
             * @throws {Error} in case the token for the given index does not exists
             * @param {number} index - 0-based index as they are arranged naturally
             * @returns {string} posTag
             */
            posTag(index: number): string;
            /**
             * Get a string representations of the tokens lemmas of the sentence
             * @returns {Array.<string>} lemmas
             */
            lemmas(): string[];
            /**
             * Get a string representations of the Nth token lemma of the sentence
             * @throws {Error} in case the token for the given index does not exists
             * @param {number} index - 0-based index as they are arranged naturally
             * @returns {string} lemma
             */
            lemma(index: number): string;
            /**
             * Get a string representations of the tokens nerTags of the sentence
             * @returns {Array.<string>} nerTags
             */
            nerTags(): string[];
            /**
             * Get a string representations of the Nth token nerTag of the sentence
             * @throws {Error} in case the token for the given index does not exists
             * @param {number} index - 0-based index as they are arranged naturally
             * @returns {string} nerTag
             */
            nerTag(index: number): string;
            /**
             * Get a list of annotated governors by the dependency-parser
             * @requires {@link DependencyParseAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Array.<Governor>} governors
             */
            governors(): Governor[];
            /**
             * Get the N-th annotated governor by the dependency-parser annotator
             * @requires {@link DependencyParseAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Governor} governor
             */
            governor(): Governor;
            /**
             * Get an array of token representations of the sentence words
             * @requires {@link TokenizerAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Array.<Token>} tokens
             */
            tokens(): Token[];
            /**
             * Get the Nth token of the sentence
             * @requires {@link TokenizerAnnotator}
             * @throws {Error} in case the require annotator was not applied to the sentence
             * @returns {Token} token
             */
            token(): Token;
            /**
             * Sets the language ISO (given by the pipeline during the annotation process)
             * This is solely to keep track of the language chosen for further analysis
             * @return {string} text
             */
            setLanguageISO(): string;
            /**
             * Get a JSON representation of the current sentence
             * @description
             * The following arrow function `data => Sentence.fromJSON(data).toJSON()` is idempontent, if
             * considering shallow comparison, not by reference.
             * This JSON will respects the same structure as it expects from {@see Sentence#fromJSON}.
             * @returns {SentenceJSON} data
             */
            toJSON(): SentenceJSON;
            /**
             * Update an instance of Sentence with data provided by a JSON
             * @param {SentenceJSON} data - The document data, as returned by CoreNLP API service
             * @param {boolean} [isSentence] - Indicate if the given data represents just the sentence
             * or a full document with just a sentence inside
             * @returns {Sentence} sentence - The current sentence instance
             */
            fromJSON(data: SentenceJSON, isSentence?: boolean): Sentence;
            /**
             * Get an instance of Sentence from a given JSON
             * @param {SentenceJSON} data - The document data, as returned by CoreNLP API service
             * @param {boolean} [isSentence] - Indicate if the given data represents just the sentence of a
             * full document
             * @returns {Sentence} document - A new Sentence instance
             */
            static fromJSON(data: SentenceJSON, isSentence?: boolean): Sentence;
        }
        /**
         * @class
         * @classdesc Class representing a Token
         * @extends Annotable
         * @memberof CoreNLP/simple
         */
        class Token extends Annotable {
            constructor(word: string);
            /**
             * Get a string representation
             * @returns {string} token
             */
            toString(): string;
            /**
             * Get the `inde ` number associated by the StanfordCoreNLP
             * This index is relative to the sentence it belongs to, and is a 1-based (possitive integer).
             * This number is useful to match tokens within a sentence for depparse, coreference, etc.
             * @returns {number} index
             */
            index(): number;
            /**
             * Get the original word
             * @returns {string} word
             */
            word(): string;
            /**
             * Get the original text
             * @returns {string} originalText
             */
            originalText(): string;
            /**
             * Get the characterOffsetBegin relative to the parent sentence
             * @description
             * A 0-based index of the word's initial character within the sentence
             * @returns {number} characterOffsetBegin
             */
            characterOffsetBegin(): number;
            /**
             * Get the characterOffsetEnd relative to the parent sentence
             * A 0-based index of the word's ending character within the sentence
             * @returns {number} characterOffsetEnd
             */
            characterOffsetEnd(): number;
            /**
             * Get the `before` string relative to the container sentence
             * @returns {string} before
             */
            before(): string;
            /**
             * Get the `after` string relative to the container sentence
             * @returns {string} after
             */
            after(): string;
            /**
             * Get the annotated lemma
             * @returns {string} lemma
             */
            lemma(): string;
            /**
             * Get the annotated part-of-speech for the current token
             * @returns {string} pos
             */
            pos(): string;
            /**
             * Get additional metadata about the POS annotation
             * NOTE: Do not use this method other than just for study or analysis purposes.
             * @see {@link PosInfo} for more details
             * @returns {PosInfo} posInfo
             */
            posInfo(): PosInfo;
            /**
             * Get the annotated named-entity for the current token
             * @returns {string} ner
             */
            ner(): string;
            /**
             * Get the annotated speaker for the current token
             * @see {@link CorefAnnotator}
             * @returns {string} speaker
             */
            speaker(): string;
            /**
             * Get a JSON representation of the current token
             * @description
             * The following arrow function `data => Token.fromJSON(data).toJSON()` is idempontent, if
             * considering shallow comparison, not by reference.
             * This JSON will respects the same structure as it expects from {@see Token#fromJSON}.
             * @returns {TokenJSON} data
             */
            toJSON(): TokenJSON;
            /**
             * Get an instance of Token from a given JSON
             * @param {TokenJSON} data - The token data, as returned by CoreNLP API service
             * @returns {Token} token - A new Token instance
             */
            static fromJSON(data: TokenJSON): Token;
            /**
             * Get a string representation
             * @returns {string} token
             */
            toString(): string;
            /**
             * Get the `inde ` number associated by the StanfordCoreNLP
             * This index is relative to the sentence it belongs to, and is a 1-based (possitive integer).
             * This number is useful to match tokens within a sentence for depparse, coreference, etc.
             * @returns {number} index
             */
            index(): number;
            /**
             * Get the original word
             * @returns {string} word
             */
            word(): string;
            /**
             * Get the original text
             * @returns {string} originalText
             */
            originalText(): string;
            /**
             * Get the characterOffsetBegin relative to the parent sentence
             * @description
             * A 0-based index of the word's initial character within the sentence
             * @returns {number} characterOffsetBegin
             */
            characterOffsetBegin(): number;
            /**
             * Get the characterOffsetEnd relative to the parent sentence
             * A 0-based index of the word's ending character within the sentence
             * @returns {number} characterOffsetEnd
             */
            characterOffsetEnd(): number;
            /**
             * Get the `before` string relative to the container sentence
             * @returns {string} before
             */
            before(): string;
            /**
             * Get the `after` string relative to the container sentence
             * @returns {string} after
             */
            after(): string;
            /**
             * Get the annotated lemma
             * @returns {string} lemma
             */
            lemma(): string;
            /**
             * Get the annotated part-of-speech for the current token
             * @returns {string} pos
             */
            pos(): string;
            /**
             * Get additional metadata about the POS annotation
             * NOTE: Do not use this method other than just for study or analysis purposes.
             * @see {@link PosInfo} for more details
             * @returns {PosInfo} posInfo
             */
            posInfo(): PosInfo;
            /**
             * Get the annotated named-entity for the current token
             * @returns {string} ner
             */
            ner(): string;
            /**
             * Get the annotated speaker for the current token
             * @see {@link CorefAnnotator}
             * @returns {string} speaker
             */
            speaker(): string;
            /**
             * Get a JSON representation of the current token
             * @description
             * The following arrow function `data => Token.fromJSON(data).toJSON()` is idempontent, if
             * considering shallow comparison, not by reference.
             * This JSON will respects the same structure as it expects from {@see Token#fromJSON}.
             * @returns {TokenJSON} data
             */
            toJSON(): TokenJSON;
            /**
             * Get an instance of Token from a given JSON
             * @param {TokenJSON} data - The token data, as returned by CoreNLP API service
             * @returns {Token} token - A new Token instance
             */
            static fromJSON(data: TokenJSON): Token;
        }
        
        /**
         * @namespace CoreNLP/simple/annotator
         * @description Predefined annotators {@link https://stanfordnlp.github.io/CoreNLP/annotators.html}
         */
        namespace annotator {
            /**
             * @class
             * @classdesc Class representing an CorefAnnotator.
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit, coref
             * @see {@link https://stanfordnlp.github.io/CoreNLP/coref.html|CorefAnnotator}
             */
            class CorefAnnotator extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @classdesc Class representing an DependencyParseAnnotator. Hydrates {@link Sentence.governors()}
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit, pos, lemma, ner, parse, depparse
             * @see {@link https://stanfordnlp.github.io/CoreNLP/depparse.html|DependencyParseAnnotator}
             */
            class DependencyParseAnnotator extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @classdesc Class representing an MorphaAnnotator. Hydrates {@link Token.lemma()}
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit, pos, lemma
             * @see {@link https://stanfordnlp.github.io/CoreNLP/lemma.html|MorphaAnnotator}
             */
            class MorphaAnnotator extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @classdesc Class representing an NERClassifierCombiner. Hydrates {@link Token.ner()}
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit, pos, lemma, ner
             * @see {@link https://stanfordnlp.github.io/CoreNLP/ner.html|NERClassifierCombiner}
             */
            class NERClassifierCombiner extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @class Class representing an ParserAnnotator. Hydrates {@link Token.parse()}
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit, pos, lemma, ner, parse
             * @see {@link https://stanfordnlp.github.io/CoreNLP/parse.html|ParserAnnotator}
             */
            class ParserAnnotator extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @classdesc Class representing an POSTaggerAnnotator. Hydrates {@link Token.pos()}
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit, pos
             * @see {@link https://stanfordnlp.github.io/CoreNLP/pos.html|POSTaggerAnnotator}
             */
            class POSTaggerAnnotator extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @classdesc Class representing an RegexNERAnnotator.
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit, pos, regexner
             * @see {@link https://stanfordnlp.github.io/CoreNLP/regexner.html|RegexNERAnnotator}
             */
            class RegexNERAnnotator extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @classdesc Class representing an RelationExtractorAnnotator.
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit, pos, lemma, ner, depparse, relation
             * @see {@link https://stanfordnlp.github.io/CoreNLP/relation.html|RelationExtractorAnnotator}
             */
            class RelationExtractorAnnotator extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @classdesc Class representing an WordsToSentenceAnnotator.
             *            Combines multiple {@link Token}s into sentences
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize, ssplit
             * @see {@link https://stanfordnlp.github.io/CoreNLP/ssplit.html|WordsToSentenceAnnotator}
             */
            class WordsToSentenceAnnotator extends Annotator {
                constructor(options?: any);
            }
            /**
             * @class
             * @classdesc Class representing an TokenizerAnnotator. Identifies {@link Token}s
             * @extends Annotator
             * @memberof CoreNLP/simple/annotator
             * @requires tokenize
             * @see {@link https://stanfordnlp.github.io/CoreNLP/tokenize.html|TokenizerAnnotator}
             */
            class TokenizerAnnotator extends Annotator {
                constructor(options?: any);
            }
        }
    }

    /**
     * @namespace CoreNLP/util
     * @description Utilities
     */
    namespace util {
        /**
         * @class
         * @classdesc Class representing a Parse tree structure
         * @memberof CoreNLP/util
         * @description
         * The nodes are given in order left to right as the words in a sentence appears
         * The leaves are grouped into semantic representations provided by the Annotator
         * This class is pretty useful to use along with the ParserAnnotator
         * @see inspired on {@link http://www.nltk.org/howto/tree.html|Tree}
         * @see the lecture {@link http://www.cs.cornell.edu/courses/cs474/2004fa/lec1.pdf|Tree Syntax of Natural Language}
         */
        class Tree {
            constructor(node: Node);
            /**
             * Get a Tree string representation for debugging purposes
             * @returns {string} tree
             */
            dump(): string;
            /**
             * Performs Deep-first Search calling a visitor for each node
             * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
             */
            visitDeepFirst(): void;
            /**
             * Performs Deep-first Search calling a visitor for each node, from right to left
             * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
             */
            visitDeepFirstRight(): void;
            /**
             * Performs Deep-first Search calling a visitor only over leaves
             * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
             */
            visitLeaves(): void;
            /**
             * @param {Sentence} sentence
             * @param {boolean} [doubleLink] whether the child nodes should have a reference
             * to their parent or not - this allows the use of {@link Node.parent()}
             * @returns {Tree} tree
             */
            static fromSentence(sentence: CoreNLP.simple.Sentence, doubleLink?: boolean): Tree;
            /**
             * @param {string} str
             * @param {boolean} [doubleLink] whether the child nodes should have a reference
             * to their parent or not - this allows the use of {@link Node.parent()}
             * @returns {Tree} tree
             */
            static fromString(str: string, doubleLink?: boolean): Tree;
            /**
             * Get a Tree string representation for debugging purposes
             * @returns {string} tree
             */
            dump(): string;
            /**
             * Performs Deep-first Search calling a visitor for each node
             * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
             */
            visitDeepFirst(): void;
            /**
             * Performs Deep-first Search calling a visitor for each node, from right to left
             * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
             */
            visitDeepFirstRight(): void;
            /**
             * Performs Deep-first Search calling a visitor only over leaves
             * @see {@link https://en.wikipedia.org/wiki/Depth-first_search|DFS}
             */
            visitLeaves(): void;
            /**
             * @param {Sentence} sentence
             * @param {boolean} [doubleLink] whether the child nodes should have a reference
             * to their parent or not - this allows the use of {@link Node.parent()}
             * @returns {Tree} tree
             */
            static fromSentence(sentence: CoreNLP.simple.Sentence, doubleLink?: boolean): Tree;
            /**
             * @param {string} str
             * @param {boolean} [doubleLink] whether the child nodes should have a reference
             * to their parent or not - this allows the use of {@link Node.parent()}
             * @returns {Tree} tree
             */
            static fromString(str: string, doubleLink?: boolean): Tree;
        }
    }
}

export default CoreNLP;

/**
 * @class
 * @classdesc Class representing a Pipeline.
 */
export class Pipeline {
    constructor(properties: Properties, language?: string, connector?: ConnectorServer | ConnectorCli);
    /**
     * Retrieves the current Service used by the pipeline
     * @param {Service} service
     */
    getService(service: Service): void;
    /**
     * Execute the pipeline against the annotable object, adding annotations to it.
     * Calls the service and loads the associated response metadata into the Annotable model
     * @async
     * @param {Annotable} annotable - the document or sentence to be annotated
     * @returns {Promise<Annotable>} annotated document / sentence
     */
    annotate<T extends CoreNLP.simple.Annotable>(annotable: T): Promise<T>;
    /**
     * @param {Array.<Annotator>} requiredAnnotators
     */
    assert(requiredAnnotators: CoreNLP.simple.Annotator[]): void;
    /**
     * Annotates the given Expression instance with matching groups and/or Tokens
     * @param {Expression} expression - An annotable expression containing a TokensRegex pattern
     * @param {boolean} [annotateExpression] - Whether to hydrate the annotations with tokens or not.
     * IMPORTANT: The optional parameter `annotateExpression` if true, will run the CoreNLP pipeline
     *            twice.  First for the TokensRegex annotation, and one more for the standard pipeline
     *            Token annotations (pos, ner, lemma, etc).
     * @returns {Expression} expression - The current expression instance
     */
    annotateTokensRegex(expression: CoreNLP.simple.Expression, annotateExpression?: boolean): CoreNLP.simple.Expression;
    /**
     * Annotates the given Expression instance with matching groups and/or Tokens
     * @param {Expression} expression - An annotable expression containing a Semgrex pattern
     * @param {boolean} [annotateExpression] - Whether to hydrate the annotations with tokens or not.
     * IMPORTANT: The optional parameter `annotateExpression` if true, will run the CoreNLP pipeline
     *            twice.  First for the Semgrex annotation, and one more for the standard pipeline
     *            Token annotations (pos, ner, lemma, etc).
     * @returns {Expression} expression - The current expression instance
     */
    annotateSemgrex(expression: CoreNLP.simple.Expression, annotateExpression?: boolean): CoreNLP.simple.Expression;
    /**
     * Annotates the given Expression instance with matching groups and/or Tokens
     * @param {Expression} expression - An annotable expression containing a Tregex pattern
     * @param {boolean} [annotateExpression] - Whether to hydrate the annotations with tokens or not.
     * IMPORTANT: The optional parameter `annotateExpression` if true, will run the CoreNLP pipeline
     *            twice.  First for the Tregex annotation, and one more for the standard pipeline
     *            Token annotations (pos, ner, lemma, etc).
     * @returns {Expression} expression - The current expression instance
     */
    annotateTregex(expression: CoreNLP.simple.Expression, annotateExpression?: boolean): CoreNLP.simple.Expression;
    /**
     * Retrieves the current Service used by the pipeline
     * @param {Service} service
     */
    getService(service: Service): void;
    /**
     * Execute the pipeline against the annotable object, adding annotations to it.
     * Calls the service and loads the associated response metadata into the Annotable model
     * @async
     * @param {Annotable} annotable - the document or sentence to be annotated
     * @returns {Promise<Annotable>} annotated document / sentence
     */
    annotate(annotable: CoreNLP.simple.Annotable): Promise<CoreNLP.simple.Annotable>;
    /**
     * @param {Array.<Annotator>} requiredAnnotators
     */
    assert(requiredAnnotators: CoreNLP.simple.Annotator[]): void;
    /**
     * Annotates the given Expression instance with matching groups and/or Tokens
     * @param {Expression} expression - An annotable expression containing a TokensRegex pattern
     * @param {boolean} [annotateExpression] - Whether to hydrate the annotations with tokens or not.
     * IMPORTANT: The optional parameter `annotateExpression` if true, will run the CoreNLP pipeline
     *            twice.  First for the TokensRegex annotation, and one more for the standard pipeline
     *            Token annotations (pos, ner, lemma, etc).
     * @returns {Expression} expression - The current expression instance
     */
    annotateTokensRegex(expression: CoreNLP.simple.Expression, annotateExpression?: boolean): CoreNLP.simple.Expression;
    /**
     * Annotates the given Expression instance with matching groups and/or Tokens
     * @param {Expression} expression - An annotable expression containing a Semgrex pattern
     * @param {boolean} [annotateExpression] - Whether to hydrate the annotations with tokens or not.
     * IMPORTANT: The optional parameter `annotateExpression` if true, will run the CoreNLP pipeline
     *            twice.  First for the Semgrex annotation, and one more for the standard pipeline
     *            Token annotations (pos, ner, lemma, etc).
     * @returns {Expression} expression - The current expression instance
     */
    annotateSemgrex(expression: CoreNLP.simple.Expression, annotateExpression?: boolean): CoreNLP.simple.Expression;
    /**
     * Annotates the given Expression instance with matching groups and/or Tokens
     * @param {Expression} expression - An annotable expression containing a Tregex pattern
     * @param {boolean} [annotateExpression] - Whether to hydrate the annotations with tokens or not.
     * IMPORTANT: The optional parameter `annotateExpression` if true, will run the CoreNLP pipeline
     *            twice.  First for the Tregex annotation, and one more for the standard pipeline
     *            Token annotations (pos, ner, lemma, etc).
     * @returns {Expression} expression - The current expression instance
     */
    annotateTregex(expression: CoreNLP.simple.Expression, annotateExpression?: boolean): CoreNLP.simple.Expression;
}

/**
 * @class
 * @classdesc Class representing a Properties set.
 */
export class Properties {
    constructor(props: any);
    /**
     * Property setter
     * @param {string} name - the property name
     * @param {*} value - the property value
     */
    setProperty(name: string, value: any): void;
    /**
     * Property getter
     * @param {string} name - the property name
     * @param {*} default - the defaut value to return if not set
     * @returns {*} value - the property value
     */
    getProperty(name: string, defaultValue: any): any;
    /**
     * Returns an Object map of the given properties
     * @returns {Object} properties - the properties object
     */
    getProperties(): any;
    /**
     * Returns a JSON object of the given properties
     * @returns {Object} json - the properties object
     */
    toJSON(): any;
    /**
     * Returns a properties file-like string of the given properties
     * @returns {string} properties - the properties content
     */
    toPropertiessFileContent(): string;
    /**
     * Property setter
     * @param {string} name - the property name
     * @param {*} value - the property value
     */
    setProperty(name: string, value: any): void;
    /**
     * Property getter
     * @param {string} name - the property name
     * @param {*} default - the defaut value to return if not set
     * @returns {*} value - the property value
     */
    getProperty(name: string, defaultValue: any): any;
    /**
     * Returns an Object map of the given properties
     * @returns {Object} properties - the properties object
     */
    getProperties(): any;
    /**
     * Returns a JSON object of the given properties
     * @returns {Object} json - the properties object
     */
    toJSON(): any;
    /**
     * Returns a properties file-like string of the given properties
     * @returns {string} properties - the properties content
     */
    toPropertiessFileContent(): string;
}

/**
 * @class
 * @classdesc Middleware that interfaces between the pipeline and the connector strategies
 */
export class Service {
    constructor(connector: ConnectorServer | ConnectorCli, language?: 'English' | 'French' | 'German' | 'Spanish' | 'Unspecified' | 'Whitesapce');
}

/**
 * @class
 * @classdesc Class representing an CorefChain
 */
export class CorefChain {
    constructor(mentions: CorefMention[]);
    /**
     * Retrieves all the contained CorefMention instances
     * @returns {Array.<CorefMention>} mentions
     */
    mentions(): CorefMention[];
    /**
     * Retrieves a CorefMention at the index specified
     * @param {number} index
     * @returns {CorefMention} mention
     */
    mention(index: number): CorefMention;
    /**
     * Retrieves the first representative mention
     * @returns {CorefMention} mention
     */
    representative(): CorefMention;
    /**
     * Retrieves all the non-representative mentions
     * @returns {Array.<CorefMention>} mentions
     */
    nonRepresentatives(): CorefMention[];
    /**
     * Gets or sets a Document reference for the current coref-chain
     * @param {Document} doc
     * @returns {Document} doc
     */
    document(doc: CoreNLP.simple.Document): CoreNLP.simple.Document;
    /**
     * Update an instance of CorefChain with Document references to Sentence(s) and their Token(s)
     * @param {Document} doc - a Document object, the same one used to generate corefs annotations
     * @returns {CorefChain} chain - The current chain instance
     */
    fromDocument(doc: CoreNLP.simple.Document): CorefChain;
    /**
     * Update an instance of CorefChain with data provided by a JSON
     * @param {Array.<CorefMentionJSON>} data - A sentence corefs mentions chain, as
     *  returned by CoreNLP API service
     * @returns {CorefChain} chain - The current chain instance
     */
    fromJSON(data: CorefMentionJSON[]): CorefChain;
    /**
     * Get an instance of CorefChain from a given JSON of sentence corefs
     * @param {Array.<CorefMentionJSON>} data - The sentence corefs data, as
     *  returned by CoreNLP API service
     * @returns {CorefChain} sentenchain - A new CorefChain instance
     */
    static fromJSON(data: CorefMentionJSON[]): CorefChain;
    /**
     * Retrieves all the contained CorefMention instances
     * @returns {Array.<CorefMention>} mentions
     */
    mentions(): CorefMention[];
    /**
     * Retrieves a CorefMention at the index specified
     * @param {number} index
     * @returns {CorefMention} mention
     */
    mention(index: number): CorefMention;
    /**
     * Retrieves the first representative mention
     * @returns {CorefMention} mention
     */
    representative(): CorefMention;
    /**
     * Retrieves all the non-representative mentions
     * @returns {Array.<CorefMention>} mentions
     */
    nonRepresentatives(): CorefMention[];
    /**
     * Gets or sets a Document reference for the current coref-chain
     * @param {Document} doc
     * @returns {Document} doc
     */
    document(doc: CoreNLP.simple.Document): CoreNLP.simple.Document;
    /**
     * Update an instance of CorefChain with Document references to Sentence(s) and their Token(s)
     * @param {Document} doc - a Document object, the same one used to generate corefs annotations
     * @returns {CorefChain} chain - The current chain instance
     */
    fromDocument(doc: CoreNLP.simple.Document): CorefChain;
    /**
     * Update an instance of CorefChain with data provided by a JSON
     * @param {Array.<CorefMentionJSON>} data - A sentence corefs mentions chain, as
     *  returned by CoreNLP API service
     * @returns {CorefChain} chain - The current chain instance
     */
    fromJSON(data: CorefMentionJSON[]): CorefChain;
    /**
     * Get an instance of CorefChain from a given JSON of sentence corefs
     * @param {Array.<CorefMentionJSON>} data - The sentence corefs data, as
     *  returned by CoreNLP API service
     * @returns {CorefChain} sentenchain - A new CorefChain instance
     */
    static fromJSON(data: CorefMentionJSON[]): CorefChain;
}

/**
 * A CorefMention.
 * @typedef CorefMentionJSON
 * @property {number} id - Mention ID
 * @property {string} text - The text (literal word) of the mention
 * @property {number} sentNum - 1-based index of the sentence containinng this mention
 * @property {number} headIndex - 1-based index
 * @property {number} startIndex - 1-based index
 * @property {number} endIndex - 1-based index
 * @property {boolean} isRepresentativeMention - Wehther the mention word is representative or not
 * @property {("ANIMATE"|"INANIMATE"|"UNKNOWN")} animacy - Mention's animacy
 * @property {("FEMALE"|"MALE"|"NEUTRAL"|"UNKNOWN")} gender - Gender of the mention
 * @property {("SINGULAR"|"PLURAL"|"UNKNOWN")} number - Cardinality of the mention
 * @property {("PRONOMINAL"|"NOMINAL"|"PROPER"|"LIST")} type - Mention type
 * @property {Array} position - Position is a binary tuple of
 *    (sentence number, mention number in that sentence). This is used for indexing by mention.
 *
 * @see {@link https://github.com/stanfordnlp/CoreNLP/blob/7cfaf869f9500da16b858ab1a2835234ae46f96e/src/edu/stanford/nlp/dcoref/CorefChain.java#L148}
 * @see {@link https://github.com/stanfordnlp/CoreNLP/blob/master/src/edu/stanford/nlp/dcoref/Dictionaries.java} for enum definitions
 */
export type CorefMentionJSON = {
    id: number;
    text: string;
    sentNum: number;
    headIndex: number;
    startIndex: number;
    endIndex: number;
    isRepresentativeMention: boolean;
    animacy: "ANIMATE" | "INANIMATE" | "UNKNOWN";
    gender: "FEMALE" | "MALE" | "NEUTRAL" | "UNKNOWN";
    number: "SINGULAR" | "PLURAL" | "UNKNOWN";
    type: "PRONOMINAL" | "NOMINAL" | "PROPER" | "LIST";
    position: number[];
};

/**
 * @class
 * @classdesc Class representing an CorefMention
 */
export class CorefMention {
    /**
     * Retrieves the mention ID
     * @returns {string} id
     */
    id(): string;
    /**
     * Retrieves the mention text
     * @returns {string} text
     */
    text(): string;
    /**
     * Retrieves the mention sentence number
     * @see {@link CorefMention.sentence()} for simplicity
     * @returns {number} sentNum
     */
    sentNum(): number;
    /**
     * Retrieves the mention headIndex
     * @returns {number} headIndex
     */
    headIndex(): number;
    /**
     * Retrieves the mention startIndex
     * @returns {number} startIndex
     */
    startIndex(): number;
    /**
     * Retrieves the mention endIndex
     * @returns {number} endIndex
     */
    endIndex(): number;
    /**
     * Tells you if the mentions is representative or not
     * @returns {boolean} isRepresentativeMention
     */
    isRepresentativeMention(): boolean;
    /**
     * Retrieves the mention animacy
     * @returns {("ANIMATE"|"INANIMATE"|"UNKNOWN")} animacy
     */
    animacy(): "ANIMATE" | "INANIMATE" | "UNKNOWN";
    /**
     * Retrieves the mention gender
     * @returns {("FEMALE"|"MALE"|"NEUTRAL"|"UNKNOWN")} gender
     */
    gender(): "FEMALE" | "MALE" | "NEUTRAL" | "UNKNOWN";
    /**
     * Retrieves the mention number
     * @returns {("SINGULAR"|"PLURAL"|"UNKNOWN")} number
     */
    number(): "SINGULAR" | "PLURAL" | "UNKNOWN";
    /**
     * Retrieves the mention type
     * @returns {("PRONOMINAL"|"NOMINAL"|"PROPER"|"LIST")} type
     */
    type(): "PRONOMINAL" | "NOMINAL" | "PROPER" | "LIST";
    /**
     * Retrieves the mention's sentence container
     * @returns {Sentence} sentence
     */
    sentence(): CoreNLP.simple.Sentence;
    /**
     * Retrieves the mention's associated token
     * @returns {Token} token
     */
    token(): CoreNLP.simple.Token;
    /**
     * Update an instance of CorefMention with data provided by a JSON
     * @param {CorefMentionJSON} data - The mention data, as returned by CoreNLP API service
     * @returns {CorefMention} mention - The current mention instance
     */
    fromJSON(data: CorefMentionJSON): CorefMention;
    /**
     * Get an instance of CorefMention from a given JSON
     * @param {CorefMentionJSON} data - The match data, as returned by CoreNLP API service
     * @returns {CorefMention} mention - A new CorefMention instance
     */
    static fromJSON(data: CorefMentionJSON): CorefMention;
    /**
     * Retrieves the mention ID
     * @returns {string} id
     */
    id(): string;
    /**
     * Retrieves the mention text
     * @returns {string} text
     */
    text(): string;
    /**
     * Retrieves the mention sentence number
     * @see {@link CorefMention.sentence()} for simplicity
     * @returns {number} sentNum
     */
    sentNum(): number;
    /**
     * Retrieves the mention headIndex
     * @returns {number} headIndex
     */
    headIndex(): number;
    /**
     * Retrieves the mention startIndex
     * @returns {number} startIndex
     */
    startIndex(): number;
    /**
     * Retrieves the mention endIndex
     * @returns {number} endIndex
     */
    endIndex(): number;
    /**
     * Tells you if the mentions is representative or not
     * @returns {boolean} isRepresentativeMention
     */
    isRepresentativeMention(): boolean;
    /**
     * Retrieves the mention animacy
     * @returns {("ANIMATE"|"INANIMATE"|"UNKNOWN")} animacy
     */
    animacy(): "ANIMATE" | "INANIMATE" | "UNKNOWN";
    /**
     * Retrieves the mention gender
     * @returns {("FEMALE"|"MALE"|"NEUTRAL"|"UNKNOWN")} gender
     */
    gender(): "FEMALE" | "MALE" | "NEUTRAL" | "UNKNOWN";
    /**
     * Retrieves the mention number
     * @returns {("SINGULAR"|"PLURAL"|"UNKNOWN")} number
     */
    number(): "SINGULAR" | "PLURAL" | "UNKNOWN";
    /**
     * Retrieves the mention type
     * @returns {("PRONOMINAL"|"NOMINAL"|"PROPER"|"LIST")} type
     */
    type(): "PRONOMINAL" | "NOMINAL" | "PROPER" | "LIST";
    /**
     * Retrieves the mention's sentence container
     * @returns {Sentence} sentence
     */
    sentence(): CoreNLP.simple.Sentence;
    /**
     * Retrieves the mention's associated token
     * @returns {Token} token
     */
    token(): CoreNLP.simple.Token;
    /**
     * Update an instance of CorefMention with data provided by a JSON
     * @param {CorefMentionJSON} data - The mention data, as returned by CoreNLP API service
     * @returns {CorefMention} mention - The current mention instance
     */
    fromJSON(data: CorefMentionJSON): CorefMention;
    /**
     * Get an instance of CorefMention from a given JSON
     * @param {CorefMentionJSON} data - The match data, as returned by CoreNLP API service
     * @returns {CorefMention} mention - A new CorefMention instance
     */
    static fromJSON(data: CorefMentionJSON): CorefMention;
}

/**
 * The CoreNLP API JSON structure representing a document
 * @typedef DocumentJSON
 * @property {number} index
 * @property {Array.<Sentence>} sentences
 */
declare type DocumentJSON = {
    index: number;
    sentences: CoreNLP.simple.Sentence[];
};

/**
 * @typedef ExpressionSentenceMatchGroup
 * @property {string} label - group label
 * @property {number} begin - 0-based index of the matched group, relative to the given text
 * @property {number} end - 0-based index of the matched group, relative to the given text
 * @property {Token} [token] - onluy given if aggregated with an annotated Sentence or Document
 * @property {ExpressionSentenceMatchGroup} [$label] - other groups inside
 */
declare type ExpressionSentenceMatchGroup = {
    label: string;
    begin: number;
    end: number;
    token?: CoreNLP.simple.Token;
    $label?: ExpressionSentenceMatchGroup;
};

/**
 * A ExpressionSentenceMatch of either `TokensRegex`, `Semgrex` or `Tregex`.
 * @typedef ExpressionSentenceMatchJSON
 * @property {number} begin - word begin position, starting from zero
 * @property {number} end - word end position, starting from zero (no match ends at 0)
 * @property {string} text - matched text
 * @property {string} [$label] - any label, as defined in the expression pattern
 */
declare type ExpressionSentenceMatchJSON = {
    begin: number;
    end: number;
    text: string;
    $label?: string;
};

/**
 * @class
 * @classdesc Class representing an ExpressionSentenceMatch
 */
declare class ExpressionSentenceMatch {
    /**
     * Returns the main and labeled groups as a list of ExpressionSentenceMatchGroup
     * @returns {Array.<ExpressionSentenceMatchGroup>} groups
     */
    groups(): ExpressionSentenceMatchGroup[];
    /**
     * Returns the labeled group as ExpressionSentenceMatchGroup from a given label
     * @description
     * Nodes in a Macthed expression can be named, we call them groups here, and
     * the labels are the name of the nodes.
     * @see {@link https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexPattern.html#Naming_nodes}
     * @param {string} label - The label name, not prefixed wih $
     * @returns {ExpressionSentenceMatchGroup} group
     */
    group(label: string): ExpressionSentenceMatchGroup;
    /**
     * Retrieves the list of labels (aliases) available for the current sentence match.
     * @description
     * Labels are those aliases you can add to a group match expression, for example,
     * in Semgrex, you can do {ner:/PERSON/=good_guy}, from where "good_guy" would be the label
     * and internally it will come as $good_guy as a member of {@link ExpressionSentenceMatchGroup}.
     * @returns {Array.<string>} labels
     */
    labels(): string[];
    /**
     * Update an instance of ExpressionSentenceMatch with data provided by a JSON
     * @param {ExpressionSentenceMatchJSON} data - The match data, as returned by CoreNLP API service
     * @returns {ExpressionSentenceMatch} expression - The current match instance
     */
    fromJSON(data: ExpressionSentenceMatchJSON): ExpressionSentenceMatch;
    /**
     * Get an instance of ExpressionSentenceMatch from a given JSON
     * @param {ExpressionSentenceMatchJSON} data - The match data, as returned by CoreNLP API service
     * @returns {ExpressionSentenceMatch} match - A new ExpressionSentenceMatch instance
     */
    static fromJSON(data: ExpressionSentenceMatchJSON): ExpressionSentenceMatch;
    /**
     * Returns the main and labeled groups as a list of ExpressionSentenceMatchGroup
     * @returns {Array.<ExpressionSentenceMatchGroup>} groups
     */
    groups(): ExpressionSentenceMatchGroup[];
    /**
     * Returns the labeled group as ExpressionSentenceMatchGroup from a given label
     * @description
     * Nodes in a Macthed expression can be named, we call them groups here, and
     * the labels are the name of the nodes.
     * @see {@link https://nlp.stanford.edu/nlp/javadoc/javanlp/edu/stanford/nlp/semgraph/semgrex/SemgrexPattern.html#Naming_nodes}
     * @param {string} label - The label name, not prefixed wih $
     * @returns {ExpressionSentenceMatchGroup} group
     */
    group(label: string): ExpressionSentenceMatchGroup;
    /**
     * Retrieves the list of labels (aliases) available for the current sentence match.
     * @description
     * Labels are those aliases you can add to a group match expression, for example,
     * in Semgrex, you can do {ner:/PERSON/=good_guy}, from where "good_guy" would be the label
     * and internally it will come as $good_guy as a member of {@link ExpressionSentenceMatchGroup}.
     * @returns {Array.<string>} labels
     */
    labels(): string[];
    /**
     * Update an instance of ExpressionSentenceMatch with data provided by a JSON
     * @param {ExpressionSentenceMatchJSON} data - The match data, as returned by CoreNLP API service
     * @returns {ExpressionSentenceMatch} expression - The current match instance
     */
    fromJSON(data: ExpressionSentenceMatchJSON): ExpressionSentenceMatch;
    /**
     * Get an instance of ExpressionSentenceMatch from a given JSON
     * @param {ExpressionSentenceMatchJSON} data - The match data, as returned by CoreNLP API service
     * @returns {ExpressionSentenceMatch} match - A new ExpressionSentenceMatch instance
     */
    static fromJSON(data: ExpressionSentenceMatchJSON): ExpressionSentenceMatch;
}

declare type ExpressionSentenceJSON = { }

/**
 * @class
 * @classdesc Class representing an ExpressionSentence
 */
declare class ExpressionSentence {
    constructor(matches: ExpressionSentenceMatch[]);
    /**
     * Retrieves all the contained ExpressionSentenceMatch instances
     * @returns {Array.<ExpressionSentenceMatch>} matches
     */
    matches(): ExpressionSentenceMatch[];
    /**
     * Retrieves a ExpressionSentenceMatch at the index specified
     * @param {number} index
     * @returns {ExpressionSentenceMatch} match
     */
    match(index: number): ExpressionSentenceMatch;
    /**
     * Hydrates the current ExpressionSentence match groups with Token objects.
     * @description
     * The Expression / ExpressionSentence objects comes from outside the standard CoreNLP pipelines.
     * This mean that neither `TokensRegex`, `Semgrex` nor `Tregex` will tag the nodes with POS,
     * lemma, NER or any otehr annotation data.  This is sometimes a usful resource to count with, if
     * you can apart of getting the matching groups, get the annotated tokens for each word in the
     * match group.
     * @returns {ExpressionSentence} instance = The current instance
     */
    mergeTokensFromSentence(): ExpressionSentence;
    /**
     * Update an instance of ExpressionSentence with data provided by a JSON
     * @param {ExpressionSentenceJSON} data - The expression data, as returned by CoreNLP API service
     * @returns {ExpressionSentenceJSON} sentence - The current sentence instance
     */
    fromJSON(data: ExpressionSentenceJSON): ExpressionSentenceJSON;
    /**
     * Get an instance of ExpressionSentence from a given JSON of sentence matches
     * @param {ExpressionSentenceJSON} data - The sentence data, as returned by CoreNLP API service
     * @returns {ExpressionSentence} sentence - A new ExpressionSentence instance
     */
    static fromJSON(data: ExpressionSentenceJSON): ExpressionSentence;
    /**
     * Retrieves all the contained ExpressionSentenceMatch instances
     * @returns {Array.<ExpressionSentenceMatch>} matches
     */
    matches(): ExpressionSentenceMatch[];
    /**
     * Retrieves a ExpressionSentenceMatch at the index specified
     * @param {number} index
     * @returns {ExpressionSentenceMatch} match
     */
    match(index: number): ExpressionSentenceMatch;
    /**
     * Hydrates the current ExpressionSentence match groups with Token objects.
     * @description
     * The Expression / ExpressionSentence objects comes from outside the standard CoreNLP pipelines.
     * This mean that neither `TokensRegex`, `Semgrex` nor `Tregex` will tag the nodes with POS,
     * lemma, NER or any otehr annotation data.  This is sometimes a usful resource to count with, if
     * you can apart of getting the matching groups, get the annotated tokens for each word in the
     * match group.
     * @returns {ExpressionSentence} instance = The current instance
     */
    mergeTokensFromSentence(): ExpressionSentence;
    /**
     * Update an instance of ExpressionSentence with data provided by a JSON
     * @param {ExpressionSentenceJSON} data - The expression data, as returned by CoreNLP API service
     * @returns {ExpressionSentenceJSON} sentence - The current sentence instance
     */
    fromJSON(data: ExpressionSentenceJSON): ExpressionSentenceJSON;
    /**
     * Get an instance of ExpressionSentence from a given JSON of sentence matches
     * @param {ExpressionSentenceJSON} data - The sentence data, as returned by CoreNLP API service
     * @returns {ExpressionSentence} sentence - A new ExpressionSentence instance
     */
    static fromJSON(data: ExpressionSentenceJSON): ExpressionSentence;
}

/**
 * The CoreNLP API JSON structure representing an expression
 * This expression structure can be found as the output of `TokensRegex`,
 * `Semgrex` and `Tregex`.
 * @typedef ExpressionJSON
 * @property {number} index
 * @property {Array.<Array.<ExpressionSentenceMatch>>} sentences
 */
declare type ExpressionJSON = {
    index: number;
    sentences: ExpressionSentenceMatch[][];
};

/**
 * The CoreNLP API JSON structure representing a governor
 * @typedef GovernorJSON
 * @property {string} dep
 * @property {number} governor
 * @property {string} governorGloss
 * @property {number} dependent
 * @property {string} dependentGloss
 */
declare type GovernorJSON = {
    dep: string;
    governor: number;
    governorGloss: string;
    dependent: number;
    dependentGloss: string;
};

/**
 * The CoreNLP API JSON structure representing a sentence
 * @typedef SentenceJSON
 * @property {number} index - 1-based index, as they come indexed by StanfordCoreNLP
 * @property {Array.<Token>} tokens
 */
declare type SentenceJSON = {
    index: number;
    tokens: CoreNLP.simple.Token[];
};

/**
 * The CoreNLP API JSON structure representing a token
 * @typedef TokenJSON
 * @property {number} index
 * @property {string} word
 * @property {string} originalText
 * @property {number} characterOffsetBegin
 * @property {number} characterOffsetEnd
 * @property {string} before
 * @property {string} after
 */
declare type TokenJSON = {
    index: number;
    word: string;
    originalText: string;
    characterOffsetBegin: number;
    characterOffsetEnd: number;
    before: string;
    after: string;
};

/**
 * @typedef PosInfo
 * @description
 * PosInfo does not come as part of the CoreNLP.  It is an indexed reference of POS tags
 * by language provided by this library.  It's only helpful for analysis and study.  The
 * data was collected from different documentation resources on the Web.
 * The PosInfo may vary depending on the POS annotation types used, for example, CoreNLP
 * for Spanish uses custom POS tags developed by Stanford, but this can also be changed
 * to Universal Dependencies, which uses different tags.
 * @property {string} group
 * @property {string} tag
 * @property {Array.<string>} examples
 */
declare type PosInfo = {
    group: string;
    tag: string;
    examples: string[];
};

/**
 * @class
 * @classdesc Class representing a Sentence Tree Node
 */
declare class Node {
    constructor();
    /**
     * Sets the language ISO (given by the pipeline during the annotation process)
     * This is solely to keep track of the language chosen for further analysis
     * @return {string} text
     */
    setLanguageISO(): string;
    /**
     * Retrieves the language ISO
     * @return {string} text
     */
    getLanguageISO(): string;
    /**
     * Sets the language ISO (given by the pipeline during the annotation process)
     * This is solely to keep track of the language chosen for further analysis
     * @return {string} text
     */
    setLanguageISO(): string;
    /**
     * Retrieves the language ISO
     * @return {string} text
     */
    getLanguageISO(): string;
}
