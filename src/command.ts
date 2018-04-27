import { Document } from "./document";

export interface Command {
    apply(document: Document): Document;
}
