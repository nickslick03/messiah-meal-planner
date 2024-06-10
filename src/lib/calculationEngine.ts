import Meal from "../types/Meal";
import { UserSelectedMealsObjectType } from "../types/userSelectedMealsObject";
import { DISCOUNTS } from "../static/discounts";
import meals from "../static/mealsDatabase";
import { WEEKDAYS_START_SUNDAY } from "../static/constants";

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
 * Calculates the total price for a given list of meals over a specified number of weekdays.
 * Optionally applies a discount to the meal price based on the location.
 *
 * @param meals - An array of meal objects.
 * @param days - The number of weekdays for which to calculate the total price.
 * @param discount - A boolean flag indicating whether to apply a discount to the meal prices.
 * @returns The total price for the given meals over the specified number of weekdays.
 */
export function getMealDayTotal(meals: Meal[], days: number, discount = false) {
    let total = 0;
    meals.forEach(m => total += (discount? applyDiscount(m) : m.price));
    return total * days;
}

/**
 * Calculates the total amount for the meals the user selected within the given timeframe.
 * @param userMeals The object representing the user selected meals
 * @param weekdays An array of weekdays the user will be purchasing meals in
 * @param discount A boolean flag indicating whether to apply a discount to the meal prices.
 * @param searchMealList An array of meals to search from.
 * @returns The total of all the meals given the amount of weekdays
 */
export function getMealTotal(userMeals: UserSelectedMealsObjectType, weekdays: number[], discount: boolean, searchMealList: Meal[]): number {
    let total = 0;
    WEEKDAYS_START_SUNDAY.forEach((day, i) => {
        if (weekdays[i] === 0) return;
        const mealList = userMeals[day].map(mr => searchMealList.find(m => m.id === mr.id) as Meal);
        total += getMealDayTotal(mealList, weekdays[i], discount);
    });
    return total;
}