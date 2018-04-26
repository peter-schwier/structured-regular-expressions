import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { Loop, Print, Conditional, Command } from '../../commands';
import { Span } from '../../addresses';

describe(Loop.name, () => {
    describe(",x/[&\\n]+/p", () => {
        let command: Command = new Loop(new Span(), "[^\\n]+", new Print());
        describe("on one line string", () => {
            let document = new Document("asdf");
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
            let document = new Document("asdf\nfdsa\nasdf");
            it("prints 'asdf','fdsa','adsf'", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(3);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("asdf");
                expect(changed.changes[1])
                    .has.property("text")
                    .that.equals("fdsa");
                expect(changed.changes[2])
                    .has.property("text")
                    .that.equals("asdf");
            });
        });
    });
    describe(",x/[&\\n]+/g/df/p", () => {
        let command: Command = new Loop(new Span(), "[^\\n]+", new Conditional(undefined, "df", new Print()));
        describe("on one line string", () => {
            let document = new Document("asdf");
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
            let document = new Document("asdf\nfdsa\nasdf");
            it("prints 'asdf','adsf'", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(2);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("asdf");
                expect(changed.changes[1])
                    .has.property("text")
                    .that.equals("asdf");
            });
        });
    });
    describe(",xp", () => {
        let command: Command = new Loop(new Span(), undefined, new Print());
        describe("on one line string", () => {
            let document = new Document("asdf");
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
            let document = new Document("asdf\nfdsa\nasdf");
            it("prints 'asdf\\n','fsda\\n','adsf'", () => {
                let changed = command.exec(document);
                expect(changed)
                    .has.property("changes")
                    .is.an("array")
                    .that.has.property("length")
                    .that.equals(3);
                expect(changed.changes[0])
                    .has.property("text")
                    .that.equals("asdf\n");
                expect(changed.changes[1])
                    .has.property("text")
                    .that.equals("fdsa\n");
                expect(changed.changes[2])
                    .has.property("text")
                    .that.equals("asdf");
            });
        });
    });
});