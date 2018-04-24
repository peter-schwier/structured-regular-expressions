import 'mocha';
import { expect } from "chai";
import { Document } from "./document";

describe('Document', () => {
    it('has one argument', () => {
        expect(Document.length).to.equal(1);
    });
    it('is constructable', () => {
        expect(() => {
            return new Document("asdf");
        }).to.not.throw();
    });
    it('is a Document', () => {
        expect(new Document("asdf")).to.be.instanceof(Document);
    });
});