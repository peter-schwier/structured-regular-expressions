import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address, ForwardAddress } from "./address";

export class Line implements Address, ForwardAddress {
    constructor(private readonly line: number) {
        if (line < 0) {
            throw new RangeError(`Cannot have a line number less than 0: ${line}`);
        }
    }
    forward(fromPosition: number): Address {
        return new ForwardLine(this.line, fromPosition);
    }
    getRange(document: Document): Range {
        return this.forward(0).getRange(document);
    }
}

class ForwardLine implements Address {
    constructor(private readonly line: number, private readonly fromPosition: number) { }

    getRange(document: Document): Range {
        let lines = document.lines();
        while (lines.length > 0 && lines[0].start < this.fromPosition) {
            // Drop from consideration any line before the fromPosition
            lines.shift();
        }
        if (lines.length > 0) {
            // add the zero line from the fromPosition to the start of the next line
            lines.unshift(new Range(this.fromPosition, lines[0].start));
        } else {
            // add the zero line from the fromPosition to the end of the document
            lines.unshift(new Range(this.fromPosition, document.text.length));
        }

        if (this.line >= lines.length) {
            // If the line is outside the document
            return new Range(document.text.length, document.text.length);
        } else {
            return lines[this.line];
        }
    }
}