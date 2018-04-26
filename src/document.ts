import { Range } from "./range";
import { Print, Change, Insert } from "./changes";
import { Command } from "./commands";

export class Document {
    constructor(
        public readonly text: string,
        public readonly selections: Range[] = [new Range(0, 0)],
        public readonly changes: Change[] = []
    ) { }

    lines(): Range[] {
        let regex = new RegExp(".*\n?", "g");

        let ranges = [];
        let result = null;
        let lastIndex = 0;
        while (result = regex.exec(this.text)) {
            if (lastIndex >= regex.lastIndex) {
                // If the regex has gotten stuck at one position then skip forward.
                lastIndex += 1;
            }
            lastIndex = Math.max(lastIndex, regex.lastIndex);

            ranges.push(new Range(
                result.index,
                regex.lastIndex
            ));
            if (regex.lastIndex >= this.text.length) {
                break;
            }
        }
        return ranges;
    }

    getText(range: Range): string {
        return this.text.substring(range.start, range.end);
    }

    print(range: Range): Document {
        let text = this.getText(range);
        let change = new Print(text);
        return new Document(this.text, this.selections, this.changes.concat(change));
    }

    insert(position: number, text: string): Document {
        let change = new Insert(position, text);
        return new Document(this.text, this.selections, this.changes.concat(change));
    }

    apply(...commands: Command[]): Document {
        let document: Document = this;
        commands.forEach((command) => {
            document = command.apply(document);
        });
        return document;
    }

    forEachSelection(handler: (document: Document, selection: Range) => Document): Document {
        let document: Document = this;
        this.selections.forEach((selection) => {
            document = handler(document, selection);
        });
        return document;
    }
}