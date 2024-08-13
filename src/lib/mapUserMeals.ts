import { WEEKDAYS } from '../static/constants';
import Meal from '../types/Meal';
import MealReference from '../types/MealReference';
import { Weekday } from '../types/userSelectedMealsObject';

/**
 * Generates a UserSelectedMealsObjectType object by mapping over the WEEKDAYS array and
 * applying the given function to each element.
 *
 * @param {function(day: Weekday, index: number): [string, MealReference[] | Meal[]]} fn - The function
 * to apply to each element of WEEKDAYS. The function takes in a day and its index, and returns
 * a tuple containing a string key and either an array of MealReferences or Meals.
 * @returns {UserSelectedMealsObjectType} - The resulting UserSelectedMealsObjectType object.
 */
const mapUserMeals = (
  fn: (day: Weekday, index: number) => [string, MealReference[] | Meal[]]
) => Object.fromEntries(WEEKDAYS.map(fn));

export default mapUserMeals;
