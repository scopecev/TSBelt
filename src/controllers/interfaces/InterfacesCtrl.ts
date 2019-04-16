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
import "../../extensions";

/**
 * Add @Controller annotation to declare your class as Router controller.
 * The first param is the global path for your controller.
 * The others params is the controller dependencies.
 */
@Controller("/interfaces")
export default class InterfacesCtrl {

    constructor(private cmdService: CMDService) {

    }

    @Get("/:name")
    async get(@Required() @PathParams("name") name: string): Promise<any> {

        let output = this.cmdService.man(name)
        .then( (out) => new ManPage(name,out))
        .then( (man) => "<pre>" + JSON.stringify(man) + "\n\n" + man.manString + "</pre>");

        return output;
    }

    @Get("/")
    async getAllCalendars(): Promise<string> {
        return this.cmdService.list();
    }
}

class Text {
    protected indent: number;
    constructor( public nr: number ){}
    getIndent() { return this.indent; }
}

class Line extends Text {
    isHeader = false;
    isEmpty = false;
    words: string[] = [];

    constructor( nr: number, public string: string )
    {
        super(nr);

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

class Section extends Text {
    sections: Section[];
    text: Text[];
    parent:Section;
    constructor( line: Line ) {
        super(line.nr);
    }

    addLine( line: Line ) {
        let lineIndent = line.getIndent();
        
        if( lineIndent === this.indent ) {
            this.text.push(line);
        } else if ( lineIndent < this.indent ) {
            this.parent.addLine(line);
        } else if ( lineIndent > this.indent ) {
            if( this.sections.last() ) {
                this.sections.last().addLine(line);
            } else {
                this.text.push(new Section(line));
            }
        }
    }
}

class ManPage {
    sections: Section[];
    constructor( public name: string, public manString: string ) {
        this.parseText();
    }

    parseText() {
        let lines = this.manString.split(/\r?\n/).map((line, nr) => new Line(nr,line));
        this.sections = [new Section(lines[0])];
        lines.forEach((line) => {
            if( line.isEmpty ) {
                // return
            }

            if( line.isHeader )
            {
                // this.sections = this.sections || [new Section(line.string)];
                this.sections.push( new Section(line) );
            } else if( !line.isEmpty ) {
                this.sections.last().addLine(line);
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
