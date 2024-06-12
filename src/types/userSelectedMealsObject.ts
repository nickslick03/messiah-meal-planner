import MealReference from './MealReference';
import { WEEKDAYS } from '../static/constants';

/**
 * This class is used with the userSelectedMeals context.
 */
export class UserSelectedMealsObject {
  [key: string]: MealReference[];

  constructor() {
    WEEKDAYS.forEach((day) => {
      this[day] = [];
    });
  }
}

// Type alias for the class
export type UserSelectedMealsObjectType = {
  [K in (typeof WEEKDAYS)[number]]: MealReference[];
};
