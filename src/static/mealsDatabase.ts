import Meal from '../types/Meal';
import CryptoJS from 'crypto-js';

/**
 * Generates a unique ID for a meal based on its location and name, should persist across app runs
 *  and be the same for all users.
 */
export const generateId = (location: string, name: string) => {
  return CryptoJS.MD5(location + name).toString();
};

/**
 * Checks if a meal is allowed/available on a given day.
 *
 * @param meal - The meal to check
 * @param day - The day to check
 * @returns Whether the meal is allowed on the given day
 */
export function isMealAllowedOnDay(meal: Meal, day: number) {
  return (
    (!meal.unavailable || meal.unavailable.every((d) => d !== day)) &&
    (!locationClosures[meal.location] ||
      locationClosures[meal.location].every((d) => d !== day))
  );
}

/** location values are arrays of weekdays represented as indices denoting when that location is closed. */
export const locationClosures: Record<string, number[]> = {
  Falcon: [0, 6]
};

const API_URL =
  'https://script.google.com/macros/s/AKfycbweFjflkyhI6l-nmDDsw68_a0L8r6kaJI5RZ_uUEepAbxBSOCiS12z7fj-x2pWeABmy_w/exec';

export const getMeals = async (): Promise<Meal[]> => {
  try {
    const resp = await fetch(API_URL);
    const json = await resp.json();
    const meals = (json as Meal[]).map((m) => ({
      ...m,
      id: generateId(m.location, m.name)
    }));
    return meals;
  } catch (error) {
    console.log(error);
    return [];
  }
};
