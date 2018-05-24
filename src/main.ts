import { Changed, Range } from "./apply";
import * as apply from "./apply";
export { Range, Changed, Printed, Inserted, Replaced, Deleted } from "./apply";
let parser = require("./parser");

class BaseDocument implements Document {
    constructor(
        private readonly document: apply.Document
    ) { }
    get text(): string {
        return this.document.text;
    }
    get selections(): Range[] {
        return this.document.selections;
    }
    get changes(): Changed[] {
        return this.document.changes;
    }
    public apply(commands: string): Document {
        let parsed = <apply.Command[]> parser.parse(commands, {});
        return new BaseDocument(
            this.document.apply(parsed)
        );
    }
}

export class Document {
    public readonly changes: Changed[] = [];
    constructor(
        public readonly text: string,
        public readonly selections: Range[] = [new Range(0, 0)]
    ) {}
    public apply(commands: string): Document {
        let document = new apply.Document(this.text, this.selections, this.changes, []);
        let original = new BaseDocument(document);
        return original.apply(commands);
    }
}
