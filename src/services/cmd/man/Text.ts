
import { Section } from "./Section"

export class Text {
    indent: number;
    parent:Section;
    constructor( public nr: number ) {}
    getIndent() { return this.indent; }
    getNormalizedIndent() { return this.parent ? this.parent.getNormalizedIndent() + 1 : 0; }
}