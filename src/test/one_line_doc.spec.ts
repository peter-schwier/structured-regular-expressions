import 'mocha';
import { expect } from "chai";
import * as sre from '../main';

describe("One Line Document", () => {
    describe("with all selected", () => {
        let original = new sre.Document("asdf", [new sre.Range(0, 4)]);
        it("prints the document", () => {
            let changed = original.apply("p");
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("asdf");
        });
        it("inserts at 0", () => {
            let changed = original.apply("i/asdf/");
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Inserted)
                .and.has.property("offset")
                .that.equals(0);
        });
        it("appends at 4", () => {
            let changed = original.apply("a/asdf/");
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Inserted)
                .and.has.property("offset")
                .that.equals(4);
        });
        it("deletes 0..4", () => {
            let changed = original.apply("d");
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Deleted)
                .and.has.property("range");
            let range = (<sre.Deleted>change).range;
            expect(range).property("start").equals(0);
            expect(range).property("end").equals(4);
        });
    });
});