import { Changed, Range } from "./apply";
import * as apply from "./apply";
export { Range, Changed, Printed, Inserted, Replaced, Deleted } from "./apply";

export interface IDocument {
    readonly text: string;
    readonly selections: Range[];
    readonly changes: Changed[];
    apply(commands: string): IDocument;
}

class BaseDocument implements IDocument {
    protected constructor(
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
    public apply(commands: string): IDocument {
        // Todo: Call Parse library to get commandArray
        let commandArray: apply.Command[] = [new apply.Print()];
        return new BaseDocument(
            this.document.apply(commandArray)
        );
    }
}

export class Document extends BaseDocument {
    constructor(
        text: string,
        selections: Range[] = [new Range(0, 0)]
    ) {
        super(new apply.Document(text, selections, [], []));
    }
}
