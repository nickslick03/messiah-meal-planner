import { WEEKDAYS } from '../../static/constants';
import Button from '../form_elements/Button';
import { useReducer, useContext, useMemo, useState } from 'react';
import { MealQueueCtx, UserSelectedMealsCtx } from '../../static/context';
import MealContainer from '../containers/MealContainer';
import Meal from '../../types/Meal';
import { UserSelectedMealsObjectType } from '../../types/userSelectedMealsObject';
import { v4 as uuid } from 'uuid';
import Notification from '../other/Notification';
import meals from '../../static/mealsDatabase';
import { CustomMealsCtx } from '../../static/context';
import DaySelector from '../form_elements/DaySelector';

/**
 * Renders the Meal Queue section, where meals in the queue can be added to different days of the week.
 */
const MealQueue = () => {
  // Load all necessary contexts
  const mealQueue = useContext(MealQueueCtx);
  const userSelectedMeals = useContext(UserSelectedMealsCtx);
  const customMeals = useContext(CustomMealsCtx);

  // notification text
  const [message, setMessage] = useState({ text: '' });

  /** Dereferences the meal queue. */
  const mealQueueValue = useMemo(
    () =>
      mealQueue.value
        .map(
          (mr) =>
            ({
              // Load meal data
              ...[...meals, ...customMeals.value].find((m) => m.id === mr.id),

              // Assign instanceId
              instanceId: mr.instanceId
            } as Meal)
        )
        .filter((m) => m !== undefined) as Meal[],
    [mealQueue, customMeals]
  );

  /**
   * Removes a meal from the meal queue.
   *
   * @param {Meal} meal - The meal to be removed from the queue.
   */
  const removeMealFromQueue = (meal: Meal) => {
    mealQueue.setValue(
      mealQueue.value.filter((m) => m.instanceId !== meal.instanceId)
    );
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
                    mealQueue.value.map((m) => ({ ...m, instanceId: uuid() }))
                  )
                ]
              : [key, value]
        )
      ) as UserSelectedMealsObjectType
    );
    const numOfMeals = mealQueue.value.length;
    const weekdaysStr = selectedDays
      .map(
        (day, i) =>
          WEEKDAYS[day] +
          (i === selectedDays.length - 1
            ? ''
            : i === selectedDays.length - 2
            ? ' and '
            : ', ')
      )
      .join('');
    setMessage({
      text: `Added ${numOfMeals} meal${
        numOfMeals > 1 ? 's' : ''
      } to ${weekdaysStr}`
    });
    selectedDaysDispatch({ index: 0, type: 'clear' });
  };

  /**
   * Clears the meal queue.
   */
  const clearMealQueue = () => {
    mealQueue.setValue([]);
    setMessage({ text: 'Cleared meal queue' });
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

  /** Indicates whether the add meal button is disabled. */
  const isAddMealsButtonDisabled = useMemo(
    () => mealQueue.value.length == 0 || selectedDays.length == 0,
    [mealQueue, selectedDays]
  );
  /** Indicates whether the clear meal button is disabled. */
  const isClearMealsButtonDisabled = useMemo(
    () => mealQueue.value.length == 0,
    [mealQueue]
  );

  return (
    <MealContainer
      title='Meal Queue'
      meals={mealQueueValue}
      addOrRemove='Del'
      buttonOnClick={removeMealFromQueue}
      createNotification={(name) => `Removed ${name} from meal queue`}
    >
      <div className='mb-4' />
      <p className='mb-2'>Add these meals to:</p>
      <div className='flex justify-center flex-wrap gap-6 w-full'>
        <DaySelector
          daysSelected={new Array(7)
            .fill(false)
            .map((_v, i) => selectedDays.indexOf(i) !== -1)}
          onChange={(i) =>
            selectedDaysDispatch({
              index: i,
              type: selectedDays.indexOf(i) === -1 ? 'add' : 'remove'
            })
          }
          maxWidth={12}
        />
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
      <Notification message={message} />
    </MealContainer>
  );
};

export default MealQueue;
