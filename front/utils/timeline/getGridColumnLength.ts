interface EndDate {
  month: number | null;
  year: number | null;
}

interface StartDate {
  month: number;
  year: number;
}
export function getGridColumnLength(start: StartDate, end: EndDate): number {
  /*
        algorithm:
        1. separate date into two value, year and month
        2. subtract end.year and end.month with start.year and start.month
        3. (result of end.year minus start.year) times (12) //12 is the number of months
        4. (result of point 3) plus (the result of end.month minus start.month) 
        5. x months 
        example: start: 2019-12, end: 2020-09
        1. 2020 and 2019
        2. 2020 - 2019 = 1; 09 - 12 = -3
        3. 1 * 12
        4. 12 + (-3)
        5. 9 months
    */
  if (!end.year || !end.month) {
    const ArbitraryLengthForWhenEndDateNotDefined = 2;
    return ArbitraryLengthForWhenEndDateNotDefined;
  }
  const numberOfMonths = 12;
  const yearSubtractionResult = (end.year - start.year) * numberOfMonths;
  const monthSubtractionResult = end.month - start.month;
  const monthLength = yearSubtractionResult + monthSubtractionResult;

  return monthLength;
}
