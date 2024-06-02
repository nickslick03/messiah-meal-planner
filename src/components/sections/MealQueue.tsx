import { WEEKDAY_ABBREVIATIONS } from '../../static/constants';
import Input from '../form_elements/Input';
import Button from '../form_elements/Button';
import { useReducer, useContext, useMemo } from 'react';
import { MealQueueCtx, UserSelectedMealsCtx } from '../../static/context';
import MealContainer from '../containers/MealContainer';
import Meal from '../../types/Meal';
import { UserSelectedMealsObjectType } from '../../types/userSelectedMealsObject';
import { v4 as uuid } from 'uuid';

/**
 * Renders the Meal Queue section, where meals in the queue can be added to different days of the week.
 */
const MealQueue = () => {
  // Load all necessary contexts
  const mealQueue = useContext(MealQueueCtx);
  const userSelectedMeals = useContext(UserSelectedMealsCtx);

  /**
   * Removes a meal from the meal queue.
   *
   * @param {Meal} meal - The meal to be removed from the queue.
   */
  const removeMealFromQueue = (meal: Meal) => {
    mealQueue.setValue(mealQueue.value.filter((m) => m !== meal));
  };

  /**
   * Updates the userSelectedMeals context with the meals from the mealQueue for the selected days
   * and resets the mealQueue.
   */
  const onAddMeals = () => {
    userSelectedMeals.setValue(
      Object.fromEntries(
        Object.entries(userSelectedMeals.value).map(
          ([key, value], index: number) =>
            selectedDays.includes(index)
              ? [
                  key,
                  value.concat(
                    mealQueue.value.map((m) => ({ ...m, id: uuid() }))
                  )
                ]
              : [key, value]
        )
      ) as UserSelectedMealsObjectType
    );

    selectedDaysDispatch({ index: 0, type: 'clear' });
  };

  /**
   * Clears the meal queue.
   */
  const clearMealQueue = () => {
    mealQueue.setValue([]);
  };

  // State variable to track which days the user has selected
  const [selectedDays, selectedDaysDispatch] = useReducer(
    (
      state: number[],
      action: { index: number; type: 'add' | 'remove' | 'clear' }
    ) => {
      switch (action.type) {
        case 'add':
          return state.concat(action.index);
        case 'remove':
          return state.filter((num) => num !== action.index);
        case 'clear':
          return [];
        default:
          throw new Error(`Action type ${action.type} invalid`);
      }
    },
    []
  );

  // Memos to control whether buttons can be clicked
  const isAddMealsButtonDisabled = useMemo(
    () => mealQueue.value.length == 0 || selectedDays.length == 0,
    [mealQueue, selectedDays]
  );
  const isClearMealsButtonDisabled = useMemo(
    () => mealQueue.value.length == 0,
    [mealQueue]
  );

  return (
    <MealContainer
      title='Meal Queue'
      meals={mealQueue.value}
      addOrRemove='Del'
      buttonOnClick={removeMealFromQueue}
    >
      <div className='mb-4' />
      <div className='flex justify-center flex-wrap gap-6'>
        {WEEKDAY_ABBREVIATIONS.map((day, i) => (
          <Input
            label={`${day}.`}
            type='checkbox'
            value={selectedDays.indexOf(i) !== -1}
            setValue={(day) =>
              selectedDaysDispatch({
                index: i,
                type: day ? 'add' : 'remove'
              })
            }
            key={day}
          />
        ))}
      </div>
      <div className='flex gap-2 mt-4'>
        <Button
          title='Add Meals to Selected Days'
          onClick={onAddMeals}
          disabled={isAddMealsButtonDisabled}
        />
        <Button
          title='Clear Meal Queue'
          onClick={clearMealQueue}
          disabled={isClearMealsButtonDisabled}
        />
      </div>
    </MealContainer>
  );
};

export default MealQueue;
