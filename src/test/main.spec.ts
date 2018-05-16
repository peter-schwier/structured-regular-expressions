import 'mocha';
import { expect } from "chai";
import * as sre from '../main';

describe("Document", () => {
    it("apply adds changes", () => {
        let original = new sre.Document("asdf");
        let changed = original.apply("asdf");
        expect(changed).has.property("changes").length(1);
    });
});