/**
 * Converts a string in the format YYYY-MM-DD (value attribute from a date input tag) to a Date object.
 *
 * @param dateInput the date represented as a string from a date input (YYYY-MM-DD).
 * @returns The date object with the CORRECT DAY.
 */
export function dateInputToDate(dateInput: string) {
  const [year, month, day] = dateInput.split('-');
  return new Date(`${month}/${day}/${year}`);
}

/**
 * Converts a string in the format YYYY-MM-DD (value attribute from a date input tag) to a Date object.
 *
 * @param dateInput - the date represented as a string from a date input (YYYY-MM-DD).
 * @returns The date object with the correct day.
 */
export function dateToString(date: Date) {
  const year = date.getFullYear() + '';
  const month = date.getMonth() + 1 + '';
  const day = date.getDate() + '';
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * Returns the amount of days in between the start and end parameters,
 * inclusive (if the dates are on the name day, the function returns 1).
 *
 * @param start The start date. Must be before the end date
 * @param end The end date
 * @returns The number of days in between the two dates, as an integer, inclusive.
 * If the start date is after the end date, returns -1.
 */
export function getDaysBetween(start: Date, end: Date) {
  const startUnix = +start;
  const endUnix = +end;
  if (startUnix > endUnix) return -1;
  return Math.floor((endUnix - startUnix) / 1000 / 60 / 60 / 24) + 1;
}

/**
 * Returns the number of each weekday that occur between the two dates, inclusive
 * (if the dates are on the same day, the element at that weekday will equal 1).
 *
 * @param start The start date. Must be before the end date
 * @param end The end date
 * @param weeksOff The number of weeks the student is taking off of the meal plan timeframe.
 * @returns An array were each element represents a day in the week ([0] == Sunday, [6] == Saturday)
 * and each element is the number of weekdays in between the two dates, inclusive.
 * If the start date is after the end date, returns an array were each element is zero.
 */
export function getWeekdaysBetween(start: Date, end: Date, weeksOff = 0) {
  const daysBetween = getDaysBetween(start, end);
  const fullWeeks = Math.floor(daysBetween / 7) - weeksOff;

  if (daysBetween === -1 || fullWeeks < 0) return Array(7).fill(0);

  const weekdays = Array(7).fill(fullWeeks);
  const startWeekday = start.getDay();
  const endWeekday = end.getDay();

  for (let i = startWeekday; i !== (endWeekday + 1) % 7; i = (i + 1) % 7)
    weekdays[i]++; // adds weekdays not within a full week
  return weekdays;
}

/**
 * Returns an array of all dates between the start and end dates, inclusive.
 *
 * @param start The start date. Must be before the end date
 * @param end The end date
 * @returns An array of dates between the start and end dates. If the start date is after the end date, returns an empty array.
 */
export const getAllDatesBetween = (start: Date, end: Date): Date[] =>
  start > end
    ? []
    : [new Date(start)].concat(
        getAllDatesBetween(
          new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1),
          end
        )
      );
