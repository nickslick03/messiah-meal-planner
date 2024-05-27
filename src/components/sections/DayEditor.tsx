import { useContext, useMemo, useState } from 'react';
import { FILLER_MEALS, WEEKDAYS } from '../../static/constants';
import Select from '../form_elements/Select';
import { newImportanceIndex } from '../../types/ImportanceIndex';
import DotLeader from '../other/DotLeader';
import { UserSelectedMealsCtx } from '../../static/context';
import Divider from '../other/Divider';
import MealContainer from '../containers/MealContainer';

/**
 * Renders a meal table for meals added to given days an an option to remove meals from that day.
 * Also includes a results summary.
 *
 * @return {JSX.Element} The rendered DayEditor component.
 */
const DayEditor = () => {
  // Load context of meals the user has selected
  const UserSelectedMeals = useContext(UserSelectedMealsCtx);

  // State variable to track which day the user is editing
  const [weekdayIndex, setWeekdayIndex] = useState(0);

  // Get the day of the week the user is editing
  const weekday = useMemo(() => WEEKDAYS[weekdayIndex], [weekdayIndex]);

  // Get the list of selected meals for the given day
  const dayMealList = useMemo(
    () => UserSelectedMeals.value[weekdayIndex],
    [UserSelectedMeals, weekdayIndex]
  );

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
      meals={FILLER_MEALS}
      buttonOnClick={(meal) =>
        console.log(`removed ${meal.name} from ${weekday}`)
      }
    >
      <Divider />
      <DotLeader
        info={[
          {
            title: 'Weekly Total',
            value: '$100.00'
          },
          {
            title: `Number of ${weekday}(s)`,
            value: '10'
          },
          {
            title: 'Grand Total',
            value: '$1000.00'
          }
        ]}
      />
    </MealContainer>
  );
};

export default DayEditor;
