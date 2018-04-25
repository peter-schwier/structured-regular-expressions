import { Range } from "../models/range";
import { Document } from "../models/document";

export interface Address {
    getRange(document: Document): Range;
}

export interface ForwardAddress {
    forwardFromPosition(position: number): Address;
}

export interface BackwardAddress {
    backwardFromPosition(position: number): Address;
}