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
import {CMDService} from "../../services/CMD/cmd";
import CoreNLP, { Properties, Pipeline, ConnectorServer } from 'corenlp';

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
    async get(@Required() @PathParams("text") text: string): Promise<any> {

        const connector = new ConnectorServer({ dsn: 'http://localhost:9000' });
        const props = new Properties({ annotators: 'tokenize,ssplit,lemma,pos,ner,parse' });
        const pipeline = new Pipeline(props, 'English', connector);
        const sent = new CoreNLP.simple.Sentence(text);
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

    @Get("/")
    async getAllCalendars(): Promise<string> {
        return this.cmdService.list();
    }
}
