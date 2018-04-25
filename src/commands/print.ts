import { Address } from "../address/address";
import { Document } from "../models/document";

export class Print {
    constructor(public readonly address: Address) { }

    exec(document: Document): Document {
        let range = this.address.getRange(document);
        return document.print(range);
    }
}