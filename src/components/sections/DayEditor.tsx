import { useContext, useMemo, useState } from 'react';
import { WEEKDAYS } from '../../static/constants';
import DotLeader from '../other/DotLeader';
import {
  EndDateCtx,
  MealPlanCtx,
  StartDateCtx,
  UserSelectedMealsCtx,
  WeeksOffCtx
} from '../../static/context';
import Divider from '../other/Divider';
import MealContainer from '../containers/MealContainer';
import Meal from '../../types/Meal';
import meals from '../../static/mealsDatabase';
import { CustomMealsCtx } from '../../static/context';
import { getWeekdaysBetween } from '../../lib/dateCalcuation';
import { getMealDayTotal } from '../../lib/calculationEngine';
import formatCurrency from '../../lib/formatCurrency';
import DaySelector from '../form_elements/DaySelector';
import { Weekday } from '../../types/userSelectedMealsObject';
import mapUserMeals from '../../lib/mapUserMeals';
import dereferenceMeal from '../../lib/dereferenceMeal';
import tutorial from '../../static/tutorial';

/**
 * Renders a meal table for meals added to given days an an option to remove meals from that day.
 * Also includes a results summary.
 *
 * @return {JSX.Element} The rendered DayEditor component.
 */
const DayEditor = () => {
  // Load all necessary contexts
  const userSelectedMeals = useContext(UserSelectedMealsCtx);
  const customMeals = useContext(CustomMealsCtx);
  const weeksOff = useContext(WeeksOffCtx);

  // Dereference the userSelectedMeals context
  const userSelectedMealsValue = useMemo(
    () =>
      mapUserMeals(
        (day: Weekday) =>
          [
            day,
            userSelectedMeals.value[day]
              .map((mr) => dereferenceMeal(mr, meals, customMeals.value))
              .filter((m) => m !== undefined)
          ] as [string, Meal[]]
      ),
    [userSelectedMeals, customMeals]
  );

  // State variable to track which day the user is editing
  const [weekdayIndex, setWeekdayIndex] = useState(0);

  // Get the day of the week the user is editing
  const weekday = useMemo(() => WEEKDAYS[weekdayIndex], [weekdayIndex]);

  // Get the list of selected meals for the given day
  const dayMealList = useMemo(
    () => (userSelectedMealsValue[WEEKDAYS[weekdayIndex]] as Meal[]) ?? [],
    [userSelectedMealsValue, weekdayIndex]
  );

  const startDate = useContext(StartDateCtx);
  const endDate = useContext(EndDateCtx);
  const discount = useContext(MealPlanCtx);

  const mealDayTotal = useMemo(
    () => getMealDayTotal(dayMealList, 1, discount.value ?? false),
    [dayMealList, discount.value]
  );

  /** The total number of days for each weekday (starting on Sunday) */
  const numOfWeekdays = useMemo(
    () =>
      startDate.value !== null && endDate.value !== null
        ? getWeekdaysBetween(
            startDate.value,
            endDate.value,
            weeksOff.value ?? 0
          )
        : Array(7).fill(0),
    [startDate, endDate, weeksOff]
  );

  /** The total number of meals for each weekday (starting on Sunday). */
  const numOfMeals = useMemo(
    () => WEEKDAYS.map((day) => userSelectedMealsValue[day].length),
    [userSelectedMealsValue]
  );

  /**
   * Removes a meal from the currently selected day.
   * @param meal - The meal to be removed
   */
  const removeMeal = (meal: Meal) => {
    userSelectedMeals.setValue({
      ...userSelectedMeals.value,
      [WEEKDAYS[weekdayIndex]]: userSelectedMeals.value[
        WEEKDAYS[weekdayIndex]
      ].filter((m) => m.instanceId !== meal.instanceId)
    });
  };

  return (
    <MealContainer
      title='Day Editor'
      daySelector={
        <div className='w-full bg-gray-300 rounded-lg mt-4'>
          <DaySelector
            daysSelected={new Array(7)
              .fill(false)
              .map((_, day) => day === weekdayIndex)}
            onChange={setWeekdayIndex}
            numOfMeals={numOfMeals}
            slideHighlight
          />
        </div>
      }
      addOrRemove='Del'
      meals={dayMealList}
      buttonOnClick={removeMeal}
      createNotification={(name) => `Removed ${name} from ${weekday}`}
      searchable={false}
      tutorial={tutorial.dayEditor}
    >
      <Divider />
      <DotLeader
        info={[
          {
            title: `Total for One ${weekday}`,
            value: `${formatCurrency(mealDayTotal)}`,
            resultsStyle: 'text-messiah-red'
          },
          {
            title: `Number of ${weekday}(s)`,
            value: `${numOfWeekdays[weekdayIndex]}`
          },
          {
            title: `Total of All ${weekday}s`,
            value: `${formatCurrency(
              mealDayTotal * numOfWeekdays[weekdayIndex] // Convert from Monday to Sunday start
            )}`,
            resultsStyle: 'text-messiah-red'
          }
        ]}
      />
    </MealContainer>
  );
};

export default DayEditor;
