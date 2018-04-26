import { Address, Dot } from "./addresses";
import { Document } from "./document";
import { Range } from "./range";

export interface Command {
    exec(document: Document): Document;
}

export class Print implements Command {
    constructor(private readonly address: Address = new Dot()) { }

    exec(document: Document): Document {
        let range = this.address.getRange(document);
        return document.print(range);
    }
}

export class Insert implements Command {
    constructor(private readonly address: Address = new Dot(), private readonly text: string) { }

    exec(document: Document): Document {
        let range = this.address.getRange(document);
        return document.insert(range.start, this.text);
    }
}

export class Append implements Command {
    constructor(private readonly address: Address = new Dot(), private readonly text: string) { }

    exec(document: Document): Document {
        let range = this.address.getRange(document);
        return document.insert(range.end, this.text);
    }
}

export class Conditional implements Command {
    private readonly regex: RegExp;
    constructor(private readonly address: Address = new Dot(), regex: string, private readonly next: Command) {
        const caseInsensitive = regex.toLowerCase() === regex ? "i" : "";
        this.regex = new RegExp(regex, caseInsensitive);
    }

    exec(document: Document): Document {
        let range = this.address.getRange(document);
        let text = document.getText(range);
        let contains = this.regex.test(text);
        if (!contains) {
            return document;
        } else {
            let temp = new Document(document.text, [range], document.changes);
            return this.next.exec(temp);
        }
    }
}

export class Loop implements Command {
    private readonly regex: RegExp;
    constructor(private readonly address: Address = new Dot(), regex: string = ".*\\n?", private readonly next: Command) {
        const caseInsensitive = regex.toLowerCase() === regex ? "i" : "";
        this.regex = new RegExp(regex, "g" + caseInsensitive);
    }

    exec(document: Document): Document {
        let range = this.address.getRange(document);
        let text = document.text.substring(0, range.end);

        this.regex.lastIndex = range.start;

        let ranges: Range[] = [];
        let result = null;
        let lastIndex = this.regex.lastIndex;
        while (result = this.regex.exec(text)) {
            if (lastIndex >= this.regex.lastIndex) {
                // If the regex has gotten stuck at one position then skip forward.
                lastIndex += 1;
            }
            lastIndex = Math.max(lastIndex, this.regex.lastIndex);

            // Set the dot for the next command
            document = new Document(
                document.text,
                [new Range(result.index, this.regex.lastIndex)],
                document.changes);
            // Run the next command and capture the dot and changes
            document = this.next.exec(document);
            // Save the dot to the ranges array
            ranges = ranges.concat(...document.selections);

            if (this.regex.lastIndex >= range.end) {
                break;
            }
        }

        // Set the selection back to the union of all selections
        document = new Document(document.text, ranges, document.changes);

        return document;
    }
}
