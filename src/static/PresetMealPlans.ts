import { getMealTotal } from '../lib/calculationEngine';
import Meal from '../types/Meal';
import MealReference from '../types/MealReference';
import { UserSelectedMealsObjectType } from '../types/userSelectedMealsObject';
import { generateId } from './mealsDatabase';
import { v4 as uuid } from 'uuid';

/**
 * Represents a preset meal plan.
 */
export class PresetMealPlan {
  /**
   * The name of the meal plan.
   */
  name: string;

  /**
   * The description of the meal plan.
   */
  description: string;

  /**
   * Function that returns the user-selected meal plan.
   */
  userSelectedMealPlan: () => UserSelectedMealsObjectType;

  constructor(
    name: string,
    description: string,
    userSelectedMealPlan: () => UserSelectedMealsObjectType
  ) {
    this.name = name;
    this.description = description;
    this.userSelectedMealPlan = userSelectedMealPlan;
  }

  /**
   * Returns the weekly price of the meal plan.
   */
  weekPrice(isDiscount: boolean, meals: Meal[]) {
    return getMealTotal(
      this.userSelectedMealPlan(),
      Array(7).fill(1),
      isDiscount,
      meals
    );
  }
}

/**
 * Creates a meal reference with the given location and name.
 *
 * @param {string} location - The location of the meal.
 * @param {string} name - The name of the meal.
 * @return {MealReference} - The created meal reference.
 */
function createMealReference(
  location: string,
  name: string,
  meals: Meal[]
): MealReference {
  const id = generateId(location, name);
  try {
    if (!meals.some((meal) => meal.id === id))
      throw new Error(
        `Location ${location} and/or name ${name} are not part of the meal database.`
      );
  } catch (error) {
    console.log(error);
  }
  return {
    id: generateId(location, name),
    instanceId: uuid()
  };
}

/**
 * An array of preset meal plans.
 */
export const PresetMealPlans = (meals: Meal[]) => [
  new PresetMealPlan(
    'Lottie for Life',
    'Contains Lottie for breakfast, lunch, and dinner on weekdays, Lottie lunch and dinner on the weekends.',
    () => ({
      Sunday: [
        createMealReference('Lottie', 'Lunch', meals),
        createMealReference('Lottie', 'Dinner', meals)
      ],
      Monday: [
        createMealReference('Lottie', 'Breakfast', meals),
        createMealReference('Lottie', 'Lunch', meals),
        createMealReference('Lottie', 'Dinner', meals)
      ],
      Tuesday: [
        createMealReference('Lottie', 'Breakfast', meals),
        createMealReference('Lottie', 'Lunch', meals),
        createMealReference('Lottie', 'Dinner', meals)
      ],
      Wednesday: [
        createMealReference('Lottie', 'Breakfast', meals),
        createMealReference('Lottie', 'Lunch', meals),
        createMealReference('Lottie', 'Dinner', meals)
      ],
      Thursday: [
        createMealReference('Lottie', 'Breakfast', meals),
        createMealReference('Lottie', 'Lunch', meals),
        createMealReference('Lottie', 'Dinner', meals)
      ],
      Friday: [
        createMealReference('Lottie', 'Breakfast', meals),
        createMealReference('Lottie', 'Lunch', meals),
        createMealReference('Lottie', 'Dinner', meals)
      ],
      Saturday: [
        createMealReference('Lottie', 'Lunch', meals),
        createMealReference('Lottie', 'Dinner', meals)
      ]
    })
  ),
  new PresetMealPlan(
    'High Roller',
    "Features Falcon breakfast sandwiches on weekdays and an array of Union meals for lunch and dinner. Doesn't include drinks or deserts.",
    () => ({
      Sunday: [
        createMealReference('Union', 'Chicken Tenders', meals),
        createMealReference('Union', 'Cheesesteak', meals)
      ],
      Monday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich', meals),
        createMealReference('Union', 'Grilled Chicken Sandwich', meals),
        createMealReference('Union', 'Italian Pesto Wrap', meals)
      ],
      Tuesday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich', meals),
        createMealReference('Union', 'Beyond Meat Burger', meals),
        createMealReference('Union', 'CYO Sandwich', meals)
      ],
      Wednesday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich', meals),
        createMealReference('Union', 'Grilled Chicken Sandwich', meals),
        createMealReference('Union', 'Chipotle Grilled Chicken', meals)
      ],
      Thursday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich', meals),
        createMealReference('Union', 'Turkey BLT', meals),
        createMealReference('Union', 'Buffalo Chicken Wrap', meals)
      ],
      Friday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich', meals),
        createMealReference('Union', 'Turkey BLT', meals),
        createMealReference('Union', 'Blackbean Burger', meals)
      ],
      Saturday: [
        createMealReference('Union', 'Pasta', meals),
        createMealReference('Union', 'Crispy Chicken Sandwich', meals)
      ]
    })
  )
];
