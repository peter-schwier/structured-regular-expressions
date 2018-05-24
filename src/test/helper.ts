import 'mocha';
import * as fs from 'fs';
import * as sre from '../main';

export interface Commands {
    (
        command: (
            command: string,
            test: (
                commandTest: (
                    testName: string,
                    test: (
                        getChangedDocument: () => sre.Document
                    ) => void
                ) => void
            ) => void
        ) => void
    ): void;
}

export function document(
    text: string,
    selections: sre.Range[],
    test: Commands
) {
    return documentFromBuilder(
        text,
        selections,
        () => new sre.Document(text, selections),
        test
    );
}

export function documentFromFile(
    filename: string,
    selections: sre.Range[],
    test: Commands
) {
    return documentFromBuilder(
        '(file:' + filename + ')',
        selections,
        () => new sre.Document(fs.readFileSync(filename).toString(), selections),
        test
    );
}

function documentFromBuilder(
    name: string,
    selections: sre.Range[],
    getDocument: () => sre.Document,
    test: Commands
): void {
    describe(
        name + selections.map(
            (selection) => '[' + selection.start + '-' + selection.end + ']').join('')
        , () => {
            test((command, test) => {

                describe(command, () => {
                    test((testName, test) => {

                        it(testName, () => {
                            test(() => {
                                let document = getDocument();

                                let changed = document.apply(command);
                                return changed;
                            });
                        });
                    });
                });

            });
        });
}