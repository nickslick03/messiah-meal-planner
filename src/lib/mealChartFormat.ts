import { mealLocations } from '../static/mealsDatabase';
import MealReference from '../types/MealReference';
import { UserSelectedMealsObjectType } from '../types/userSelectedMealsObject';
import dereferenceMeal from './dereferenceMeal';
import Meal from '../types/Meal';
import { applyDiscount } from './calculationEngine';

/**
 * This function takes in a UserSelectedMealsObject and returns data for a stacked chart of the total cost of each meal.
 *
 * @param userSelectedMeals The userSelectedMeals object
 * @param meals The list of all meals
 * @param customMeals The list of all custom meals
 * @param isDiscount Whether to apply the student discount to the meals
 * @returns The stacked chart of the total cost of each meal in the userSelectedMeals object
 */
export function userMealsToStackedChart(
  userSelectedMeals: UserSelectedMealsObjectType,
  meals: Meal[],
  customMeals: Meal[],
  isDiscount: boolean
) {
  const locationMap = mealLocations.reduce(
    (map, location) => map.set(location, Array(7).fill(0)),
    new Map<string, number[]>()
  );

  Object.entries<MealReference[]>(userSelectedMeals).forEach(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, mealRefs], i) => {
      const mealList = mealRefs.map((mr) =>
        dereferenceMeal(mr, meals, customMeals)
      );
      mealList.forEach((meal) => {
        const n = locationMap.get(meal.location) ?? [];

        n[i] += isDiscount ? applyDiscount(meal) : meal.price * 0.9;
        locationMap.set(meal.location, n);
      });
    }
  );

  return locationMap;
}
