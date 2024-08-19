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

/**
 * The list of all available meals at Messiah (that we have catalogued)
 */
const meals: Meal[] = [
  {
    location: 'Lottie',
    name: 'Breakfast',
    price: 6.55,
    unavailable: [0, 6]
  },
  {
    location: 'Lottie',
    name: 'Lunch',
    price: 9.55
  },
  {
    location: 'Lottie',
    name: 'Dinner',
    price: 12.1
  },
  {
    location: 'Union',
    name: 'Smash Burger',
    price: 4.5
  },
  {
    location: 'Union',
    name: 'Crispy Chicken Sandwich',
    price: 5.5
  },
  {
    location: 'Union',
    name: 'Grilled Chicken Sandwich',
    price: 6.75
  },
  {
    location: 'Union',
    name: 'Cheesesteak',
    price: 8
  },
  {
    location: 'Union',
    name: 'Beyond Meat Burger',
    price: 7.5
  },
  {
    location: 'Union',
    name: 'Blackbean Burger',
    price: 5
  },
  {
    location: 'Union',
    name: 'Chicken Tenders',
    price: 4.75
  },
  {
    location: 'Union',
    name: 'Mozzarella Sticks',
    price: 5.25
  },
  {
    location: 'Union',
    name: 'French Fries',
    price: 2
  },
  {
    location: 'Union',
    name: 'Bone In Chicken Wings',
    price: 13
  },
  {
    location: 'Union',
    name: 'Italian Stromboli',
    price: 7.25
  },
  {
    location: 'Union',
    name: 'CYO Sandwich',
    price: 10
  },
  {
    location: 'Union',
    name: 'Smoked Brisket Sandwich',
    price: 13
  },
  {
    location: 'Union',
    name: 'Chipotle Grilled Chicken',
    price: 12
  },
  {
    location: 'Union',
    name: 'Grilled Cheese',
    price: 11
  },
  {
    location: 'Union',
    name: 'Turkey BLT',
    price: 12.75
  },
  {
    location: 'Union',
    name: 'CYO GF Flatbread Pizza',
    price: 6
  },
  {
    location: 'Union',
    name: 'CYO Flatbread Pizza',
    price: 5
  },
  {
    location: 'Union',
    name: 'Pasta',
    price: 5
  },
  {
    location: 'Union',
    name: 'UCreate Box',
    price: 6
  },
  {
    location: 'Union',
    name: 'Cheese Pizza',
    price: 14
  },
  {
    location: 'Union',
    name: 'BBQ Chicken Pizza',
    price: 18
  },
  {
    location: 'Union',
    name: 'Meatlovers Pizza',
    price: 19
  },
  {
    location: 'Union',
    name: 'Veggie Supreme Pizza',
    price: 17
  },
  {
    location: 'Union',
    name: 'Hot Chocolate',
    price: 3.1
  },
  {
    location: 'Union',
    name: 'Ice Cream Cup',
    price: 3.75
  },
  {
    location: 'Union',
    name: 'Milkshake',
    price: 5.5
  },
  {
    location: 'Union',
    name: 'Hot Cappuccino',
    price: 3.95
  },
  {
    location: 'Union',
    name: 'Hot Caramel Macchiato',
    price: 4.6
  },
  {
    location: 'Union',
    name: 'Espresso',
    price: 1
  },
  {
    location: 'Union',
    name: 'Hot Americano',
    price: 3.1
  },
  {
    location: 'Union',
    name: 'Hot Latte',
    price: 4.6
  },
  {
    location: 'Union',
    name: 'UC 1 Shot Espresso',
    price: 1
  },
  {
    location: 'Union',
    name: 'Iced Americano',
    price: 3.25
  },
  {
    location: 'Union',
    name: 'Hot Mocha',
    price: 4.6
  },
  {
    location: 'Union',
    name: 'Hot Chai',
    price: 2
  },
  {
    location: 'Union',
    name: 'Hot Chi Latte',
    price: 4.6
  },
  {
    location: 'Union',
    name: 'Hot English Breakfast Tea',
    price: 2
  },
  {
    location: 'Union',
    name: 'Hot English Breakfast Tea Latte',
    price: 3.6
  },
  {
    location: 'Union',
    name: 'Hot Tea Bag',
    price: 2
  },
  {
    location: 'Union',
    name: 'Hot London Fog',
    price: 3.6
  },
  {
    location: 'Union',
    name: 'Hot Matcha Latte',
    price: 4.6
  },
  {
    location: 'Union',
    name: 'Iced London Fog',
    price: 3.25
  },
  {
    location: 'Union',
    name: 'Tea Refreshers',
    price: 3.5
  },
  {
    location: 'Union',
    name: 'Pina Colada',
    price: 5
  },
  {
    location: 'Union',
    name: 'CYO Smoothie',
    price: 5
  },
  {
    location: 'Union',
    name: 'Acai Bowl',
    price: 3.25
  },
  {
    location: 'Union',
    name: 'CYO Fruit Cup',
    price: 5
  },
  {
    location: 'Union',
    name: 'CYO Parfait',
    price: 4.5
  },
  {
    location: 'Falcon',
    name: 'Grain Bowl',
    price: 8
  },
  {
    location: 'Falcon',
    name: 'Noodle Bowl',
    price: 7.5
  },
  {
    location: 'Falcon',
    name: 'Green Bowl',
    price: 8.25
  },
  {
    location: 'Falcon',
    name: 'Flatbread',
    price: 8
  },
  {
    location: 'Falcon',
    name: 'Egg & Cheese Sandwich',
    price: 3
  },
  {
    location: 'Falcon',
    name: 'Bacon, Egg & Cheese Sandwich',
    price: 4
  },
  {
    location: 'Falcon',
    name: 'Sausage, Egg & Cheese Sandwich',
    price: 4
  },
  {
    location: 'Falcon',
    name: 'Ham, Egg & Cheese Sandwich',
    price: 4
  },
  {
    location: 'Falcon',
    name: 'Two Fried Eggs',
    price: 2.5
  },
  {
    location: 'Falcon',
    name: 'Two Fried Eggs with Bacon',
    price: 3.25
  },
  {
    location: 'Falcon',
    name: 'Two Fried Eggs with Sausage',
    price: 2.75
  },
  {
    location: 'Falcon',
    name: 'Hash Brown',
    price: 1.75
  },
  {
    location: 'Falcon',
    name: 'Fresh Brewed Coffee 12oz',
    price: 2.1
  },
  {
    location: 'Falcon',
    name: 'Fresh Brewed Coffee 16oz',
    price: 2.85
  },
  {
    location: 'Falcon',
    name: 'Mochas, Cappuccino, Latte, and Caramel Macchiato 12oz',
    price: 3.95
  },
  {
    location: 'Falcon',
    name: 'Mochas, Cappuccino, Latte, and Caramel Macchiato 16oz',
    price: 4.6
  },
  {
    location: 'Falcon',
    name: 'Americano 12oz',
    price: 2.5
  },
  {
    location: 'Falcon',
    name: 'Americano 16oz',
    price: 3.1
  },
  {
    location: 'Falcon',
    name: 'Chai Latte 12oz',
    price: 3.95
  },
  {
    location: 'Falcon',
    name: 'Chai Latte 16oz',
    price: 4.6
  },
  {
    location: 'Falcon',
    name: 'Hot Chocolate 12oz',
    price: 2.5
  },
  {
    location: 'Falcon',
    name: 'Hot Chocolate 16oz',
    price: 3.1
  },
  {
    location: 'Falcon',
    name: 'Iced Drink 16oz',
    price: 4.6
  },
  {
    location: 'Falcon',
    name: 'Iced Drink 24oz',
    price: 5.6
  },
  {
    location: 'Falcon',
    name: 'Hot Tea 12oz or 16oz',
    price: 1.6
  },
  {
    location: 'Falcon',
    name: 'London Fog 12oz',
    price: 2.5
  },
  {
    location: 'Falcon',
    name: 'London Fog 16oz',
    price: 3.1
  },
  {
    location: 'Vending',
    name: 'Soda/Water',
    price: 2.25
  },
  {
    location: 'Vending',
    name: 'Candy bar',
    price: 2
  }
].map((m) => ({ ...m, id: generateId(m.location, m.name) }));

/**
 * An array of all meal locations in the database.
 */
export const mealLocations = [...new Set(meals.map((m) => m.location))];

export default meals;
