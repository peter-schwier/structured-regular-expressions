import 'mocha';
import { expect } from "chai";
import * as sre from '../main';
import { documentFromFile } from './helper';

documentFromFile("src/test/mine.txt", [new sre.Range(0, Number.MAX_SAFE_INTEGER)], (command) => {
    command('x/.*\\r?\\n?/@1p', (it) => {
        it('="MINE."', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("MINE.\r\n");
        });
    });
    command('x@1p', (it) => {
        it('="MINE."', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("MINE.\r\n");
        });
    });
    command('xg/Mine/p', (it) => {
        it('count 6', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(6);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.contains("Mine");
        });
    });
    command('y/Mine/p', (it) => {
        it('count 6', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(7);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.does.not.contain("Mine");
        });
    });
});


documentFromFile("src/test/mine.txt", [new sre.Range(0, 0)], (command) => {
    command('1p', (it) => {
        it('="MINE."', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("MINE.\r\n");
        });
    });
});
