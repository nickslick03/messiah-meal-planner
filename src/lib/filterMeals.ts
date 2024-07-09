import Meal from "../types/Meal";

/**
 * Filters an array of meals based on a given key.
 *
 * @param {Meal[]} meals An array of Meal objects to filter.
 * @param {string} key The key to search for in the name of each meal.
 * @returns {Meal[]} A new array containing the meals that have a word in the name or location that start with the key.
 */
export const filterMeals = (meals: Meal[], key: string) => {
    const regex = new RegExp(`(^| )${key}`, 'gi');
    return meals.filter((meal) => meal.name.match(regex) || meal.location.match(regex));
}