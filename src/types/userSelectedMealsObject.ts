import Meal from '../types/Meal';
import { WEEKDAYS } from '../static/constants';

/**
 * This class is used with the userSelectedMeals context.
 */
export class UserSelectedMealsObject {
  Monday: Meal[] = [];
  Tuesday: Meal[] = [];
  Wednesday: Meal[] = [];
  Thursday: Meal[] = [];
  Friday: Meal[] = [];
  Saturday: Meal[] = [];
  Sunday: Meal[] = [];

  constructor() {
    WEEKDAYS.forEach((day) => {
      this[day] = [];
    });
  }
}

// Type alias for the class
export type UserSelectedMealsObjectType = {
  [K in (typeof WEEKDAYS)[number]]: Meal[];
};
