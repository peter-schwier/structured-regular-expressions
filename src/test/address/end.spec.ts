import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { End, Address } from '../../addresses';

describe(End.name, () => {
    let address: Address = new End();

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
        let start = document.text.length; let end = document.text.length;
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
        let start = document.text.length; let end = document.text.length;
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