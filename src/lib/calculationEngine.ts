import Meal from "../types/Meal";
import { UserSelectedMealsObjectType } from "../types/userSelectedMealsObject";
import { DISCOUNTS } from "../static/discounts";

/**
 * Applies a discount to the meal price based on the location.
 * If the location does not have a discount, the original price is returned.
 *
 * @param meal - The meal object to apply the discount to.
 * @returns The discounted price of the meal.
 */
export function applyDiscount(meal: Meal) {
    return DISCOUNTS[meal.location] === undefined ? meal.price : meal.price * (1 - DISCOUNTS[meal.location]);    
}

/**
 * Calculates the total amount for the meals the user selected within the given timeframe.
 * @param meals The object representing the user selected meals
 * @param weekdays An array of weekdays the user will be purchasing meals in
 * @returns The total of all the meals given the amount of weekdays
 */
export function getMealTotal(meals: UserSelectedMealsObjectType, weekdays: number[]) {
    
    return 0;
}