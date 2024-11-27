const verifyStringLength = (string, referenceLenth) =>
  string.length <= referenceLenth;

verifyStringLength('Good morning', 10);

const isPalindrome = (string) => {
  const stringToCheck = string.toLowerCase().replaceAll(' ', '');
  const lastIndex = stringToCheck.length - 1;
  for (let i = 0; i < stringToCheck.length / 2; i++) {
    if (stringToCheck[i] !== stringToCheck[lastIndex - i]) {
      return false;
    }
  }
  return true;
};

isPalindrome('abrAcad carba ');


const getNumberFromString = (string) => {
  let digitsString = '';
  string += '';
  for (let i = 0; i < string.length; i++) {
    const character = parseInt(string[i], 10);
    if (!isNaN(character)) {
      digitsString += character;
    }
  }
  return parseInt(digitsString, 10);
};

getNumberFromString(2023);

const addSymbols = (string, minLength, extention) => {
  let result = string;
  while (result.length < minLength) {
    const newResultLength = result.length + extention.length;
    let newExtention;
    if (newResultLength <= minLength) {
      newExtention = extention;
    } else {
      newExtention = extention.slice(0, minLength - newResultLength);
    }
    result = newExtention + result;
  }
  return result;
};

addSymbols('q', 4, 'we');
