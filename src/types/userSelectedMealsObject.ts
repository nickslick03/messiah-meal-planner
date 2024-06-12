import MealReference from './MealReference';
import { WEEKDAYS } from '../static/constants';

/**
 * This class is used with the userSelectedMeals context.
 */
export class UserSelectedMealsObject {
  Sunday: MealReference[] = [];
  Monday: MealReference[] = [];
  Tuesday: MealReference[] = [];
  Wednesday: MealReference[] = [];
  Thursday: MealReference[] = [];
  Friday: MealReference[] = [];
  Saturday: MealReference[] = [];
}

// Type alias for the class
export type UserSelectedMealsObjectType = {
  [K in (typeof WEEKDAYS)[number]]: MealReference[];
};
