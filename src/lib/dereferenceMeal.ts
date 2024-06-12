import MealReference from '../types/MealReference';
import Meal from '../types/Meal';

/**
 * Given a MealReference and arrays of meals and custom meals,
 * returns a new Meal object with the data from the referenced meal
 * and the provided instanceId.
 *
 * @param {MealReference} mr - The MealReference to be dereferenced.
 * @param {Meal[]} meals - An array of Meal objects representing regular meals.
 * @param {Meal[]} customMeals - An array of Meal objects representing custom meals.
 * @return {Meal} A new Meal object with the data from the referenced meal
 * and the provided instanceId.
 */
const dereferenceMeal = (
  mr: MealReference,
  meals: Meal[],
  customMeals: Meal[]
): Meal =>
  ({
    // Load meal data
    ...[...meals, ...customMeals].find((m) => m.id === mr.id),

    // Assign the instance id
    instanceId: mr.instanceId
  } as Meal);

export default dereferenceMeal;
