import { Range } from "../models/range";
import { Document } from "../models/document";

export interface Address {
    getRange(document: Document): Range;
}

export interface ForwardAddress {
    forward(fromPosition: number): Address;
}

export interface BackwardAddress {
    backward(fromPosition: number): Address;
}