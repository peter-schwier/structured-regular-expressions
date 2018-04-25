import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address, BackwardAddress } from "./address";

export class Backward implements Address {
    constructor(public readonly start: Address, public readonly next: BackwardAddress) { }

    getRange(document: Document): Range {
        let startRange = this.start.getRange(document);
        return this.next.backward(startRange.start).getRange(document);
    }
}