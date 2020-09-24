
import "../../extensions";
import { setFlagsFromString } from "v8";
import { Word } from "./man/Word"
import { Section } from "./man/Section"
import { Line } from "./man/Line"

class OptionDescription extends Section {
    options: Array<string>;
    constructor( section: Section ) {
        super(section.text[0] as Line);
        this.text = section.text;
        this.parent = section.parent;
        this.setup();
    }

    setup() {
        let firstLine = this.text[0];
        if (firstLine instanceof Line) {
            this.options = firstLine.words.join(" ").split(", ");
        }
    }

    isMatchOption (option: string) : boolean {
        let isMatching = this.options
        .map((iOp)=>iOp==option )
        .reduce((p,c)=>p||c, false);
        return isMatching;
    }
}

class OptionSection {

    text: Array<OptionDescription|Line|Section> = [];
    optionDescriptions: Array<OptionDescription>;
    constructor( section: Section ) {
        this.text = (section.text[1] as Section).text;
        // this.detectOptions();
    }

    detectOptions() {
        let optionDescriptionsRaw = new Array<Section>();

        this.text?.forEach(( element, index, array ) => {
            let nextE = index < array.length - 1 ? array[index+1] : null;
            
            if ( element instanceof Line && nextE instanceof Section) {
                optionDescriptionsRaw.push(new Section(element));
                // this.optionDescriptions.push(new OptionDescription());
            } else if ( element instanceof Section ){
                optionDescriptionsRaw.last().text.push(element);
            }
        });

        this.optionDescriptions = optionDescriptionsRaw.map(raw => new OptionDescription(raw));

        /*
        ( iTxtx => {
            if ( iTxtx instanceof Section && iTxtx.text[0] instanceof Line ) {
                let iO = new OptionDescription(iTxtx);
                iO.setup();
                return iO;
            } else if ( iTxtx instanceof Line ) {
                if ( iTxtx.isEmpty ) {
                    return null;
                } else {
                    return null;
                }
            } else { return null; }
        }).filter((t) => t!==null);
        */
    }

    searchOption( option:string ) : OptionDescription {
        let found = this.optionDescriptions
        .map((iOD)=>iOD.isMatchOption(option)?iOD:null)
        .filter((t) => t!==null);
        return found[0] || null;
    }
}

export class ManPage {
    text: Section[] = [];
    headerIndent: number;
    sysnopsys: Section;
    constructor( public name: string, public manString: string ) {
        this.parseText();
        this.sysnopsys = this.search("SYNOPSIS");
        this.readSynopsis();
        // this.manString = "";
    }

    readSynopsis() {
        // https://askubuntu.com/questions/650236/how-to-read-command-example-syntax-in-synopsis-sections-of-man-pages
        // http://www.tfug.org/helpdesk/general/man.html
        
        let optionsSection = new OptionSection( this.search("OPTIONS") );
        optionsSection.detectOptions();
        this.sysnopsys = this.search("SYNOPSIS").search(this.name);
        
        // strip unnesesary strings & seperate into array
        let parsedOptions = this.sysnopsys.getString()
        .replace("SYNOPSIS","")
        .replace(this.name,"")
        .replace(/(  )+/g," ")
        .match(/\[[^\[]+(\[[^\[]+\])?\]|(<[^>]+>)/g)
        .map((imo) => imo.replace(/^\[/,"").replace(/\]$/,"") );

        let description = parsedOptions
        .map((imo) => {
            // TODO: search for actual description in the section
            let all = imo.split("|").map((simo) => optionsSection.searchOption(simo));
            if ( all.length == 1 ) {
                return all[0];
            } else if (all.length == 0) {
                return null;
            } else { return all; }
        });
        // .reduce((acc, val) => acc.concat(val), []);

        console.log(optionsSection.optionDescriptions.map(x=>x.options));
        
        console.log(parsedOptions);
        console.log(description);
    }

    parseText() {
        let lines = this.manString.split(/\r?\n/)
        .map((line, nr) => Line.getLines(nr,line))
        .reduce((acc, val) => acc.concat(val), []);
        // this.sections = [new Section(lines[0])];
        lines.forEach((line,i) => {
            
            if( line.isEmpty && i > 0 && lines[i-1]) {
                line.indent = lines[i-1].getIndent();
            }

            if( line.isHeader && (this.headerIndent == null || line.getIndent() <= this.headerIndent))
            {
                if ( this.headerIndent == null ) {
                    this.headerIndent = line.getIndent();
                }
                this.text.push( new Section(line) );
                // this.sections = this.sections || [new Section(line.string)];
                
            } else if( this.text.last() ) {
                this.text.last().addLine(line);
            }
            
        });
    }

    search( subject:string ) : Section {
        let found = this.text
        .map((t)=>t.search(subject))
        .filter((t) => t!==null);
        return found[0] || null;
    }


    toString() : string {
        return this.text
        .map((itext) => (itext instanceof Line) ? itext.toString() : "\n" + itext.toString())
        .join("");
    }
}
