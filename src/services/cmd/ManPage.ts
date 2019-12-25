
import "../../extensions";
import { setFlagsFromString } from "v8";

export class Text {
    indent: number;
    parent:Section;
    constructor( public nr: number ){}
    getIndent() { return this.indent; }
    getNormalizedIndent() { return this.parent ? this.parent.getNormalizedIndent()+1 : 0; }
}

export class Line extends Text {
    isHeader = false;
    isEmpty = false;
    words: string[] = [];

    constructor( nr: number, public string: string )
    {
        super(nr);

        if( this.string.length == 0 ) {
            this.isEmpty = true;
            // return;
        }

        if( !this.isEmpty && this.string == this.string.toUpperCase() && this.string.length > 1 ) {
            this.isHeader = true;
        }

        let indent = /^[ ]+/.exec(this.string);
        if ( indent && indent[0] && indent[0].length > 0 ) {
            this.indent = indent[0].length;
        }
        else { this.indent = 0; }

        this.words = this.string.split(/[ ]+/).filter( (w)=> w.length > 0 ).map( (word) => {
            
            return word;
        });
    }

    search( subject:string ) : Section {
        let foundAt = this.string.search(Line.escapeRegExp(subject));
        return foundAt != -1? this.parent : null;
    }

    toString() : string {
        return this.nr + ":" + "\t".repeat(this.getNormalizedIndent()) + this.words.join(" ");
    }

    static escapeRegExp (str : string) {
        let metaChar = /[-[\]{}()*+?.\\^$|,]/g;
        return str.replace(metaChar, "\\$&");
    };

    static getLines( nr: number, string: string ) : Line[] {
        
        if( string.length == 0 ) {
            return [new Line(nr, string)]
        }
        return [new Line(nr, string)];
        let subLines = string.replace(/(    )+/g, (s)=> "\n"+s).split(/\n/);
        // console.log(string.replace(/(    )+/g, (s)=> " x "));
        // console.log(string.replace(/(    )+/g, (s)=> "----"));
        subLines.forEach(( subLine, i ) => {
            if (i > 1) {
                let pos = string.lastIndexOf(subLine);
                subLines[i] = " ".repeat(pos) + subLine;
            }
        });
        return subLines
        .filter( (subLine) => subLine.length > 0 )
        .map((newstring) => new Line(nr,newstring));
    }
}


export class Section extends Text {
    text: Array<OptionDescription|Line|Section> = [];
    // @JsonIgnore
    
    constructor( line: Line ) {
        super(line.nr);
        this.indent = line.getIndent();
        this.addLine(line);
    }

    addLine( line: Line ) {
        let lineIndent = line.getIndent();
        // console.log(line.toString());
        if( lineIndent === this.indent ) {
            line.parent = this;
            this.text.push(line);
        } else if ( lineIndent < this.indent && this.parent ) {
            this.parent.addLine(line);
        } else if ( lineIndent > this.indent ) {
            let lastSection = this.text.last() instanceof Section ? (this.text.last() as Section) : null;

            if ( lastSection && lineIndent < lastSection.getIndent()  ) {
                let newSection = new Section(line);
                newSection.parent = this.parent;
                this.text.push(newSection);
            } else {
                if( lastSection === null ) {
                    let newSection = new Section(line);
                    newSection.parent = this;
                    this.text.push(newSection);
                } else {
                    lastSection.addLine(line);
                }
            }
        }
    }

    search( subject:string ) : Section {
        let found = this.text
        .map((t)=>t.search(subject))
        .filter((t) => t!==null);
        return found[0] || null;
    }

    getString() : string {
        let string = this.text.map((t) => {
            if ( t instanceof Line ) {
                return t.string;
            } else if ( t instanceof Section ) {
                return t.getString();
            }
        }).join(" ");;
        return string;
    }

    toString() : string {
        return this.text
        .map((itext) => (itext instanceof Line) ? " " + itext.toString() : itext.toString())
        .join("\n");
    }
}

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

class OptionSection extends Section {
    optionDescriptions: Array<OptionDescription>;
    constructor( section: Section ) {
        super(section.text[0] as Line);
        this.text = (section.text[1] as Section).text;
        this.detectOptions();
    }

    detectOptions() {
        let optionDescriptionsRaw = new Array<Section>();

        this.text.forEach(( element, index, array ) => {
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
        
        let optionsSection = new OptionSection(this.search("OPTIONS"));
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

            if( line.isHeader )
            {
                // this.sections = this.sections || [new Section(line.string)];
                this.text.push( new Section(line) );
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
