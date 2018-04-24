import 'mocha';
import { expect } from "chai";
import { Line } from "./line";
import { Document } from '../models/document';

function getLine(line?: number): Line {
    if (line === undefined) {
        line = 1;
    }
    return new Line(line);
}

function getDocument(text?: string): Document {
    if (text === undefined) {
        text = "asdf";
    }
    return new Document(text, []);
}

describe(Line.name, () => {
    it('has a line property', () => {
        expect(getLine()).has.property("line").that.is.a("number");
    });
    describe("getRangeForward function", () => {
        it('exists', () => {
            expect(getLine())
                .has.property("getRangeForward")
                .that.is.a("function");
        });
        it('takes two arguments', () => {
            expect(getLine())
                .has.property("getRangeForward")
                .has.property("length")
                .that.equals(2);
        });
    });
    describe("0", () => {
        let line = getLine(0);
        describe("on empty string", () => {
            let document = getDocument("");
            it("starts at 0", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 0", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("end").that.equals(0);
            });
        });
        describe("on one line string", () => {
            let document = getDocument("asdf");
            it("starts at 0", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 0", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("end").that.equals(0);
            });
        });
        describe("on multi line string", () => {
            let document = getDocument("asdf\nfdsa\nasdf");
            it("starts at 0", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 0", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("end").that.equals(0);
            });
        });
    });
    describe("1", () => {
        let line = getLine(1);
        describe("on empty string", () => {
            let document = getDocument("");
            it("starts at 0", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 0", () => {
                let range = line.getRangeForward(document, 0);
                expect(range)
                    .has.property("end").that.equals(0);
            });
        });
        describe("on one line string", () => {
            let document = getDocument("asdf");
            it("starts at 0", () => {
                let range = line.getRangeForward(document, 0);
                expect(range).has.property("start").that.equals(0);
            });
            it("ends at 4", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("end").that.equals(4);
            });
        });
        describe("on multi line string", () => {
            let document = getDocument("asdf\nfdsa\nasdf");
            it("starts at 0", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 5", () => {
                expect(line.getRangeForward(document, 0))
                    .has.property("end").that.equals(5);
            });
        });
    });
});