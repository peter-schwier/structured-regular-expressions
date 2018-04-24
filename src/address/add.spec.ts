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
    
    describe("0+1", () => {
        let address = new Add(new Line(0), new Line(1));
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
    
    describe("1+0", () => {
        let address = new Add(new Line(1), new Line(0));
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
            let start = 4; let end = 4;
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
            let start = 5; let end = 5;
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

    describe("1+1", () => {
        let address = new Add(new Line(1), new Line(1));
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
            let start = 4; let end = 4;
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
            let start = 5; let end = 10;
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

    describe("0+2", () => {
        let address = new Add(new Line(1), new Line(1));
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
            let start = 4; let end = 4;
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
            let start = 5; let end = 10;
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