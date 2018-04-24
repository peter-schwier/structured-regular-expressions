import 'mocha';
import { foo } from "./main";

describe('blah', () => {
    it('should work', () => {
        // blah
        // throw new Error("asdf");
    });
    it('fails', () => {
        foo();
    });
});