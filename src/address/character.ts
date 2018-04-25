import { Document } from "../models/document";
import { Range } from "../models/range";
import { Address, ForwardAddress, BackwardAddress } from "./address";

export class Charcter implements Address, ForwardAddress, BackwardAddress {
    constructor(private readonly character: number) {
        if (character < 0) {
            throw new RangeError(`Cannot have a character number less than 0: ${character}`);
        }
    }
    getRange(document: Document): Range {
        return this.forward(0).getRange(document);
    }
    forward(fromPosition: number): Address {
        return new ForwardCharacter(this.character, fromPosition);
    }
    backward(fromPosition: number): Address {
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