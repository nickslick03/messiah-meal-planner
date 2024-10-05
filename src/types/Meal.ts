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
   * Whether or not the meal is legacy.
   */
  legacy?: boolean;

  /**
   * An array of weekday indices denoting when the meal is unavailable.
   */
  unavailable?: number[];
}

/**
 * A type guard for the Meal type.
 *
 * @param m The object to check.
 * @returns true if the object is a Meal, false otherwise.
 */
export const isMeal = (m: unknown): m is Meal => {
  return (
    typeof m === 'object' &&
    m !== null &&
    'location' in m &&
    'name' in m &&
    'price' in m
  );
};

export default Meal;
