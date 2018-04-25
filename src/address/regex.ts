import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address, ForwardAddress, BackwardAddress } from "./address";

export class Regex implements ForwardAddress, BackwardAddress {
    constructor(private readonly regex: string) { }
    forwardFromPosition(fromPosition: number): Address {
        return new ForwardRegex(this.regex, fromPosition);
    }
    backwardFromPosition(fromPosition: number): Address {
        return new BackwardRegex(this.regex, fromPosition);
    }
}

class ForwardRegex implements Address {
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

class BackwardRegex implements Address {
    constructor(private readonly regex: string, private readonly fromPosition: number) { }

    getRange(document: Document): Range {
        const caseInsensitive = this.regex.toLowerCase() === this.regex ? "i" : "";
        let regex = new RegExp(this.regex, "g" + caseInsensitive);

        // Start from the begining of the document
        regex.lastIndex = 0;

        // Operate only on the text before the fromPosition
        let text = document.text.substr(0, this.fromPosition);

        let range: Range = new Range(this.fromPosition, this.fromPosition);

        let result: any = null;
        while (result = regex.exec(text)) {
            // save the last range
            range = new Range(result.index, regex.lastIndex);
        }

        return range;
    }
}
