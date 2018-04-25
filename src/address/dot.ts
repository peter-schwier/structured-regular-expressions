import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address } from "./address";

export class Dot implements Address {
    constructor() { }
    getRange(document: Document): Range {
        if (document.selections.length > 0) {
            return document.selections[0];
        } else {
            return new Range(0, 0);
        }
    }
}