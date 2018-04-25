import 'mocha';
import { expect } from "chai";
import { Dot } from '../../src/address/dot';
import { Address } from '../../src/address/address';
import { Document } from '../../src/models/document';
import { Range } from '../../src/models/range';

describe(Dot.name, () => {
    let address: Address = new Dot();

    describe("on empty string", () => {
        let document = new Document("", [], []);
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
    describe("of first 2 chars on one line string", () => {
        let document = new Document("asdf", [new Range(0, 2)], []);
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
    describe("of third char on one line string", () => {
        let document = new Document("asdf", [new Range(2, 3)], []);
        let start = 2; let end = 3;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("of all four chars on one line string", () => {
        let document = new Document("asdf", [new Range(0, 4)], []);
        let start = 0; let end = 4;
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
        let start = 2; let end = 7;
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