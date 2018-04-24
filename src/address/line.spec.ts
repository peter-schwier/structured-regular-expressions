import 'mocha';
import { expect } from "chai";
import { Line } from "./line";
import { Document } from '../models/document';

describe(Line.name, () => {
    describe("0", () => {
        let address = new Line(0);
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
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf", []);
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
    });
    describe("1", () => {
        let address = new Line(1);
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
            let start = 0; let end = 4;
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
            let start = 0; let end = 5;
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