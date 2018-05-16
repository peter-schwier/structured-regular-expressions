
export class Document implements Document {
    readonly changes: Changed[] = [];
    constructor(
        public readonly text: string, 
        public readonly selections: Range[] = [new Range(0, 0)]
    ) { }

    public apply(commands: string): Document {
        // TODO: Call Parse and Apply libraries
        return new ChangedDocument(this.text, this.selections, [new Printed(commands)]);
    }
}

class ChangedDocument extends Document {
    constructor(
        public readonly text: string, 
        public readonly selections: Range[],
        public readonly changes: Changed[]
    ) { 
        super(text, selections);
        this.changes = changes;
    }
}

export class Range {
    constructor(public readonly start: number, public readonly end: number) { }
}

export interface Changed { }

export class Printed implements Changed {
    constructor(public readonly text: string) { }
}

export class Inserted implements Changed {
    constructor(public readonly offset: number, public readonly text: string) { }
}

export class Replaced implements Changed {
    constructor(public readonly range: Range, public readonly text: string) { }
}

export class Deleted implements Changed {
    constructor(public readonly range: Range) { }
}
