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

export class Document {
    public readonly lines: Range[];

    constructor(
        public readonly text: string,
        public readonly selections: Range[],
        public readonly changes: Changed[],
        public readonly stack: Range[][]
    ) {
        this.lines = this.findAllMatches(".*\n?", new Range(0, this.text.length));
    }

    public withSelections(selections: Range[]): Document {
        return new Document(
            this.text,
            selections,
            this.changes,
            this.stack
        );
    }

    public addChanges(changes: Changed[]): Document {
        return new Document(
            this.text,
            this.selections,
            this.changes.concat(changes),
            this.stack
        );
    }

    public pushSelections(): Document {
        return new Document(
            this.text,
            this.selections,
            this.changes,
            this.stack.concat([this.selections])
        );
    }

    public popSelections(): Document {
        return new Document(
            this.text,
            this.stack[this.stack.length - 1],
            this.changes,
            this.stack.slice(0, -1)
        );
    }

    public apply(commands: Command[]): Document {
        let document: Document = this;
        commands.forEach((command) => {
            document = command.apply(document);
        });
        return document;
    }

    public getSelectionText(selection: Range): string {
        return this.text.substring(selection.start, selection.end);
    }

    findMatch(regex: string, selection: Range): Match | undefined {
        return MatchImplementation.start(this, selection, regex);
    }

    findAllMatches(regex: string, selection: Range): Match[] {
        let matches = [];
        let match = this.findMatch(regex, selection);
        while (match) {
            matches.push(match);
            match = match.next();
        }
        return matches;
    }
}

export interface Command {
    apply(document: Document): Document;
}

export interface Match extends Range {
    readonly values: any[];
    next(): Match | undefined;
}

export class MatchImplementation implements Match {
    private constructor(
        public readonly text: string,
        public readonly regex: RegExp,
        public readonly start: number,
        public readonly end: number,
        public readonly values: any[]
    ) { }

    static start(document: Document, selection: Range, regex: string): Match | undefined {
        // Use a text variable from the start of the document until the end of the selection 
        // so greedy matches will not go past the selection
        let text = document.getSelectionText(new Range(0, selection.end));
        let caseInsensitive = regex.toLowerCase() === regex ? "i" : "";
        let regExp = new RegExp(regex, "g" + caseInsensitive);
        let match = new MatchImplementation(text, regExp, selection.end, selection.end, []);
        return match.next();
    }

    next(): Match | undefined {
        this.regex.lastIndex = this.end;
        let result = this.regex.exec(this.text);
        if (!result) {
            return undefined;
        }
        if (this.regex.lastIndex === this.end) {
            // zero length match, means no match
            return undefined;
        }
        result.shift(); // Remove the full text of the match
        return new MatchImplementation(
            this.text,
            this.regex,
            result.index,
            this.regex.lastIndex,
            result
        );
    }
}

export class Print implements Command {
    apply(document: Document): Document {
        return document.addChanges(
            document.selections.map(
                (selection) =>
                    new Printed(document.getSelectionText(selection))
            )
        );
    }
}

export class Insert implements Command {
    constructor(private readonly text: string) { }
    apply(document: Document): Document {
        return document.addChanges(
            document.selections.map(
                (selection) =>
                    new Inserted(selection.start, this.text)
            )
        );
    }
}

export class Append implements Command {
    constructor(private readonly text: string) { }
    apply(document: Document): Document {
        return document.addChanges(
            document.selections.map(
                (selection) =>
                    new Inserted(selection.end, this.text)
            )
        );
    }
}

export class Replace implements Command {
    constructor(private readonly text: string) { }
    apply(document: Document): Document {
        return document.addChanges(
            document.selections.map(
                (selection) =>
                    new Replaced(selection, this.text)
            )
        );
    }
}

export class Delete implements Command {
    apply(document: Document): Document {
        return document.addChanges(
            document.selections.map(
                (selection) =>
                    new Deleted(selection)
            )
        );
    }
}

export class Search implements Command {
    constructor(private readonly regex: string) { }
    apply(document: Document): Document {
        let selections: Range[] = [];
        document.selections.forEach((selection) => {
            let match = document.findMatch(this.regex, selection);
            while (match !== undefined) {
                selections.push(match);
                match = match.next();
            }
        });
        return document.withSelections(selections);
    }
}

export class SearchBetween implements Command {
    constructor(private readonly regex: string) { }
    apply(document: Document): Document {
        let selections: Range[] = [];
        document.selections.forEach((selection) => {
            let start = selection.start;
            let match = document.findMatch(this.regex, selection);
            while (match !== undefined) {
                selections.push(new Range(start, match.start));
                start = match.end;
                match = match.next();
            }
            selections.push(new Range(start, selection.end));
        });
        return document.withSelections(selections);
    }
}

export class Conditional implements Command {
    constructor(private readonly regex: string) { }
    apply(document: Document): Document {
        return document.withSelections(
            document.selections.filter(
                (selection) =>
                    document.findMatch(this.regex, selection) !== undefined
            )
        );
    }
}

export class NegatedConditional implements Command {
    constructor(private readonly regex: string) { }
    apply(document: Document): Document {
        return document.withSelections(
            document.selections.filter(
                (selection) =>
                    document.findMatch(this.regex, selection) === undefined
            )
        );
    }
}

export class Modulus implements Command {
    constructor(private readonly modulus: number) { }
    apply(document: Document): Document {
        return document.withSelections(
            document.selections.filter(
                (selection, index) =>
                    (index % this.modulus) === 0
            )
        );
    }
}

