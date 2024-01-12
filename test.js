const test = require("node:test");
const assert = require("node:assert");
const testInputList = require("./dataset_test.json").input;

const IntArrayToFrenchNumbers = require("./converter.js");

test("should return the correct french numbers", (t) => {
  const expected = [
    "un",
    "onze",
    "cinq",
    "cent",
    "dix-sept",
    "quatre-vingts",
    "quarante-cinq",
    "seize-mille-quatre-cent-cinquante-cinq",
    "vingt-deux",
    "quatre-vingt-un",
    "cent-dix-sept",
    "cent-deux",
    "deux-cents",
    "quatre-vingt-onze",
    "quatre-vingt-quinze",
    "soixante-douze",
    "deux-cent-soixante-quinze",
    "deux-mille-cent-quatre",
    "deux-cent-cinquante-et-un-mille-huit-cents",
    "cent-quatre-vingt-milles",
    "huit-cent-soixante-et-onze",
    "quatre-vingt-dix-neuf",
    "soixante-dix-sept",
  ];
  const result = IntArrayToFrenchNumbers(testInputList);
  assert.deepStrictEqual(expected, result);
});
