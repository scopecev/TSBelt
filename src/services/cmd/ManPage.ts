
export class Text {
    protected indent: number;
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
        return this.nr + ":" + "\t".repeat(this.parent.getNormalizedIndent()) + this.string;
    }

    static escapeRegExp (str : string) {
        let metaChar = /[-[\]{}()*+?.\\^$|,]/g;
        return str.replace(metaChar, "\\$&");
    };

    static getLines( nr: number, string: string ) : Line[] {
        if( string.length == 0 ) {
            return [new Line(nr, string)]
        }
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
    text: Array<Section|Line> = [];
    // @JsonIgnore
    
    constructor( line: Line ) {
        super(line.nr);
        this.indent = line.getIndent();
        this.addLine(line);
    }

    addLine( line: Line ) {
        let lineIndent = line.getIndent();
        // console.log(line.toString());
        if( lineIndent === this.indent || line.isEmpty ) {
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
        .map((itext) => (itext instanceof Line) ? " " + itext.toString() : "\n-\n" + itext.toString())
        .join("\n");
    }
}


export class ManPage {
    text: Section[] = [];
    sysnopsys: Section;
    constructor( public name: string, public manString: string ) {
        this.parseText();
        this.sysnopsys = this.search("SYNOPSIS");
        this.readSynopsis();
    }

    readSynopsis() {
        // https://askubuntu.com/questions/650236/how-to-read-command-example-syntax-in-synopsis-sections-of-man-pages
        // http://www.tfug.org/helpdesk/general/man.html
        
        this.sysnopsys = this.search("SYNOPSIS");
        let optionsSection = this.search("OPTIONS");
        // strip unnesesary strings & seperate into array

        let parsedOptions = this.sysnopsys.getString()
        .replace("SYNOPSIS","")
        .replace(this.name,"")
        .replace(/(  )+/g," ")
        .match(/(\[([^\]]+|(\[[.]+\]))\])|(<[^>]+>)/g);
        // .map((imo)=>imo.substr(1,imo.length-2));

        let description = parsedOptions
        .map((imo) => imo.replace(/^\[/,"").replace(/\]$/,"") )
        .map((imo) => {
            // TODO: search for actual description in the section
            return optionsSection.search(imo);
        });
        console.log(parsedOptions);
        console.log(description);
    }

    parseText() {
        let lines = this.manString.split(/\r?\n/)
        .map((line, nr) => Line.getLines(nr,line))
        .reduce((acc, val) => acc.concat(val), []);
        // this.sections = [new Section(lines[0])];
        lines.forEach((line) => {
            
            if( line.isEmpty ) {
                // return
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
        .map((itext) => (itext instanceof Line) ? itext.toString() : "\n-\n" + itext.toString())
        .join("\n");
    }
}
