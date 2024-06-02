import { useContext, useMemo, useState } from 'react';
import { WEEKDAYS } from '../../static/constants';
import Select from '../form_elements/Select';
import { newImportanceIndex } from '../../types/ImportanceIndex';
import DotLeader from '../other/DotLeader';
import { UserSelectedMealsCtx } from '../../static/context';
import Divider from '../other/Divider';
import MealContainer from '../containers/MealContainer';
import Meal from '../../types/Meal';

/**
 * Renders a meal table for meals added to given days an an option to remove meals from that day.
 * Also includes a results summary.
 *
 * @return {JSX.Element} The rendered DayEditor component.
 */
const DayEditor = () => {
  // Load context of meals the user has selected
  const userSelectedMeals = useContext(UserSelectedMealsCtx);

  // State variable to track which day the user is editing
  const [weekdayIndex, setWeekdayIndex] = useState(0);

  // Get the day of the week the user is editing
  const weekday = useMemo(() => WEEKDAYS[weekdayIndex], [weekdayIndex]);

  // Get the list of selected meals for the given day
  const dayMealList = useMemo(
    () => userSelectedMeals.value[WEEKDAYS[weekdayIndex]] ?? [],
    [userSelectedMeals, weekdayIndex]
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
      ].filter((m) => m !== meal)
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
      createNotification={(name) => `Removed ${name} from ${weekday}`}>
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
            value: '10'
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
