import 'mocha';
import { expect } from "chai";
import * as sre from '../main';
import { document } from './helper';

document("asdf", [new sre.Range(0, 4)], (command) => {
    command("p", (it) => {
        it('="asdf"', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("asdf");
        });
    });
    command('i/asdf/', (it) => {
        it('=[0]', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Inserted)
                .and.has.property("offset")
                .that.equals(0);
        });
    });
    command('a/asdf/', (it) => {
        it("=[4]", (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Inserted)
                .and.has.property("offset")
                .that.equals(4);
        });
    });
    command('d', (it) => {
        it("=[0-4]", (getChangedDocument) => {
            let changed = getChangedDocument();
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
    command('#0a/asdf/', (it) => {
        it("=[0]", (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Inserted)
                .and.has.property("offset")
                .that.equals(0);
        });

    });
    command('#0,#2p', (it) => {
        it('="as"', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("as");
        });
    });
});
