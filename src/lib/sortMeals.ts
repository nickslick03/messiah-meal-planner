import Meal from '../types/Meal';
import SortBy from '../types/SortBy';

/**
 * Sorts an array of Meal objects based on the specified criteria.
 *
 * @param {Meal[]} data - The array of Meal objects to be sorted.
 * @param {string} sortedBy - The field to sort the Meal objects by. Possible values are 'Place', 'Name', or 'Price'.
 * @param {boolean} sortDirection - The direction of the sorting. If true, the array will be sorted in ascending order; otherwise, it will be sorted in descending order.
 * @returns {Meal[]} - The sorted array of Meal objects.
 */
const sortMeals = (
  data: Meal[],
  sortedBy: SortBy,
  sortDirection: boolean
): Meal[] =>
  data.sort((a, b) => {
    switch (sortedBy) {
      case 'Place':
        return sortDirection
          ? a.location.localeCompare(b.location)
          : b.location.localeCompare(a.location);
      case 'Name':
        return sortDirection
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'Price':
        return sortDirection ? a.price - b.price : b.price - a.price;
      default:
        return 0;
    }
  });

export default sortMeals;
