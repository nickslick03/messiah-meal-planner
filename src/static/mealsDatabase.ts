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
  'https://script.google.com/macros/s/AKfycbxup2Xf52sqi2bEn_rIjQFEajhp4GSi2IaPnefJgP52zHYpyLI-XIpKBQC3oNiQVTV3dQ/exec';

/**
 * Fetches the meals from the API and returns an array of meal objects.
 *
 * @returns An array of meal objects
 */
export const getMeals = async (): Promise<Meal[]> => {
  try {
    const resp = await fetch(
      `${API_URL}?entity=Meals`,
      {
        redirect: "follow",
      });
    if (!resp.ok) {
      throw new Error(`Unable to find the menu. status: ${resp.status}`);
    }
    const json = await resp.json();
    const meals = (json as Meal[]).map((m) => ({
      ...m,
      id: generateId(m.location, m.name)
    }));
    return meals;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw new Error(
      'Unable to fetch the menu. Please refresh the page or try again in a few minutes.'
    );
  }
};

/**
 * Fetches the settings from the API and returns a setting object.
 *
 * @returns An array of meal objects
 */
export const getSettings = async (): Promise<Record<string, string | number>> => {
  try {
    const resp = await fetch(
      `${API_URL}?entity=Settings`,
    {
       redirect: "follow",
    });
    if (!resp.ok) {
      throw new Error(`Unable to find the settings. status: ${resp.status}`);
    }
    const json = await resp.json();
    return json;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw new Error(
      'Unable to fetch the settings. Please refresh the page or try again in a few minutes.'
    );
  }
};
