import meals from '../../static/mealsDatabase';
import Meal from '../../types/Meal';
import MealContainer from '../containers/MealContainer';
import CustomMeal from '../other/CustomMeal';
import { CustomMealsCtx, MealQueueCtx } from '../../static/context';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import CustomMealAddModal from '../modals/CustomMealAddModal';
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

  // State variable to determine whether or not the custom meal modal should be open
  const [isEditingCustomMeal, setIsEditingCustomMeal] = useState(false);

  // State variable to track the current custom meal editing data
  const [currentCustomData, setCurrentCustomData] = useState<Meal>();

  /**
   * Updates a custom meal in the customMeals context with the provided location, name, and price.
   *
   * @param {string} location - The new location for the custom meal.
   * @param {string} name - The new name for the custom meal.
   * @param {number} price - The new price for the custom meal.
   * @return {void} This function does not return anything.
   */
  const onUpdateCustomMeal = (
    location: string,
    name: string,
    price: number
  ) => {
    customMeals.setValue(
      customMeals.value.map((val) =>
        val.id === currentCustomData?.id
          ? { ...val, location, name, price }
          : val
      )
    );
    setIsEditingCustomMeal(false);
  };

  useEffect(() => {
    if (!currentCustomData) return;
    setIsEditingCustomMeal(true);
  }, [currentCustomData]);

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
      createNotification={(name) => `Added ${name} to meal queue`}
      onCustomClick={(data: Meal) => {
        // If the custom data isn't changed, useEffect won't be triggered, but we don't have any new state
        // so all we need to do is show the modal
        if (currentCustomData === data) setIsEditingCustomMeal(true);
        else setCurrentCustomData(data);
      }}
    >
      {
        // This cannot work with only the 'visible' property because otherwise it will not re-render
        // when we change its data
        isEditingCustomMeal ? (
          <CustomMealAddModal
            startingData={currentCustomData}
            onConfirm={onUpdateCustomMeal}
            onCancel={() => {
              setIsEditingCustomMeal(false);
            }}
            onDelete={() => {
              customMeals.setValue(
                customMeals.value.filter(
                  (val) => val.id !== currentCustomData?.id
                )
              );
              setIsEditingCustomMeal(false);
            }}
            visible={isEditingCustomMeal}
          />
        ) : (
          <></>
        )
      }
      <CustomMeal />
    </MealContainer>
  );
};

export default AvailableMeals;