export class NumberedSelections implements Command {
    constructor(private readonly included: Range[]) {
        included.forEach((range) => {
            if (range.start <= 0) {
                throw new Error("NumberedSelections.included[].start must be greater than zero.");
            }
        });
    }
    apply(document: Document): Document {
        let selections: Range[] = [];

        document.selections.forEach((selection, index) => {
            index += 1;
            let include = false;
            this.included.forEach((range) => {
                if (range.start <= index && index <= range.end) {
                    include = true;
                }
            });
            if (include) {
                selections.push(selection);
            }
        });
        return document.withSelections(
            document.selections.filter((selection, index) => {
                index += 1;
                let include = this.included.reduce(
                    (included: boolean, range: Range, index: number) =>
                        included || (range.start <= index && index <= range.end)
                    , false);
                return include;
            })
        );
    }
}

export class PushSelections implements Command {
    apply(document: Document): Document {
        return document.pushSelections();
    }
}

export class PopSelections implements Command {
    apply(document: Document): Document {
        return document.popSelections();
    }
}

export interface Address {
    global: boolean;
    getRange(document: Document, selection?: Range): Range;
}

export class Span implements Command {
    constructor(private readonly start: Address, private readonly end: Address) {
        if (start.global !== end.global) {
            throw new Error("Span.start.global must equal Span.end.global.");
        }
    }
    apply(document: Document): Document {
        if (this.start.global) {
            return document.withSelections([
                new Range(
                    this.start.getRange(document).start,
                    this.end.getRange(document).end)
            ]);
        } else {
            return document.withSelections(
                document.selections.map(
                    (selection) =>
                        new Range(
                            this.start.getRange(document, selection).start,
                            this.end.getRange(document, selection).end
                        )
                )
            );
        }
    }
}

export interface ForwardOffsetAddress {
    getRangeForward(document: Document, selection: Range): Range;
}

export class Forward implements Command, Address {
    public readonly global: boolean;
    constructor(
        private readonly start: Address,
        private readonly next: ForwardOffsetAddress
    ) {
        this.global = this.start.global;
    }
    apply(document: Document): Document {
        if (this.start.global) {
            let range = this.getRange(document);
            return document.withSelections([range]);
        } else {
            let selections: Range[] =
                document.selections.map((selection) =>
                    this.getRange(document, selection));

            return document.withSelections(selections);
        }
    }
    getRange(document: Document, selection?: Range): Range {
        let range = this.start.getRange(document, selection);
        range = this.next.getRangeForward(document, range);
        return range;
    }
}

export interface BackwardOffsetAddress {
    getRangeBackward(document: Document, selection: Range): Range;
}


export class Backward implements Command, Address {
    public readonly global: boolean;
    constructor(
        private readonly start: Address,
        private readonly next: BackwardOffsetAddress
    ) {
        this.global = this.start.global;
    }
    apply(document: Document): Document {
        if (this.start.global) {
            let range = this.getRange(document);
            return document.withSelections([range]);
        } else {
            let selections: Range[] =
                document.selections.map((selection) =>
                    this.getRange(document, selection));

            return document.withSelections(selections);
        }
    }
    getRange(document: Document, selection?: Range): Range {
        let range = this.start.getRange(document, selection);
        range = this.next.getRangeBackward(document, range);
        return range;
    }
}

export class Dot implements Address {
    public readonly global: boolean = false;
    getRange(document: Document, selection?: Range): Range {
        return selection || new Range(0, 0);
    }
}

export class Character implements Command, Address, ForwardOffsetAddress, BackwardOffsetAddress {
    public readonly global: boolean = true;
    constructor(private readonly offset: number) { }
    apply(document: Document): Document {
        let range = this.getRange(document);
        return document.withSelections([range]);
    }
    getRange(document: Document, selection?: Range | undefined): Range {
        let range = this.getRangeForward(document, new Range(0, 0));
        return range;
    }
    getRangeForward(document: Document, selection: Range): Range {
        let offset = selection.end + this.offset;
        let range = new Range(offset, offset);
        return range;
    }
    getRangeBackward(document: Document, selection: Range): Range {
        let offset = selection.start - this.offset;
        let range = new Range(offset, offset);
        return range;
    }
}

export class Line implements Command, Address, ForwardOffsetAddress, BackwardOffsetAddress {
    public readonly global: boolean = true;
    constructor(private readonly offset: number) { }
    apply(document: Document): Document {
        let range = this.getRange(document);
        return document.withSelections([range]);
    }
    getRange(document: Document, selection?: Range | undefined): Range {
        let range = this.getRangeForward(document, new Range(0, 0));
        return range;
    }
    getRangeForward(document: Document, selection: Range): Range {
        let lines = document.lines.filter((line) => line.end >= selection.end);
        let offset = Math.max(0, Math.min(this.offset, lines.length - 1));
        return lines[offset];
    }
    getRangeBackward(document: Document, selection: Range): Range {
        let lines = document.lines.filter((line) => line.end >= selection.end);
        let offset = Math.max(0, Math.min(this.offset, lines.length - 1));
        offset = (lines.length - 1) - offset;
        return lines[offset];
    }
}

export class Regex implements Command, Address, ForwardOffsetAddress, BackwardOffsetAddress {
    public readonly global: boolean = true;
    constructor(private readonly regex: string) { }
    apply(document: Document): Document {
        let range = this.getRange(document);
        return document.withSelections([range]);
    }
    getRange(document: Document, selection?: Range | undefined): Range {
        let range = this.getRangeForward(document, new Range(0, 0));
        return range;
    }
    getRangeForward(document: Document, selection: Range): Range {
        let match = document.findMatch(this.regex,
            new Range(selection.end, document.text.length));
        return match || selection;
    }
    getRangeBackward(document: Document, selection: Range): Range {
        let matches = document.findAllMatches(this.regex, new Range(0, selection.start));
        if (matches.length <= 0) {
            return selection;
        } else {
            return matches[matches.length - 1];
        }
    }
}