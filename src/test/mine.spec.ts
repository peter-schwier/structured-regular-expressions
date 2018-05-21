import 'mocha';
import { expect } from "chai";
import * as fs from 'fs';
import * as sre from '../main';

documentFromFile("src/test/mine.txt", [new sre.Range(0, Number.MAX_SAFE_INTEGER)], (command) => {
    command('x/.*\\r?\\n?/@1p', (it) => {
        it('="MINE."', (getChangedDocument: () => sre.IDocument) => {
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

interface Command {
    (command: string, test: (it: CommandTest) => void): void;
}
interface CommandTest {
    (testName: string, test: (getChangedDocument: () => sre.IDocument) => void): void;
}
function documentFromFile(fileName: string, selections: sre.Range[], test: (command: Command) => void): void {
    let name = '(file:' + fileName + '"';
    name += selections.map((selection) => '[' + selection.start + '-' + selection.end + ']').join('');

    describe(name, () => {
        test((command: string, test: (it: CommandTest) => void): void => {
            describe(command, () => {
                test((testName: string, test: (getChangedDocument: () => sre.IDocument) => void): void => {
                    it(testName, () => {
                        test(() => {
                            let document = new sre.Document(
                                fs.readFileSync(fileName).toString(),
                                selections
                            );

                            let changed = document.apply(command);
                            return changed;                
                        });
                    });        
                });
            });

        });
    });
}