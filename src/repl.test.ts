import {cleanInput} from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "   hello world    ",
        expected: ["hello", "world"],
    },
    {
        input: "hello    world",
        expected: ["hello", "world"],
    },
    {
        input: "Charmander Bulbasaur PIKACHU",
        expected: ["charmander", "bulbasaur", "pikachu"],
    },
    {
        input: "hello world",
        expected: ["hello", "world"],
    },
    // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        // todo: call cleanInput with the input here
        const actual = cleanInput(input);

        // the `expect` and `toHaveLength` functions are from vitest
        // they will fail the test if the condition is not met
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});