const process = require("node:process");
const path = require("node:path");

const IntArrayToFrenchNumbers = require("./converter.js");

// read
function readFileOrDefault(inputFileName) {
  if (!inputFileName) {
    const defaultInputList = require("./dataset.json").input;
    return defaultInputList;
  } else {
    const inputFilePath = path.join(__dirname, inputFileName);
    const inputList = require(inputFilePath).input;
    // could use FS to check file exists
    return inputList;
  }
}

function main() {
  const inputFileName = process.argv[2];
  const inputList = readFileOrDefault(inputFileName);
  const frenchNumbers = IntArrayToFrenchNumbers(inputList);
  // print
  console.log(frenchNumbers);
}

main();
