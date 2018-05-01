import 'mocha';
import { expect } from "chai";
import { Document } from '../../document';
import { Loop, Print, Forward } from '../../commands';
import { Span, Regex } from '../../addresses';
import { Command } from '../../command';
import { Address } from '../../address';

describe(",x/as/+/./p", () => {
    let address: Address = new Span();
    let commands: Command[] = [
        new Loop("as"),
        new Forward(new Regex(".")),
        new Print()];
    describe("on one line string", () => {
        let document = new Document("asdf");
        it("prints 'd'", () => {
            let changed = document.apply(address, ...commands);
            expect(changed)
                .has.property("changes")
                .is.an("array")
                .that.has.property("length")
                .that.equals(1);
            expect(changed.changes[0])
                .has.property("text")
                .that.equals("d");
        });
    });
    describe("on multi line string", () => {
        let document = new Document("asdf\nfdsa\nasdf");
        it("prints 'd','d'", () => {
            let changed = document.apply(address, ...commands);
            expect(changed)
                .has.property("changes")
                .is.an("array")
                .that.has.property("length")
                .that.equals(2);
            expect(changed.changes[0])
                .has.property("text")
                .that.equals("d");
            expect(changed.changes[1])
                .has.property("text")
                .that.equals("d");
        });
    });
});