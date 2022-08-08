import { jestTest2 } from "../src/Utilities";

describe('testing Utility.ts', () => {
    test('something should result in something', () => {
        expect(jestTest2()).toBe(42);
    });

    test('something else', () => {
        expect(jestTest2()).toBe(42);
    });
});

