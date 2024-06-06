/**
 * @param dateInput the date represented as a string from a date input (YYYY-MM-DD).
 * @returns The date object with the CORRECT DAY.
 */
export function strToDate(dateInput: string) {
    const [year, month, day] = dateInput.split('-');
    return new Date(`${month}/${day}/${year}`);
}