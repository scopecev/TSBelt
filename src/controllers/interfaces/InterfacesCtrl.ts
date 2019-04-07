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
import {NotFound} from "ts-httpexceptions";
import {CMDService} from "../../services/CMD/cmd";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 */
@Controller("/interfaces")
export class InterfacesCtrl {

    constructor(private cmdService: CMDService) {

    }

    @Get("/:name")
    async get(@Required() @PathParams("name") name: string): Promise<any> {

        let output = this.cmdService.man(name)
        .then( (out) => new ManPage(name,out))
        .then((man) => "<pre>" + JSON.stringify(man) + "\n\n" + man.manString + "</pre>");

        return output;
    }

    @Get("/")
    async getAllCalendars(): Promise<string> {
        return this.cmdService.list();
    }
}


class Line {
    isHeader = false;
    isEmpty = false;
    indent = 0;
    words: string[] = [];

    constructor( public nr: number, public string: string )
    {
        if( this.string.length == 0 ) {
            this.isEmpty = true;
            return;
        }

        if( this.string == this.string.toUpperCase() && this.string.length > 1 ) {
            this.isHeader = true;
        }

        let indent = /[ ]+/.exec(this.string);
        if ( indent && indent[0] && indent[0].length > 0 ) {
            this.indent = indent[0].length;
        }

        this.words = this.string.split(/[ ]+/).filter( (w)=> w.length > 0 ).map( (word) => {
            
            return word;
            // return word.replace(/([A-Z]+)/g, (sub)=>"<TITLE>"+sub+"</TITLE>")
            //.replace(/([A-Z]*)/g, (sub)=>"<TITLE>"+sub+"</TITLE>")
            //.replace(/([A-Z]*)/g, (sub)=>"<TITLE>"+sub+"</TITLE>")
        });
    }
}

class Section {
    sections: Section[] = [];
    lines: Line[] = [];
    g:Line[][];
    constructor( public title: string ) {

    }

    fin() {
        // this.g = this.lines.groupBy("indent");
        /*
        let lastIndent = this.lines[0].indent;
        this.lines.forEach((line) => {
            
            if( line.indent > lastIndent )
            {
                this.sections.last().fin();
                this.sections.push( new Section(line.string) );
            } else if( !line.isEmpty ) {
                this.sections.last().lines.push(line);
            }

            lastIndent = line.indent;
        });
        */
    }
}

class ManPage {
    sections: Section[];
    constructor( public name: string, public manString: string ) {
        this.sections = [new Section("HEAD")];
        this.parseText();
    }

    parseText() {
        let lines = this.manString.split(/\r?\n/).map((line, nr) => new Line(nr,line));

            lines.forEach((line) => {
                if( line.isEmpty ) {
                    // return
                }

                if( line.isHeader )
                {
                    // this.sections = this.sections || [new Section(line.string)];
                    this.sections[this.sections.length-1].fin();
                    this.sections.push( new Section(line.string) );
                } else if( !line.isEmpty ) {
                    this.sections[this.sections.length-1].lines.push(line);
                }
                
            });
            /*
            out.replace(/<TITLE>/g, "<TITLE></TITLE>")
            //.replace(/([A-Z]*)/g, (sub)=>"<TITLE>"+sub+"</TITLE>")
            .replace(/\</g, "&lt;")
            .replace(/\>/g, "&gt;"));
            */
    }
}
