/**
 * An interface representing a reference to a meal.
 */
interface MealReference {
  /**
   * The unique identifier for the meal.
   */
  id: string;

  /**
   * The unique identifier for a specific instance of the meal within a day.
   */
  instanceId: string;
}

export default MealReference;
