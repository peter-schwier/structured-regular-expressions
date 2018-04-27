import { Range } from "./range";
import { Document } from "./document";
import { Address, ForwardAddress, BackwardAddress } from "./address";
import { Command } from "./command";

export class Backward implements Command, Address {
    constructor(public readonly start: Address = new Dot(), public readonly next: BackwardAddress) { }

    apply(document: Document): Document {
        return new Document(document.text, [this.getRange(document)], document.changes);
    }
    getRange(document: Document): Range {
        let startRange = this.start.getRange(document);
        return this.next.backwardFromPosition(startRange.start).getRange(document);
    }
}

export class Character implements Command, Address, ForwardAddress, BackwardAddress {
    constructor(private readonly character: number) {
        if (character < 0) {
            throw new RangeError(`Cannot have a character number less than 0: ${character}`);
        }
    }
    apply(document: Document): Document {
        return new Document(document.text, [this.getRange(document)], document.changes);
    }
    getRange(document: Document): Range {
        return this.forwardFromPosition(0).getRange(document);
    }
    forwardFromPosition(fromPosition: number): Address {
        return new ForwardCharacter(this.character, fromPosition);
    }
    backwardFromPosition(fromPosition: number): Address {
        return new BackwardCharacter(this.character, fromPosition);
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

class BackwardCharacter implements Address {
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

export class Dot implements Address {
    constructor() { }
    getRange(document: Document): Range {
        if (document.selections.length > 0) {
            return document.selections[0];
        } else {
            return new Range(0, 0);
        }
    }
}

export class End implements Command, Address {
    constructor() { }
    apply(document: Document): Document {
        return new Document(document.text, [this.getRange(document)], document.changes);
    }
    getRange(document: Document): Range {
        return new Range(document.text.length, document.text.length);
    }
}

export class Forward implements Command, Address {
    constructor(public readonly start: Address = new Dot(), public readonly next: ForwardAddress) { }
    apply(document: Document): Document {
        return new Document(document.text, [this.getRange(document)], document.changes);
    }
    getRange(document: Document): Range {
        let startRange = this.start.getRange(document);
        return this.next.forwardFromPosition(startRange.end).getRange(document);
    }
}

export class Line implements Command, Address, ForwardAddress, BackwardAddress {
    constructor(private readonly line: number) {
        if (line < 0) {
            throw new RangeError(`Cannot have a line number less than 0: ${line}`);
        }
    }
    apply(document: Document): Document {
        return new Document(document.text, [this.getRange(document)], document.changes);
    }
    getRange(document: Document): Range {
        return this.forwardFromPosition(0).getRange(document);
    }
    forwardFromPosition(fromPosition: number): Address {
        return new ForwardLine(this.line, fromPosition);
    }
    backwardFromPosition(fromPosition: number): Address {
        return new BackwardLine(this.line, fromPosition);
    }
}

class ForwardLine implements Address {
    constructor(private readonly line: number, private readonly fromPosition: number) { }

    getRange(document: Document): Range {
        let lines = document.lines();
        while (lines.length > 0 && lines[0].start < this.fromPosition) {
            // Drop from consideration any line before the fromPosition
            lines.shift();
        }
        if (lines.length > 0) {
            // add the zero line from the fromPosition to the start of the next line
            lines.unshift(new Range(this.fromPosition, lines[0].start));
        } else {
            // add the zero line from the fromPosition to the end of the document
            lines.unshift(new Range(this.fromPosition, document.text.length));
        }

        if (this.line >= lines.length) {
            // If the line is outside the document
            return new Range(document.text.length, document.text.length);
        } else {
            return lines[this.line];
        }
    }
}

class BackwardLine implements Address {
    constructor(private readonly line: number, private readonly fromPosition: number) { }

    getRange(document: Document): Range {
        let lines = document.lines().reverse();
        while (lines.length > 0 && lines[0].end > this.fromPosition) {
            // Drop from consideration any line after the fromPosition
            lines.shift();
        }
        if (lines.length > 0) {
            // add the zero line from the end of the next line to the fromPosition
            lines.unshift(new Range(lines[0].end, this.fromPosition));
        } else {
            // add the zero line from the start of the document to fromPosition
            lines.unshift(new Range(0, this.fromPosition));
        }

        if (this.line >= lines.length) {
            // If the line is outside the document
            return new Range(0, 0);
        } else {
            return lines[this.line];
        }
    }
}

export class Regex implements Command, Address, ForwardAddress, BackwardAddress {
    constructor(private readonly regex: string) { }
    apply(document: Document): Document {
        return new Document(document.text, [this.getRange(document)], document.changes);
    }
    getRange(document: Document): Range {
        return this.forwardFromPosition(0).getRange(document);
    }
    forwardFromPosition(fromPosition: number): Address {
        return new ForwardRegex(this.regex, fromPosition);
    }
    backwardFromPosition(fromPosition: number): Address {
        return new BackwardRegex(this.regex, fromPosition);
    }
}

class ForwardRegex implements Address {
    private readonly regex: RegExp;
    constructor(regex: string, private readonly fromPosition: number) {
        const caseInsensitive = regex.toLowerCase() === regex ? "i" : "";
        this.regex = new RegExp(regex, "g" + caseInsensitive);
    }

    getRange(document: Document): Range {
        this.regex.lastIndex = this.fromPosition;

        let result = this.regex.exec(document.text);

        if (result) {
            return new Range(result.index, this.regex.lastIndex);
        } else {
            return new Range(this.fromPosition, this.fromPosition);
        }
    }
}

class BackwardRegex implements Address {
    private readonly regex: RegExp;
    constructor(regex: string, private readonly fromPosition: number) {
        const caseInsensitive = regex.toLowerCase() === regex ? "i" : "";
        this.regex = new RegExp(regex, "g" + caseInsensitive);
    }

    getRange(document: Document): Range {
        // Start from the begining of the document
        this.regex.lastIndex = 0;

        // Operate only on the text before the fromPosition
        let text = document.text.substr(0, this.fromPosition);

        let range: Range = new Range(this.fromPosition, this.fromPosition);

        let result: any = null;
        while (result = this.regex.exec(text)) {
            // save the last range
            range = new Range(result.index, this.regex.lastIndex);
        }

        return range;
    }
}

export class Span implements Command, Address {
    constructor(public readonly start: Address = new Line(0), public readonly end: Address = new End()) { }
    apply(document: Document): Document {
        return new Document(document.text, [this.getRange(document)], document.changes);
    }
    getRange(document: Document): Range {
        let startRange = this.start.getRange(document);
        let endRange = this.end.getRange(document);
        return new Range(startRange.start, endRange.end);
    }
}