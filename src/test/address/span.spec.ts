import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { Span, Character } from '../../addresses';
import { Address } from '../../address';

describe("#1+#2", () => {
    let address: Address = new Span(new Character(1), new Character(2));
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
    describe("on one line string", () => {
        let document = new Document("asdf");
        let start = 1; let end = 2;
        it(`starts at ${start}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("start").that.equals(start);
        });
        it(`ends at ${end}`, () => {
            let range = address.getRange(document);
            expect(range).has.property("end").that.equals(end);
        });
    });
    describe("on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf");
        let start = 1; let end = 2;
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
