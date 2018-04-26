import { Address } from "./addresses";
import { Document } from "./document";

export class Print {
    constructor(private readonly address: Address) { }

    exec(document: Document): Document {
        let range = this.address.getRange(document);
        return document.print(range);
    }
}

export class Conditional {
    private readonly regex: RegExp;
    constructor(private readonly address: Address, regex: string, private readonly next: Print) {
        const caseInsensitive = regex.toLowerCase() === regex ? "i" : "";
        this.regex = new RegExp(regex, caseInsensitive);
    }

    exec(document: Document): Document {
        let range = this.address.getRange(document);
        if (!this.regex.test(document.getText(range))) {
            return document;
        } else {
            let temp = new Document(document.text, [range], document.changes);
            return this.next.exec(temp);
        }
    }
}