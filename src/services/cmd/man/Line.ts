import { Word } from "./Word"
import { Section } from "./Section"
import { Text } from "./Text"

export class Line extends Text {
    isHeader = false;
    isEmpty = false;
    words: Word[] = [];

    constructor( nr: number, public string: string )
    {
        super(nr);

        if( this.string.length == 0 ) {
            this.isEmpty = true;
            // return;
        }

        if( !this.isEmpty && this.string.trim().match(/^[A-Z]*$/) ) {
            this.isHeader = true;
        }

        let indent = /^[ ]+/.exec(this.string);
        if ( indent && indent[0] && indent[0].length > 0 ) {
            this.indent = indent[0].length;
        }
        else { this.indent = 0; }

        this.words = this.string.split(/[ ]+/).filter( (w)=> w.length > 0 ).map( (word) => {
            return new Word(this.string.indexOf(word), word);
        });
    }

    search( subject:string ) : Section {
        let foundAt = this.string.search(Line.escapeRegExp(subject));
        return foundAt != -1? this.parent : null;
    }

    toString() : string {
        // return `${this.nr} : ${this.getIndent()} => ${this.parent.getNormalizedIndent()} + 1 => ${this.getNormalizedIndent()}`;
        // return `${this.nr} ->  ${this.indent} : ${"\t".repeat(this.getNormalizedIndent()) + this.words.map(W => W.position).join(" ")}`;
        return `${this.nr} : ${"\t".repeat(this.getNormalizedIndent()) + this.words.map(W => W.string).join(" ")}`;
        // return this.nr + ":" + "\t".repeat(this.getNormalizedIndent()) + this.words.join(" ");
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
