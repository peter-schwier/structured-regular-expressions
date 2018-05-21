import 'mocha';
import { expect } from "chai";
import * as sre from '../main';

document(new sre.Document("asdf", [new sre.Range(0, 4)]), (command) => {
    command("p", (changed: sre.IDocument) => {
        it('="asdf"', () => {
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("asdf");
        });
    });
    command('i/asdf/', (changed: sre.IDocument) => {
        expect(changed).has.property("changes").length(1);
        let change = changed.changes[0];
        expect(change)
            .is.instanceOf(sre.Inserted)
            .and.has.property("offset")
            .that.equals(0);
    });
    command('a/asdf/', (changed: sre.IDocument) => {
        it("=[4]", () => {
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Inserted)
                .and.has.property("offset")
                .that.equals(4);
        });
    });
    command('d', (changed: sre.IDocument) => {
        it("=[0-4]", () => {
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Deleted)
                .and.has.property("range");
            let range = (<sre.Deleted>change).range;
            expect(range).property("start").equals(0);
            expect(range).property("end").equals(4);
        });
    });
    command('#0a/asdf/', (changed: sre.IDocument) => {
        it("=[0]", () => {
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Inserted)
                .and.has.property("offset")
                .that.equals(0);
        });

    });
    command('#0,#2p', (changed: sre.IDocument) => {
        it('="as"', () => {
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("as");
        });
    });
});

function document(original: sre.IDocument, description: DocumentDescription) {
    let text = '"' + original.text + '"';
    text += original.selections.map((selection) => '[' + selection.start + '-' + selection.end + ']').join('');
    describe(text, () => {
        description(commandTest);
    });
    function commandTest(command: string, test: (changed: sre.IDocument) => void): void {
        describe(command, () => {
            let changed = original.apply(command);
            test(changed);
        });
    }
}

interface DocumentDescription {
    (command: CommandTest): void;
}

interface CommandTest {
    (command: string, test: (changed: sre.IDocument) => void): void;
}