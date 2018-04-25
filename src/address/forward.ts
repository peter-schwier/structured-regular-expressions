import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address } from "./address";

export class Forward implements Address {
    constructor(public readonly start: Address, public readonly next: Address) { }

    getRangeForward(document: Document, fromPosition: number): Range {
        let startRange = this.start.getRangeForward(document, fromPosition);
        return this.next.getRangeForward(document, startRange.end);
    }
}