import 'mocha';
import { expect } from "chai";
import { Address } from '../../src/address/address';
import { Forward } from '../../src/address/forward';
import { Regex } from '../../src/address/regex';
import { Document } from '../../src/models/document';

describe("/df/+/as/", () => {
    let address: Address = new Forward(new Regex("df").forwardFromPosition(0), new Regex("as"));
    describe("on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf", []);
        let start = 10; let end = 12;
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
