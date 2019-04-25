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
import { NotFound } from "ts-httpexceptions";
import {CMDService} from "../../services/cmd/cmd";
import CoreNLP, { Properties, Pipeline, ConnectorServer } from 'corenlp';
import * as nlp from "compromise";
import wtf = require('wtf_wikipedia');

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 */
@Controller("/graphs")
export class GraphCtrl {

    constructor(private cmdService: CMDService) {

    }

    @Get("/:text")
    async annotate(@Required() @PathParams("text") text: string): Promise<any> {

        const connector = new ConnectorServer({ dsn: 'http://localhost:9000' });
        const props = new Properties({ annotators: 'tokenize,ssplit,lemma,pos,ner,parse' });
        const pipeline = new Pipeline(props, 'English', connector);
        let rText = "A Lord Buddha is a very holy person in Buddhism. The word Buddha means 'enlightened one' in Sanskrit. Buddha was born Siddhartha Gautama. He was the man who started Buddhism. Sometimes people call him 'the Buddha'. Other times, people call any person a Buddha if they have found enlightenment. If a person has not found enlightenment yet, but is very close to reaching it, then he is called Bodhisattva.";
        const sent = new CoreNLP.simple.Sentence(rText);
        let output = pipeline.annotate(sent)
        .then(sent => {
            console.log(sent.words());
            console.log(sent.nerTags());
            return sent.toJSON()
        })
        .catch(err => {
            console.log('err', err);
        });
        // let output = this.cmdService.man(text);
        //.then( (out) => new ManPage(name,out))
        //.then((man) => "<pre>" + JSON.stringify(man) + "\n\n" + man.manString + "</pre>");
        return output;
    }

    @Get("/category/:text")
    async comprimise(@Required() @PathParams("text") text: string): Promise<any> {

        let rText = text;
        // return output;

        return wtf.fetch(rText.trim()).then(async (_doc) => {
            if (_doc === null) {
                return null;
            }

            let myDoc = _doc;
            let strNewFetchString = '';
            const arrCat = myDoc.categories();
            // check if there are categories
            if (typeof arrCat === 'undefined' || arrCat.length < 1) { // there are categories
                let currWikiLinks = myDoc.sections(1).links()[0];
                if (typeof currWikiLinks === 'undefined') {
                currWikiLinks = myDoc.sections(0).links()[0];
                }
                if (typeof currWikiLinks !== 'undefined') {
                // then use the first common category
                strNewFetchString = myDoc.sections(1).links()[0].page;
                myDoc = await wtf.fetch(strNewFetchString);
                }
            }
            
            const strExplanationOfFetchedString = myDoc.sentences(0).text();
            const strFirstSenteceNormal = strExplanationOfFetchedString;//nlp(strExplanationOfFetchedString).sentences().data()[0].normal;
            console.log(JSON.stringify(nlp(strExplanationOfFetchedString).sentences().data()));
            let strFirstNouns = nlp(strFirstSenteceNormal).match('(is|are|was|were) #Determiner #Adjective+ #Noun').out();
            if (typeof strFirstNouns === 'undefined' || strFirstNouns === '') {
                strFirstNouns = nlp(strFirstSenteceNormal).match('(is|are|was|were) #Determiner * #Preposition? #Noun').out();
                if (typeof strFirstNouns === 'undefined' || strFirstNouns === '') {
                strFirstNouns = nlp(strFirstSenteceNormal).match('(is|are|was|were) #Determiner * #Preposition? #Noun (or|,)').out();
                if (typeof strFirstNouns === 'undefined' || strFirstNouns === '') {
                    strFirstNouns = nlp(strFirstSenteceNormal).match('(is|are|was|were) #Determiner * #Noun+ #Noun+').out();
                    if (typeof strFirstNouns === 'undefined' || strFirstNouns === '') {
                    strFirstNouns = nlp(strFirstSenteceNormal).match('* (is|are|was|were) #Determiner #Noun').out();
                    }
                }
                }
            }
            const arrFirstNouns = nlp(strFirstNouns).nouns().terms().out('array');

            let strLastNoun = '';
            if (arrFirstNouns.length > 0) {
                console.log(JSON.stringify(arrFirstNouns));
                strLastNoun = arrFirstNouns[arrFirstNouns.length - 1];
            }
            let out = `${strExplanationOfFetchedString}\n>>>>>>>>>>>${strLastNoun}<<<<<<<<<<<`
            return out;
        });
    }

    @Get("/")
    async getAllCalendars(): Promise<string> {
        return this.cmdService.list();
    }
}
