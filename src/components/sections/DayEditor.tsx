import { useContext, useMemo, useState } from 'react';
import { WEEKDAYS } from '../../static/constants';
import Select from '../form_elements/Select';
import { newImportanceIndex } from '../../types/ImportanceIndex';
import DotLeader from '../other/DotLeader';
import { EndDateCtx, IsBreakCtx, StartDateCtx, UserSelectedMealsCtx } from '../../static/context';
import Divider from '../other/Divider';
import MealContainer from '../containers/MealContainer';
import Meal from '../../types/Meal';
import meals from '../../static/mealsDatabase';
import { CustomMealsCtx } from '../../static/context';
import { getWeekdaysBetween } from '../../lib/dateFormatter';
import { strToDate } from '../../lib/dateFormatter';

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

  // The total number of weekdays
  const totalWeekdays = useMemo(() => 
    getWeekdaysBetween(strToDate(startDate.value), strToDate(endDate.value), weekOff.value),
    [startDate, endDate, weekOff]);

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
        <div>
          <Select
            label=''
            importance={newImportanceIndex(4)}
            list={WEEKDAYS}
            value={WEEKDAYS[weekdayIndex]}
            setSelected={(newWeekday) =>
              setWeekdayIndex(
                WEEKDAYS.indexOf(newWeekday as (typeof WEEKDAYS)[number])
              )
            }
            isTitle={true}
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
            value: '$100.00',
            resultsStyle: 'text-messiah-red'
          },
          {
            title: `Number of ${weekday}(s)`,
            value: `${totalWeekdays[(weekdayIndex + 1) % 7]}`
          },
          {
            title: `Total of All ${weekday}s`,
            value: '$1000.00',
            resultsStyle: 'text-messiah-red'
          }
        ]}
      />
    </MealContainer>
  );
};

export default DayEditor;
