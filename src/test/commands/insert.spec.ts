import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { Command, Insert } from '../../commands';
import { Insert as InsertChange } from '../../changes';

describe(Insert.name, () => {
    describe("i/asdf/", () => {
        let command: Command = new Insert(undefined, "asdf");
        describe("on empty string", () => {
            let document = new Document("");
            it("inserts 'asdf' at #0", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .is.instanceof(InsertChange)
                    .has.property("text")
                    .that.equals("asdf");
            });
        });
        describe("on one line string", () => {
            let document = new Document("asdf");
            it("inserts 'asdf' at #0", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .is.instanceof(InsertChange)
                    .has.property("text")
                    .that.equals("asdf");
            });
        });
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf");
            it("inserts 'asdf' at #0", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .is.instanceof(InsertChange)
                    .has.property("text")
                    .that.equals("asdf");
            });
        });
    });
});