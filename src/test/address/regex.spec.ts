import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { Regex } from '../../addresses';
import { Address } from '../../address';

describe(Regex.name, () => {
    describe("/sd/", () => {
        let address: Address = new Regex("sd");
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
            let start = 1; let end = 3;
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
    describe("/df\\nfd/", () => {
        let address: Address = new Regex("df\\nfd");
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf");
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
});