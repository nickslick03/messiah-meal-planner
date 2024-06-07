/**
 * Formats a number as a currency string.
 *
 * @param {number} value - The number to format as currency.
 * @returns {string} - The formatted currency string.
 */
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export default formatCurrency;
