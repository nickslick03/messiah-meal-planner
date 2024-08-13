/**
 * An interface representing a meal.
 */
interface Meal {
  /**
   * The unique identifier for the meal.
   */
  id?: string;

  /**
   * The unique identifier for the instance of the meal.
   */
  instanceId?: string;

  /**
   * Indicates whether the meal is a custom meal.
   */
  isCustom?: boolean;

  /**
   * The location where the meal is served.
   */
  location: string;

  /**
   * The name of the meal.
   */
  name: string;

  /**
   * The price of the meal.
   */
  price: number;

  /**
   * An array of weekday indices denoting when the meal is unavailable.
   */
  unavailable?: number[];
}

export default Meal;
