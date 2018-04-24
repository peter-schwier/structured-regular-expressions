import 'mocha';
import { expect } from "chai";
import { End } from "./end";
import { Document } from '../models/document';

describe(End.name, () => {
    let address = new End();

    describe("getRangeForward function", () => {
        describe("on empty string", () => {
            let document = new Document("", []);
            let start = 0; let end = 0;
            it(`starts at ${start}`, () => {
                let range = address.getRangeForward(document, 0);
                expect(range).has.property("start").that.equals(start);
            });
            it(`ends at ${end}`, () => {
                let range = address.getRangeForward(document, 0);
                expect(range).has.property("end").that.equals(end);
            });
        });
        describe("on one line string", () => {
            let document = new Document("asdf", []);
            let start = document.text.length; let end = document.text.length;
            it(`starts at ${start}`, () => {
                let range = address.getRangeForward(document, 0);
                expect(range).has.property("start").that.equals(start);
            });
            it(`ends at ${end}`, () => {
                let range = address.getRangeForward(document, 0);
                expect(range).has.property("end").that.equals(end);
            });
        });
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf", []);
            let start = document.text.length; let end = document.text.length;
            it(`starts at ${start}`, () => {
                let range = address.getRangeForward(document, 0);
                expect(range).has.property("start").that.equals(start);
            });
            it(`ends at ${end}`, () => {
                let range = address.getRangeForward(document, 0);
                expect(range).has.property("end").that.equals(end);
            });
        });
    });
});