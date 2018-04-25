import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address, ForwardAddress, BackwardAddress } from "./address";

export class Line implements ForwardAddress, BackwardAddress {
    constructor(private readonly line: number) {
        if (line < 0) {
            throw new RangeError(`Cannot have a line number less than 0: ${line}`);
        }
    }
    forward(fromPosition: number): Address {
        return new ForwardLine(this.line, fromPosition);
    }
    backward(fromPosition:number) : Address{
        return new BackwardLine(this.line, fromPosition);
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

class BackwardLine implements Address {
    constructor(private readonly line: number, private readonly fromPosition: number) { }

    /*
    1-4
    4-8
    8-12
    */
    getRange(document: Document): Range {
        let lines = document.lines().reverse();
        while (lines.length > 0 && lines[0].end > this.fromPosition) {
            // Drop from consideration any line after the fromPosition
            lines.shift();
        }
        if (lines.length > 0) {
            // add the zero line from the end of the next line to the fromPosition
            lines.unshift(new Range(lines[0].end, this.fromPosition));
        } else {
            // add the zero line from the start of the document to fromPosition
            lines.unshift(new Range(0, this.fromPosition));
        }

        if (this.line >= lines.length) {
            // If the line is outside the document
            return new Range(0, 0);
        } else {
            return lines[this.line];
        }
    }
}