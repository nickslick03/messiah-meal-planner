import { useContext, useMemo, useState } from 'react';
import { WEEKDAYS } from '../../static/constants';
import DotLeader from '../other/DotLeader';
import {
  EndDateCtx,
  IsBreakCtx,
  MealPlanCtx,
  StartDateCtx,
  UserSelectedMealsCtx
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

  // Dereference the userSelectedMeals context
  const userSelectedMealsValue = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(userSelectedMeals.value).map(
          ([key, value]) =>
            [
              key,
              value
                .map(
                  (mr) =>
                    ({
                      // Load meal data
                      ...[...meals, ...customMeals.value].find(
                        (m) => m.id === mr.id
                      ),

                      // Assign the instance id
                      instanceId: mr.instanceId
                    } as Meal)
                )
                .filter((m) => m !== undefined)
            ] as [string, Meal[]]
        )
      ),
    [userSelectedMeals, customMeals]
  );

  // State variable to track which day the user is editing
  const [weekdayIndex, setWeekdayIndex] = useState(0);

  // Get the day of the week the user is editing
  const weekday = useMemo(() => WEEKDAYS[weekdayIndex], [weekdayIndex]);

  // Get the list of selected meals for the given day
  const dayMealList = useMemo(
    () => userSelectedMealsValue[WEEKDAYS[weekdayIndex]] ?? [],
    [userSelectedMealsValue, weekdayIndex]
  );

  const startDate = useContext(StartDateCtx);
  const endDate = useContext(EndDateCtx);
  const weekOff = useContext(IsBreakCtx);
  const discount = useContext(MealPlanCtx);

  const mealDayTotal = useMemo(
    () => getMealDayTotal(dayMealList, 1, discount.value),
    [dayMealList, discount.value]
  );

  // The total number of days for each weekday (starting on Sunday)
  const numOfWeekdays = useMemo(
    () =>
      startDate.value !== null && endDate.value !== null
        ? getWeekdaysBetween(startDate.value, endDate.value, weekOff.value)
        : Array(7).fill(0),
    [startDate, endDate, weekOff]
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
      title={
        <div className='w-full'>
          <DaySelector
            daysSelected={new Array(7)
              .fill(false)
              .map((_, day) => day === weekdayIndex)}
            onChange={setWeekdayIndex}
          />
        </div>
      }
      addOrRemove='Del'
      meals={dayMealList}
      buttonOnClick={removeMeal}
      createNotification={(name) => `Removed ${name} from ${weekday}`}
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
            value: `${numOfWeekdays[(weekdayIndex + 1) % 7]}` // Convert from Monday to Sunday start
          },
          {
            title: `Total of All ${weekday}s`,
            value: `${formatCurrency(
              mealDayTotal * numOfWeekdays[(weekdayIndex + 1) % 7] // Convert from Monday to Sunday start
            )}`,
            resultsStyle: 'text-messiah-red'
          }
        ]}
      />
    </MealContainer>
  );
};

export default DayEditor;
