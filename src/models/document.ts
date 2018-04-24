import { Range } from "./range";

export class Document {
    constructor(
        public readonly text: string,
        public readonly selections: Range[]
    ) {}

    lines() : Range[] {
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
}