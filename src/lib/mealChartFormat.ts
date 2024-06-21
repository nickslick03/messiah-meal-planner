import { mealLocations } from '../static/mealsDatabase';
import MealReference from '../types/MealReference';
import { UserSelectedMealsObjectType } from '../types/userSelectedMealsObject';
import dereferenceMeal from './dereferenceMeal';
import Meal from '../types/Meal';

export function userMealsToStackedChart(
  userSelectedMeals: UserSelectedMealsObjectType,
  meals: Meal[],
  customMeals: Meal[]
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
        n[i] += meal.price;
        locationMap.set(meal.location, n);
      });
    }
  );

  return locationMap;
}
