import 'mocha';
import { expect } from "chai";
import { End } from "./end";
import { Document } from '../models/document';

function getDocument(text?: string): Document {
    if (text === undefined) {
        text = "asdf";
    }
    return new Document(text, []);
}

describe(End.name, () => {
    let address = new End();

    describe("getRangeForward function", () => {
        it('exists', () => {
            expect(address)
                .has.property("getRangeForward")
                .that.is.a("function");
        });
        it('takes two arguments', () => {
            expect(address)
                .has.property("getRangeForward")
                .has.property("length")
                .that.equals(2);
        });
    });

    describe("on empty string", () => {
        let document = getDocument("");
        it("starts at 0", () => {
            expect(address.getRangeForward(document, 0))
                .has.property("start").that.equals(0);
        });
        it("ends at 0", () => {
            expect(address.getRangeForward(document, 0))
                .has.property("end").that.equals(0);
        });
    });
    describe("on one line string", () => {
        let document = getDocument("asdf");
        it(`starts at ${document.text.length}`, () => {
            expect(address.getRangeForward(document, 0))
                .has.property("start").that.equals(document.text.length);
        });
        it(`ends at ${document.text.length}`, () => {
            expect(address.getRangeForward(document, 0))
                .has.property("end").that.equals(document.text.length);
        });
    });
    describe("on multi line string", () => {
        let document = getDocument("asdf\nfdsa\nasdf");
        it(`starts at ${document.text.length}`, () => {
            expect(address.getRangeForward(document, 0))
                .has.property("start").that.equals(document.text.length);
        });
        it(`ends at ${document.text.length}`, () => {
            expect(address.getRangeForward(document, 0))
                .has.property("end").that.equals(document.text.length);
        });
    });
});