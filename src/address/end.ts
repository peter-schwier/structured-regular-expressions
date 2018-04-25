import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address } from "./address";

export class End implements Address {
    constructor() { }
    getRange(document: Document): Range {
        return new Range(document.text.length, document.text.length);
    }
}