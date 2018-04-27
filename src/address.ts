import { Document } from "./document";
import { Range } from "./range";

export interface Address {
    getRange(document: Document): Range;
}

export interface ForwardAddress {
    forwardFromPosition(position: number): Address;
}

export interface BackwardAddress {
    backwardFromPosition(position: number): Address;
}

