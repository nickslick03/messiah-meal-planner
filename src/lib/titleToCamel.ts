/**
 * Converts a title to camelCase.
 * @param title - The title to convert to camelCase
 * @returns The title in camelCase
 */
const camelify = (title: string) => {
  return title
    .split(' ') // Split the string into words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase(); // Convert the first word to lowercase
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize the first letter of subsequent words and make the rest lowercase
    })
    .join(''); // Join the words back together
};

export default camelify;
