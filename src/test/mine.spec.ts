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
    command('/MINE/p', (it) => {
        it('="MINE"', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("MINE");
        });
    });
    command('/MINE/.+#0,.+#1p', (it) => {
        it('="."', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals(".");
        });
    });
    command('/MINE/+/./p', (it) => {
        it('="."', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals(".");
        });
    });
    command('/Mine/+p', (it) => {
        it('="Mine by the royal seal!"', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("Mine by the royal seal!\r\n");
        });
    });
    command(',x/Mine/+p', (it) => {
        it('="Mine by the royal seal!"', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(6);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("Mine by the royal seal!\r\n");
        });
    });
    command(',xg/Mine/x/by/p', (it) => {
        it('count 4', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(4);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("by");
        });
    });
    command('/Bars/+-pd', (it) => {
        it('count 1', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(2);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("Bars cannot conceal!\r\n");
            change = changed.changes[1];
            expect(change)
                .is.instanceOf(sre.Deleted);
        });
    });
    command(',x/Mine/+-%3p', (it) => {
        it('count 2', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(2);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.equals("Mine by the sign in the scarlet prison\r\n");
        });
    });
    command('$-1p', (it) => {
        it('starts with "From"', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Printed)
                .and.has.property("text")
                .that.contains("From");
        });
    });
    command('/Mine/c/Mine\\n/', (it) => {
        it('contains \\n', (getChangedDocument) => {
            let changed = getChangedDocument();
            expect(changed).has.property("changes").length(1);
            let change = changed.changes[0];
            expect(change)
                .is.instanceOf(sre.Replaced)
                .and.has.property("text")
                .that.contains("\n");
        });
    });
});
