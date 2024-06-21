import meals, { mealLocations } from "../static/mealsDatabase";
import MealReference from "../types/MealReference";
import { UserSelectedMealsObjectType } from "../types/userSelectedMealsObject";
import dereferenceMeal from "./dereferenceMeal";

export function userMealsToStackedChart(userSelectedMeals: UserSelectedMealsObjectType) {

    const locationMap = mealLocations.reduce(
        (map, location) => map.set(location, Array(7).fill(0)), 
        new Map<string, number[]>());
    
    Object.entries<MealReference[]>(userSelectedMeals).forEach(([_, mealRefs], i) => {
        const mealList = mealRefs.map((mr) => dereferenceMeal(mr, meals, []));
        mealList.forEach((meal) => {
            const n = locationMap.get(meal.location) ?? [];
            n[i] += meal.price;
            locationMap.set(meal.location, n);
        });
    });

    return locationMap;
}

export function userMealsToPieChart(userSelectedMeals: UserSelectedMealsObjectType) {



}