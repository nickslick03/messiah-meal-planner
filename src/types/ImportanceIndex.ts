type Brand<T, B> = T & { __brand: B };
export type ImportanceIndex = Brand<number, 'ImportanceIndex'>;

/**
 * Creates a new ImportanceIndex value based on the given number value
 * ImportanceIndex values are used to indicate the importance level of a table cell
 * ImportanceIndex must be an integer between 1 and 6
 *
 * @param {number} value - The number value to create the ImportanceIndex from
 * @return {ImportanceIndex} The created ImportanceIndex value
 * @throws {Error} If the given value is not a valid importance index
 */
export const newImportanceIndex = (value: number): ImportanceIndex => {
  if (![1, 2, 3, 4, 5, 6].includes(value))
    throw new Error(`Number ${value} is not a valid importance index`);
  return value as ImportanceIndex;
};
