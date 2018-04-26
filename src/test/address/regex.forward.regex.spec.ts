import 'mocha';
import { expect } from "chai";
import {Document} from '../../document';
import { Address, Forward, Regex } from '../../addresses';

describe("/df/+/as/", () => {
    let address: Address = new Forward(new Regex("df"), new Regex("as"));
    describe("on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf");
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
