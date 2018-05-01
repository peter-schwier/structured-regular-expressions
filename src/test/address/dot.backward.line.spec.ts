import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { Range } from '../../range';
import { Backward as BackwardAddress, Dot, Line } from '../../addresses';
import { Address } from '../../address';
import { Backward as BackwardCommand } from "../../commands";
import { Command } from '../../command';

describe(".-0", () => {
    let address: Address = new BackwardAddress(new Dot(), new Line(0));
    describe("on empty string", () => {
        let document = new Document("");
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("from first two chars on one line string", () => {
        let document = new Document("asdf", [new Range(0, 2)], []);
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("from last two chars on one line string", () => {
        let document = new Document("asdf", [new Range(2, 4)], []);
        let start = 0; let end = 2;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("of last two if second line and first two of third line on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", [new Range(7, 12)], []);
        let start = 5; let end = 7;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
});

describe("-0", () => {
    let command: Command = new BackwardCommand(new Line(0));
    describe("on empty string", () => {
        let document = new Document("");
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("from first two chars on one line string", () => {
        let document = new Document("asdf", [new Range(0, 2)], []);
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("from last two chars on one line string", () => {
        let document = new Document("asdf", [new Range(2, 4)], []);
        let start = 0; let end = 2;
        it(`starts at ${start}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("of last two if second line and first two of third line on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", [new Range(7, 12)], []);
        let start = 5; let end = 7;
        it(`starts at ${start}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("end").that.equals(end);
        });
    });
});

describe(".-1", () => {
    let address: Address = new BackwardAddress(new Dot(), new Line(1));
    describe("on empty string", () => {
        let document = new Document("");
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("from first two chars on one line string", () => {
        let document = new Document("asdf", [new Range(0, 2)], []);
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("from last two chars on one line string", () => {
        let document = new Document("asdf", [new Range(2, 4)], []);
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("of last two of second line and first two of third line on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", [new Range(7, 12)], []);
        let start = 0; let end = 5;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });

});

describe("-1", () => {
    let command: Command = new BackwardCommand(new Line(1));
    describe("on empty string", () => {
        let document = new Document("");
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("from first two chars on one line string", () => {
        let document = new Document("asdf", [new Range(0, 2)], []);
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("from last two chars on one line string", () => {
        let document = new Document("asdf", [new Range(2, 4)], []);
        let start = 0; let end = 0;
        it(`starts at ${start}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("of last two of second line and first two of third line on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", [new Range(7, 12)], []);
        let start = 0; let end = 5;
        it(`starts at ${start}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let changed = document.apply(undefined, command);
            expect(changed).has.property("selections").with.property("length").that.equals(1);
            let range = changed.selections[0];
            expect(range).has.property("end").that.equals(end);
        });
    });
});