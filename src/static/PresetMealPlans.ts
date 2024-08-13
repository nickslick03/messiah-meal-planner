import { getMealTotal } from '../lib/calculationEngine';
import MealReference from '../types/MealReference';
import { UserSelectedMealsObjectType } from '../types/userSelectedMealsObject';
import meals, { generateId } from './mealsDatabase';
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
  weekPrice(isDiscount: boolean) {
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
function createMealReference(location: string, name: string): MealReference {
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
export const PresetMealPlans = [
  new PresetMealPlan(
    'Lottie for Life',
    'Contains Lottie for breakfast, lunch, and dinner on weekdays, Lottie lunch and dinner on the weekends.',
    () => ({
      Sunday: [
        createMealReference('Lottie', 'Lunch'),
        createMealReference('Lottie', 'Dinner')
      ],
      Monday: [
        createMealReference('Lottie', 'Breakfast'),
        createMealReference('Lottie', 'Lunch'),
        createMealReference('Lottie', 'Dinner')
      ],
      Tuesday: [
        createMealReference('Lottie', 'Breakfast'),
        createMealReference('Lottie', 'Lunch'),
        createMealReference('Lottie', 'Dinner')
      ],
      Wednesday: [
        createMealReference('Lottie', 'Breakfast'),
        createMealReference('Lottie', 'Lunch'),
        createMealReference('Lottie', 'Dinner')
      ],
      Thursday: [
        createMealReference('Lottie', 'Breakfast'),
        createMealReference('Lottie', 'Lunch'),
        createMealReference('Lottie', 'Dinner')
      ],
      Friday: [
        createMealReference('Lottie', 'Breakfast'),
        createMealReference('Lottie', 'Lunch'),
        createMealReference('Lottie', 'Dinner')
      ],
      Saturday: [
        createMealReference('Lottie', 'Lunch'),
        createMealReference('Lottie', 'Dinner')
      ]
    })
  ),
  new PresetMealPlan(
    'High Roller',
    "Features Falcon breakfast sandwiches on weekdays and an array of Union meals for lunch and dinner. Doesn't include drinks or deserts.",
    () => ({
      Sunday: [
        createMealReference('Union', 'Chicken Tenders'),
        createMealReference('Union', 'Cheesesteak')
      ],
      Monday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich'),
        createMealReference('Union', 'Grilled Chicken Sandwich'),
        createMealReference('Union', 'Italian Stromboli')
      ],
      Tuesday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich'),
        createMealReference('Union', 'Beyond Meat Burger'),
        createMealReference('Union', 'CYO Sandwich')
      ],
      Wednesday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich'),
        createMealReference('Union', 'Grilled Cheese'),
        createMealReference('Union', 'Chipotle Grilled Chicken')
      ],
      Thursday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich'),
        createMealReference('Union', 'Turkey BLT'),
        createMealReference('Union', 'Bone In Chicken Wings')
      ],
      Friday: [
        createMealReference('Falcon', 'Bacon, Egg & Cheese Sandwich'),
        createMealReference('Union', 'Smoked Brisket Sandwich'),
        createMealReference('Union', 'Blackbean Burger')
      ],
      Saturday: [
        createMealReference('Union', 'Pasta'),
        createMealReference('Union', 'Crispy Chicken Sandwich')
      ]
    })
  )
];
