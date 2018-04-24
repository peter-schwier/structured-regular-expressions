import 'mocha';
import { expect } from "chai";
import { Range } from "./range";

describe('Range', () => {
    it('has two arguments', () => {
        expect(Range.length).to.equal(2);
    });
    it('has a start and end', () => {
        let range = new Range(1, 5);
        expect(range).has.property("start").that.equals(1);
        expect(range).has.property("end").that.equals(5);
    });
});