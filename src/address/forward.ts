import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address, ForwardAddress } from "./address";

export class Forward implements Address {
    constructor(public readonly start: Address, public readonly next: ForwardAddress) { }

    getRange(document: Document): Range {
        let startRange = this.start.getRange(document);
        return this.next.forwardFromPosition(startRange.end).getRange(document);
    }
}