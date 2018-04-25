import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address } from "./address";

export class Span implements Address {
    constructor(public readonly start: Address, public readonly end: Address) { }

    getRange(document: Document): Range {
        let startRange = this.start.getRange(document);
        let endRange = this.end.getRange(document);
        return new Range(startRange.start, endRange.end);
    }
}