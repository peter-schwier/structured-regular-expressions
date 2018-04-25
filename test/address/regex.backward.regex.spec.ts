import 'mocha';
import { expect } from "chai";
import { Address } from '../../src/address/address';
import { Backward } from '../../src/address/backward';
import { Regex } from '../../src/address/regex';
import { Document } from '../../src/models/document';

describe("/sa/-/as/", () => {
    let address: Address = new Backward(new Regex("sa").forwardFromPosition(0), new Regex("as"));
    describe("on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", []);
        let start = 0; let end = 2;
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
