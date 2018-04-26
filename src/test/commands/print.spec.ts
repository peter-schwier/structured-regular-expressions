import 'mocha';
import { expect } from "chai";
import {Document} from '../../document';
import { Print, Command, TempAddressCommand } from '../../commands';
import { Line, Span } from '../../addresses';

describe(Print.name, () => {
    describe("1p", () => {
        let commands: Command[] = [new TempAddressCommand(new Line(1)), new Print()];
        describe("on empty string", () => {
            let document = new Document("");
            it("prints ''", () => {
                let changed = document.apply(...commands);
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
            let document = new Document("asdf");
            it("prints 'asdf'", () => {
                let changed = document.apply(...commands);
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
            let document = new Document("asdf\nfdsa\nasdf");
            it("prints 'asdf\\n'", () => {
                let changed = document.apply(...commands);
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
        let commands: Command[] = [new TempAddressCommand(new Line(2)), new Print()];
        describe("on empty string", () => {
            let document = new Document("");
            it("prints ''", () => {
                let changed = document.apply(...commands);
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
            let document = new Document("asdf");
            it("prints ''", () => {
                let changed = document.apply(...commands);
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
            let document = new Document("asdf\nfdsa\nasdf");
            it("prints 'fdsa\\n'", () => {
                let changed = document.apply(...commands);
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
    describe(",p", () => {
        let commands: Command[] = [new TempAddressCommand(new Span()), new Print()];
        describe("on empty string", () => {
            let document = new Document("");
            it("prints ''", () => {
                let changed = document.apply(...commands);
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
            let document = new Document("asdf");
            it("prints 'asdf'", () => {
                let changed = document.apply(...commands);
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
            let document = new Document("asdf\nfdsa\nasdf");
            it("prints 'asdf\\nfdsa\\nasdf'", () => {
                let changed = document.apply(...commands);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(1);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("asdf\nfdsa\nasdf");
            });
        });
    });
});