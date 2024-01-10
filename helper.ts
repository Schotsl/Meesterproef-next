export function numberSuffix(number: number) {
  const lastDigits = number % 100;

  if (lastDigits > 10 && lastDigits < 14) {
    return number + "th";
  }

  const lastDigit = number % 10;

  switch (lastDigit) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
    default:
      return number + "th";
  }
}
