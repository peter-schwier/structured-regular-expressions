import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address, ForwardAddress, BackwardAddress } from "./address";

export class Charcter implements ForwardAddress, BackwardAddress {
    constructor(private readonly character: number) {
        if (character < 0) {
            throw new RangeError(`Cannot have a character number less than 0: ${character}`);
        }
    }
    forwardFromPosition(fromPosition: number): Address {
        return new ForwardCharacter(this.character, fromPosition);
    }
    backwardFromPosition(fromPosition: number): Address {
        return new BackwardLine(this.character, fromPosition);
    }
}

class ForwardCharacter implements Address {
    constructor(private readonly character: number, private readonly fromPosition: number) { }

    getRange(document: Document): Range {
        let position = this.fromPosition + this.character;
        if (position > document.text.length) {
            return new Range(document.text.length, document.text.length);
        } else {
            return new Range(position, position);
        }
    }
}

class BackwardLine implements Address {
    constructor(private readonly character: number, private readonly fromPosition: number) { }

    getRange(document: Document): Range {
        let position = this.fromPosition - this.character;
        if (position < 0) {
            return new Range(0, 0);
        } else {
            return new Range(position, position);
        }
    }
}