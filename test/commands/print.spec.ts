import 'mocha';
import { expect } from "chai";
import { Print } from '../../src/commands/print';
import { Line } from '../../src/address/line';
import { Document } from '../../src/models/document';

describe(Print.name, () => {
    describe("1p", () => {
        let command: Print = new Print(new Line(1).forwardFromPosition(0));
        describe("on empty string", () => {
            let document = new Document("", [], []);
            it("prints ''", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("");
            });
        });
        describe("on one line string", () => {
            let document = new Document("asdf", [], []);
            it("prints 'asdf'", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("asdf");
            });
        });
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf", [], []);
            it("prints 'asdf\\n'", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("asdf\n");
            });
        });
    });
    describe("2p", () => {
        let command: Print = new Print(new Line(2).forwardFromPosition(0));
        describe("on empty string", () => {
            let document = new Document("", [], []);
            it("prints ''", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("");
            });
        });
        describe("on one line string", () => {
            let document = new Document("asdf", [], []);
            it("prints ''", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("");
            });
        });
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf", [], []);
            it("prints 'fdsa\\n'", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("fdsa\n");
            });
        });
    });
});