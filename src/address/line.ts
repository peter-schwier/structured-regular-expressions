import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address } from "./address";

export class Line implements Address {
    constructor(public readonly line: number) { }
    getRangeForward(document: Document, fromPosition: number): Range {
        let lines = document.lines();
        while (lines.length > 0 && lines[0].end <= fromPosition) {
            // Drop from consideration any line before the fromPosition
            lines.shift();
        }
        
        let index = this.line - 1;
        if (index < 0) {
            return new Range(fromPosition, fromPosition);
        } else if (index >= lines.length) {
            return new Range(document.text.length, document.text.length);
        } else {
            return lines[index];
        }
    }
}