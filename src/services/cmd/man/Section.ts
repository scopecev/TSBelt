

import { Text } from "./Text"
import { Line } from "./Line"

export class Section extends Text {
    text: Array<Line|Section> = [];
    // @JsonIgnore
    
    constructor( line: Line ) {
        super(line.nr);
        this.indent = line.getIndent();
        this.addLine(line);
    }

    getLastSection(indent: number) {
        let lastSection = this.text.last() instanceof Section ? (this.text.last() as Section) : null;
        if ( lastSection && indent < lastSection.getIndent()  ) {
            return lastSection.getLastSection(indent);
        }
        return lastSection;
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
            let lastText = this.text.last();
            let lastSection = this.getLastSection(lineIndent);

            
                if ( lastSection != null ) {
                    lastSection.addLine(line);
                }
                /*
                else if( lastText != null ) {
                    lastSection = new Section(lastText as Line);
                    lastSection.parent = this;
                    this.text.push(lastSection);
                    lastSection.addLine(line);
                }
                */
                else  {
                    let newSection = new Section(line);
                    newSection.parent = this;
                    this.text.push(newSection);
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
        .map((itext) => itext.toString())
        .join("\n");
    }
}
