import meals from '../../static/mealsDatabase';
import Meal from '../../types/Meal';
import MealContainer from '../containers/MealContainer';
import CustomMeal from '../other/CustomMeal';
import { CustomMealsCtx, MealQueueCtx } from '../../static/context';
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';

/**
 * Renders the Available Meals section with a table of meals to add and a button
 * to add a custom meal. Displays the add custommeal modal when the button is clicked.
 *
 * @return {JSX.Element} The Available Meals section component.
 */
const AvailableMeals = () => {
  // Load all necessary contexts
  const mealQueue = useContext(MealQueueCtx);
  const customMeals = useContext(CustomMealsCtx);

  /**
   * Adds a meal to the queue.
   *
   * @param {Meal} meal - The meal to be added to the queue.
   */
  const addToQueue = (meal: Meal) => {
    mealQueue.setValue([...mealQueue.value, { id: uuid(), ...meal }]);
  };

  return (
    <MealContainer
      title='Available Meals'
      addOrRemove='Add'
      meals={[...meals, ...customMeals.value]}
      buttonOnClick={addToQueue}
      includeCustomEditor={true}
    >
      <CustomMeal />
    </MealContainer>
  );
};

export default AvailableMeals;
