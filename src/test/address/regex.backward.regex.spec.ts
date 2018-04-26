import 'mocha';
import { expect } from "chai";
import {Document} from '../../document';
import { Address, Backward, Regex } from '../../addresses';

describe("/sa/-/as/", () => {
    let address: Address = new Backward(new Regex("sa"), new Regex("as"));
    describe("on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf");
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
