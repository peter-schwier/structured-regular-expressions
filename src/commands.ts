import { Document } from "./document";
import { Range } from "./range";
import { Command } from "./command";
import { BackwardAddress, ForwardAddress } from "./address";
import { Line } from "./addresses";

export class Print implements Command {
    apply(document: Document): Document {
        return document.forEachSelection(
            (document, selection) =>
                document.print(selection));
    }
}

export class Insert implements Command {
    constructor(private readonly text: string) { }

    apply(document: Document): Document {
        return document.forEachSelection(
            (document, selection) =>
                document.insert(selection.start, this.text));
    }
}

export class Append implements Command {
    constructor(private readonly text: string) { }

    apply(document: Document): Document {
        return document.forEachSelection(
            (document, selection) =>
                document.insert(selection.end, this.text));
    }
}

export class Conditional implements Command {
    private readonly regex: RegExp;
    constructor(regex: string) {
        const caseInsensitive = regex.toLowerCase() === regex ? "i" : "";
        this.regex = new RegExp(regex, caseInsensitive);
    }

    apply(document: Document): Document {
        let selections: Range[] = [];
        document.selections.forEach((selection) => {
            let text = document.getText(selection);
            let contains = this.regex.test(text);
            if (contains) {
                selections.push(selection);
            }
        });
        return document.withSelections(selections);
    }
}

export class Loop implements Command {
    private readonly regex: RegExp;
    constructor(regex: string = ".*\\n?") {
        const caseInsensitive = regex.toLowerCase() === regex ? "i" : "";
        this.regex = new RegExp(regex, "g" + caseInsensitive);
    }

    apply(document: Document): Document {
        let selections: Range[] = [];
        document.selections.forEach((selection) => {
            let text = document.text.substring(0, selection.end);

            this.regex.lastIndex = selection.start;

            let result = null;
            let lastIndex = this.regex.lastIndex;
            while (result = this.regex.exec(text)) {
                if (lastIndex >= this.regex.lastIndex) {
                    // If the regex has gotten stuck at one position then skip forward.
                    lastIndex += 1;
                }
                lastIndex = Math.max(lastIndex, this.regex.lastIndex);

                // Add this selection to the list of selections
                selections.push(new Range(result.index, this.regex.lastIndex));

                if (this.regex.lastIndex >= selection.end) {
                    break;
                }
            }
        });
        return document.withSelections(selections);
    }
}

export class Backward implements Command {
    constructor(public readonly next: BackwardAddress = new Line(1)) { }

    apply(document: Document): Document {
        let selections: Range[] = [];
        document.selections.forEach((selection) => {
            selections.push(this.next.backwardFromPosition(selection.start).getRange(document));
        });
        return document.withSelections(selections);
    }
}

export class Forward implements Command {
    constructor(public readonly next: ForwardAddress = new Line(1)) { }
    apply(document: Document): Document {
        let selections: Range[] = [];
        document.selections.forEach((selection) => {
            selections.push(this.next.forwardFromPosition(selection.end).getRange(document));
        });
        return document.withSelections(selections);
    }
}