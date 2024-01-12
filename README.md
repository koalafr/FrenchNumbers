# FrenchNumbers

FrenchNumbers is a small program to convert an Integer list to it's French written equivalent

## Installation

Requires NodeJS/NPM

## Usage

Run the program with the default dataset

```bash
npm run start
```

Run the program with a custom dataset

```bash
npm run start ./dataset_custom.json
```

Test the program with the test dataset

```bash
npm run test
```

Use as a CommonJS module

```js
const IntArrayToFrenchNumbers = require("./converter.js");

// returns ["un", "deux", "dix"]
IntArrayToFrenchNumbers([1, 2, 10]);
```

## License

[MIT](LICENSE)
