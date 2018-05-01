import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { Range } from '../../range';
import { Line, Dot, Forward as ForwardAddress } from '../../addresses';
import { Address } from '../../address';
import { Forward as ForwardCommand } from "../../commands";
import { Command } from '../../command';

describe(".+0", () => {
    let address: Address = new ForwardAddress(new Dot(), new Line(0));
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
        let start = 2; let end = 4;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("of last two if first line and first two of second line on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", [new Range(2, 7)], []);
        let start = 7; let end = 10;
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

describe(".+1", () => {
    let address = new ForwardAddress(new Dot(), new Line(1));
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
        let start = 4; let end = 4;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("of last two if first line and first two of second line on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", [new Range(2, 7)], []);
        let start = 10; let end = 14;
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

describe("+0", () => {
    let command: Command = new ForwardCommand(new Line(0));
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
        let start = 2; let end = 4;
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
    describe("of last two if first line and first two of second line on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", [new Range(2, 7)], []);
        let start = 7; let end = 10;
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

describe("+1", () => {
    let command: Command = new ForwardCommand(new Line(1));
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
        let start = 4; let end = 4;
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
    describe("of last two if first line and first two of second line on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", [new Range(2, 7)], []);
        let start = 10; let end = 14;
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
