import 'mocha';
import { expect } from "chai";
import { Address } from '../../src/address/address';
import { Forward } from '../../src/address/forward';
import { Dot } from '../../src/address/dot';
import { Line } from '../../src/address/line';
import { Document } from '../../src/models/document';
import { Range } from '../../src/models/range';

describe(".+0", () => {
    let address: Address = new Forward(new Dot(), new Line(0));
    describe("on empty string", () => {
        let document = new Document("", []);
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
        let document = new Document("asdf", [new Range(0, 2)]);
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
        let document = new Document("asdf\nfdsa\nasdf", [new Range(2, 7)]);
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
    let address = new Forward(new Dot(), new Line(1));
    describe("on empty string", () => {
        let document = new Document("", []);
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
        let document = new Document("asdf", [new Range(0, 2)]);
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
        let document = new Document("asdf\nfdsa\nasdf", [new Range(2, 7)]);
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
