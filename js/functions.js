function isStringLengthValid(str, maxLength) {
  return str.length <= maxLength;
}

isStringLengthValid('проверяемая строка', 20); // true
isStringLengthValid('проверяемая строка', 18); // true
isStringLengthValid('проверяемая строка', 10); // false

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = normalizedStr.split('').reverse().join('');
  return normalizedStr === reversedStr;
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл'); // true
