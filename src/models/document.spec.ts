import 'mocha';
import { expect } from "chai";
import { Document } from "./document";

describe('Document', () => {
    function getDocument() {
        return new Document("asdf", []);
    }
    it('is a Document', () => {
        expect(getDocument()).to.be.instanceof(Document);
    });
    it('has selections', () => {
        expect(getDocument()).has.property("selections").is.a("array");
    });
});