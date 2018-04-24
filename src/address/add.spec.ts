import 'mocha';
import { expect } from "chai";
import { Document } from '../models/document';
import { Add } from './add';
import { Line } from './line';

describe(Add.name, () => {
    describe("getRangeForward function", () => {
        let address = new Add(new Line(0), new Line(0));
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
    describe("0+0", () => {
        let address = new Add(new Line(0), new Line(0));
        describe("on empty string", () => {
            let document = new Document("", []);
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
            let document = new Document("asdf", []);
            it("starts at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("end").that.equals(0);
            });
        });
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf", []);
            it("starts at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("end").that.equals(0);
            });
        });
    });
    
    describe("0+1", () => {
        let address = new Add(new Line(0), new Line(1));
        describe("on empty string", () => {
            let document = new Document("", []);
            it("starts at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 0", () => {
                let range = address.getRangeForward(document, 0);
                expect(range)
                    .has.property("end").that.equals(0);
            });
        });
        describe("on one line string", () => {
            let document = new Document("asdf", []);
            it("starts at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 4", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("end").that.equals(4);
            });
        });
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf", []);
            it("starts at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 5", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("end").that.equals(5);
            });
        });
    });
    
    describe("1+0", () => {
        let address = new Add(new Line(1), new Line(0));
        describe("on empty string", () => {
            let document = new Document("", []);
            it("starts at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("start").that.equals(0);
            });
            it("ends at 0", () => {
                let range = address.getRangeForward(document, 0);
                expect(range)
                    .has.property("end").that.equals(0);
            });
        });
        describe("on one line string", () => {
            let document = new Document("asdf", []);
            it("starts at 0", () => {
                let range = address.getRangeForward(document, 0);
                expect(range)
                    .has.property("start").that.equals(4);
            });
            it("ends at 4", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("end").that.equals(4);
            });
        });
        describe("on multi line string", () => {
            let document = new Document("asdf\nfdsa\nasdf", []);
            it("starts at 0", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("start").that.equals(5);
            });
            it("ends at 5", () => {
                expect(address.getRangeForward(document, 0))
                    .has.property("end").that.equals(5);
            });
        });
    });
});