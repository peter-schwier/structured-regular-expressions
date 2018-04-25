import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address } from "./address";

export class Line implements Address {
    constructor(public readonly line: number) {
        if (line < 0) {
            throw new RangeError(`Cannot have a line number less than 0: ${line}`);
        }
     }
    getRangeForward(document: Document, fromPosition: number): Range {
        let lines = document.lines();
        while (lines.length > 0 && lines[0].start < fromPosition) {
            // Drop from consideration any line before the fromPosition
            lines.shift();
        }
        if (lines.length > 0) {
            // add the zero line from the fromPosition to the start of the next line
            lines.unshift(new Range(fromPosition, lines[0].start));
        } else {
            // add the zero line from the fromPosition to the end of the document
            lines.unshift(new Range(fromPosition, document.text.length));
        }
        
        if (this.line >= lines.length) {
            // If the line is outside the document
            return new Range(document.text.length, document.text.length);
        } else {
            return lines[this.line];
        }
    }
}