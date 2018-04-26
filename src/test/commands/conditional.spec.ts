import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { Print, Conditional, Command, TempAddressCommand } from '../../commands';
import { Line } from '../../addresses';

describe(Print.name, () => {
    describe("1g/df/p", () => {
        let commands: Command[] = [new TempAddressCommand(new Line(1)), new Conditional("df", new Print())];
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
    describe("2g/fd/p", () => {
        let commands: Command[] = [new TempAddressCommand(new Line(2)), new Conditional("fd", new Print())];
        describe("on empty string", () => {
            let document = new Document("");
            it("does not print", () => {
                let changed = document.apply(...commands);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(0);
            });
        });
        describe("on one line string", () => {
            let document = new Document("asdf");
            it("does not print", () => {
                let changed = document.apply(...commands);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(0);
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
});