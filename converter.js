const {
  unitsWords,
  tensWords,
  hundredsWords,
  dashWord,
  andWord,
  pluralLetter,
} = require("./words");

// convert digits to word

function convertUnitToWord(unitNumber) {
  return unitsWords[unitNumber];
}

function convertTenToWord(tenNumber) {
  return tensWords[tenNumber];
}

function convertHundredToWords(hundredNumber) {
  // number + cent
  let frenchHundreds = "";
  if (hundredNumber > 1) {
    frenchHundreds = convertUnitToWord(hundredNumber) + dashWord;
  }
  frenchHundreds += hundredsWords[0];

  return frenchHundreds;
}

// parse numbers parts and convert to word

function parseConvertTens(intNumber, stringNumber) {
  let frenchTens = "";
  const tensNumber = intNumber % 100;
  if (tensNumber <= 16) {
    // 0-16
    frenchTens += convertUnitToWord(tensNumber);
    return frenchTens;
  } else {
    // refactor
    const unitString = stringNumber.charAt(stringNumber.length - 1);
    const tenString = stringNumber.charAt(stringNumber.length - 2);

    const unitNumber = parseInt(unitString);
    const tenNumber = parseInt(tenString);

    // 17 - 70 && 80 - 89
    if (tensNumber <= 70 || (tensNumber > 79 && tensNumber < 90)) {
      const unitFrenchWord = convertUnitToWord(unitNumber);
      const tenFrenchWord = convertTenToWord(tenNumber);

      frenchTens = tenFrenchWord;
      if (unitNumber != 0) {
        // special case
        if (unitNumber == 1 && tensNumber != 81) {
          frenchTens += andWord;
        }
        frenchTens += dashWord + unitFrenchWord;
      }
      return frenchTens;
    }

    // 71 - 79 && 90 - 99
    if (tensNumber > 70 && tensNumber < 100) {
      const unitFrenchWord = convertUnitToWord(unitNumber + 10);
      const tenFrenchWord = convertTenToWord(tenNumber - 1);
      frenchTens = tenFrenchWord;
      // special case
      if (tensNumber === 71) {
        frenchTens += andWord;
      }
      if (unitNumber != 0) {
        frenchTens += dashWord + unitFrenchWord;
      }
      return frenchTens;
    }
  }
}

function parseConvertHundreds(intNumber, stringNumber) {
  let frenchHundreds = "";
  const intHundreds = intNumber % 1000;
  const isHundredMultiple = intHundreds % 100 === 0;
  if (intHundreds > 99) {
    const hundredNumber = parseInt(
      stringNumber.charAt(stringNumber.length - 3)
    );
    // has hundreds, convert the digit
    frenchHundreds +=
      convertHundredToWords(hundredNumber) +
      (isHundredMultiple ? "" : dashWord);
  }
  // 100, 200
  if (intNumber === 0 || !isHundredMultiple) {
    // has tens, parse the tens
    frenchHundreds += parseConvertTens(intHundreds, stringNumber);
  }
  return frenchHundreds;
}

function parseConvertThousands(stringNumber) {
  const stringThousandsNumber = stringNumber.slice(0, -3);
  const intNumber = parseInt(stringThousandsNumber);
  let frenchThousands = parseConvertHundreds(intNumber, stringThousandsNumber);
  if (intNumber === 1) {
    // avoid un-mille
    return hundredsWords[1];
  }
  return frenchThousands + dashWord + hundredsWords[1];
}

function shouldBePlural(intNumber, stringNumber) {
  // is ending with 00 but is not plural
  if (intNumber === 100 || intNumber === 1000) {
    return false;
  }
  const wordEnd = stringNumber.substring(stringNumber.length - 2);
  if (wordEnd === "80" || wordEnd === "00") {
    return true;
  }
  return false;
}

// convert numbers under 999999 to words

function convertNumber(intNumber) {
  const stringNumber = intNumber.toString();
  let frenchWord = "";

  /// Thousands first
  if (intNumber >= 1000) {
    frenchWord += parseConvertThousands(stringNumber);
    if (intNumber % 1000 !== 0) {
      // only thousands
      frenchWord += dashWord;
    }
  }

  /// Hundreds last
  frenchWord += parseConvertHundreds(intNumber, stringNumber);

  // Plurals
  if (shouldBePlural(intNumber, stringNumber)) {
    frenchWord += pluralLetter;
  }
  return frenchWord;
}

// convert list of numbers to list of words

function IntArrayToFrenchNumbers(inputList) {
  const frenchNumbers = inputList.map((inputNumber) => {
    const frenchWord = convertNumber(inputNumber);
    return frenchWord;
  });
  return frenchNumbers;
}

module.exports = IntArrayToFrenchNumbers;
