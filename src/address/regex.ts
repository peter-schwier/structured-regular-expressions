import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address, ForwardAddress } from "./address";

export class Regex implements ForwardAddress {
    constructor(private readonly regex: string) { }
    forwardFromPosition(fromPosition: number): Address {
        return new ForwardLine(this.regex, fromPosition);
    }
}

class ForwardLine implements Address {
    constructor(private readonly regex: string, private readonly fromPosition: number) { }

    getRange(document: Document): Range {
        const caseInsensitive = this.regex.toLowerCase() === this.regex ? "i" : "";
        let regex = new RegExp(this.regex, "g" + caseInsensitive);
        regex.lastIndex = this.fromPosition;

        let result = regex.exec(document.text);

        if (result) {
            return new Range(result.index, regex.lastIndex);
        } else {
            return new Range(this.fromPosition, this.fromPosition);
        }
    }
}
