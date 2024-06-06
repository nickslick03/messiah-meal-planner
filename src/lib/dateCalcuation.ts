/**
 * @param dateInput the date represented as a string from a date input (YYYY-MM-DD).
 * @returns The date object with the CORRECT DAY.
 */
export function strToDate(dateInput: string) {
    const [year, month, day] = dateInput.split('-');
    return new Date(`${month}/${day}/${year}`);
}

/**
 * Returns the amount of days in between the start and end parameters, 
 * inclusive (if the dates are on the name day, the function returns 1).
 * @param start The start date. Must be before the end date
 * @param end The end date
 * @returns The number of days in between the two dates, as an integer, inclusive. 
 * If the start date is after the end date, returns -1.
 */
export function getDaysBetween(start: Date, end: Date) {
    const startUnix = +start;
    const endUnix = +end;
    if (startUnix > endUnix) 
        return -1;
    return Math.floor((endUnix - startUnix) / 1000 / 60 / 60 / 24) + 1;
}

/**
 * Returns the number of each weekday that occur between the two dates, inclusive 
 * (if the dates are on the same day, the element at that weekday will equal 1).
 * @param start The start date. Must be before the end date
 * @param end The end date
 * @param weekOff If true, subtracts each element in the array by 1.
 * @returns An array were each element represents a day in the week ([0] == Monday, [6] == Saturday) 
 * and each element is the number of weekdays in between the two dates, inclusive. 
 * If the start date is after the end date, returns an array were each element is zero.
 */
export function getWeekdaysBetween(start: Date, end: Date, weekOff = false) {
    const daysBetween = getDaysBetween(start, end);
    const fullWeeks = Math.floor(daysBetween / 7) - (weekOff ? 1 : 0);

    if (daysBetween === -1 || fullWeeks < 0) 
        return Array.from<number>({ length: 7 }).fill(0);

    const weekdays = Array.from<number>({ length: 7 }).fill(fullWeeks);
    const startWeekday = start.getDay();
    const endWeekday = end.getDay();

    for (let i = startWeekday; i !== (endWeekday + 1) % 7; i = (i + 1) % 7) 
        weekdays[i]++; // adds weekdays not within a full week
    return weekdays;
}