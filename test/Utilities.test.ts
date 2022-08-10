import { jestTest2 } from "../src/Utilities";

describe('testing Utility.ts', () => {
    test('something should result in something', () => {
        expect(jestTest2()).toBe(42);
    });

    test('something else', () => {
        expect(jestTest2()).toBe(42);
    });


    // test('awaitPromiseInMs - awaits a result within the provided time (ms) and returns a status', async () => {
    //     expect(awaitPromiseInMs(3000).toBe(Promise)).toBe(Result.Failed);
    // });
});

