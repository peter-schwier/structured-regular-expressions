import 'mocha';
import { expect } from "chai";
import { Charcter } from '../../src/address/character';
import { Address } from '../../src/address/address';
import { Document } from '../../src/models/document';

describe(Charcter.name, () => {
    describe("#0", () => {
        let address: Address = new Charcter(0).forwardFromPosition(0);
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
        describe("on one line string", () => {
            let document = new Document("asdf", []);
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
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf", []);
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
    });
    describe("#1", () => {
        let address = new Charcter(1).forwardFromPosition(0);
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
        describe("on one line string", () => {
            let document = new Document("asdf", []);
            let start = 1; let end = 1;
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
            let document = new Document("asdf\nfdsa\nasdf", []);
            let start = 1; let end = 1;
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