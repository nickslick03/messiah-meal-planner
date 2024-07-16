import { WEEKDAYS } from '../../static/constants';
import Button from '../form_elements/Button';
import { useReducer, useContext, useMemo, useState } from 'react';
import { MealQueueCtx, UserSelectedMealsCtx } from '../../static/context';
import MealContainer from '../containers/MealContainer';
import Meal from '../../types/Meal';
import {
  UserSelectedMealsObjectType,
  Weekday
} from '../../types/userSelectedMealsObject';
import { v4 as uuid } from 'uuid';
import Notification from '../other/Notification';
import meals, { locationClosures } from '../../static/mealsDatabase';
import { CustomMealsCtx } from '../../static/context';
import DaySelector from '../form_elements/DaySelector';
import mapUserMeals from '../../lib/mapUserMeals';
import dereferenceMeal from '../../lib/dereferenceMeal';
import tooltip from '../../static/tooltip';

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
        .map((mr) => dereferenceMeal(mr, meals, customMeals.value))
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
      mapUserMeals((day: Weekday, index: number) =>
        selectedDays.includes(index)
          ? [
              day,
              userSelectedMeals.value[day].concat(
                mealQueue.value.map((m) => ({ ...m, instanceId: uuid() }))
              )
            ]
          : [day, userSelectedMeals.value[day]]
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

  /** List of locations where a day is selected with a meal that comes from a closed location. */
  const offendedLocations = useMemo(() => {
    const userLocations = new Set(mealQueueValue.map((m) => m.location));
    return (
      Object.getOwnPropertyNames(
        locationClosures
      ) as (keyof typeof locationClosures)[]
    ).filter(
      (location) =>
        userLocations.has(location) &&
        locationClosures[location].some((n) => selectedDays.includes(n))
    );
  }, [mealQueueValue, selectedDays]);

  /** Indicates whether the add meal button is disabled. */
  const isAddMealsButtonDisabled = useMemo(
    () =>
      mealQueue.value.length == 0 ||
      selectedDays.length == 0 ||
      offendedLocations.length > 0,
    [mealQueue.value.length, offendedLocations.length, selectedDays.length]
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
      searchable={false}
      tooltip={tooltip.mealQueue}
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
          square={true}
          slideHighlight={false}
        />
      </div>
      {offendedLocations.map((location, i) => (
        <p className={`text-messiah-red text-sm mt-2`} key={i}>
          {`${location} is closed on days ${locationClosures[location]
            .map((n) => WEEKDAYS[n])
            .join(', ')}`}
        </p>
      ))}
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
