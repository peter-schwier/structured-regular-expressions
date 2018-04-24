import { Range } from "../models/range";
import { Document } from "../models/document";

export interface Address {
    getRangeForward(document: Document, fromPosition: number): Range;
}