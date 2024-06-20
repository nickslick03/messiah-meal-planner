import { useContext, useMemo } from 'react';
import SectionContainer from '../containers/SectionContainer';
import DotLeader from '../other/DotLeader';
import { BalanceCtx, MealPlanCtx, UserSelectedMealsCtx, CustomMealsCtx } from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';
import { getMealTotal } from '../../lib/calculationEngine';
import meals, { mealLocations } from '../../static/mealsDatabase';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import dereferenceMeal from '../../lib/dereferenceMeal';
import mapUserMeals from '../../lib/mapUserMeals';
import { Weekday } from '../../types/userSelectedMealsObject';
import Meal from '../../types/Meal';
import { WEEKDAYS } from '../../static/constants';

interface ResultsProps {
  isUnderBalance: boolean;
  difference: number;
}

const options = {
  responsive: true, // Ensure the chart is responsive
  maintainAspectRatio: false, // Allow the chart to take up the entire container's size
};

/**
 * Renders the results of the meal planning.
 */
const Results = ({
  isUnderBalance,
  difference
}: ResultsProps) => {
  // const balance = useContext(BalanceCtx);
  // const userMeals = useContext(UserSelectedMealsCtx);
  // const isDiscount = useContext(MealPlanCtx);

  const customMeals = useContext(CustomMealsCtx);
  const userSelectedMeals = useContext(UserSelectedMealsCtx);

  // /** The meal total for one week. */
  // const weekTotal = useMemo(() => 
  //   getMealTotal(
  //     userMeals.value, 
  //     Array<number>(7).fill(1),
  //     isDiscount.value,
  //     [...meals, ...customMeals.value]),
  //   [customMeals.value, isDiscount.value, userMeals.value]);
  
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
  ) as { [k: string]: Meal[] };

  const allMeals = useMemo(() => {
    let arr: Meal[] = [];
    for (let i = 0; i < 7; i++) {
      arr = arr.concat(userSelectedMealsValue[WEEKDAYS[i]]);
    }
    return arr;
  }, [userSelectedMealsValue]);

  const mealsByLocationData = useMemo(() => {
    const arr: number[] = Array<number>(mealLocations.length).fill(0);
    allMeals.forEach((meal) => {
      arr[mealLocations.indexOf(meal.location)] += 1;
    });
    return arr;
  }, [allMeals]);


  const mealsByLocationChartData = useMemo(() => ({
    labels: mealLocations,
    datasets: [{
      label: 'Meals by Location',
      data: mealsByLocationData,
      backgroundColor: ['red', 'green', 'blue', 'orange'],
      hoverOffset: 4,
    }]
  }), [mealsByLocationData]);

  return (
    <SectionContainer title='Results'>

    <div className='mt-4'>
      <h2 className='font-bold text-center'>By Location</h2>
      <div className='w-full'>
        <Pie data={mealsByLocationChartData} options={options}/>
      </div>
    </div>

      <div
        className={`${
          isUnderBalance ? 'text-messiah-green' : 'text-messiah-red'
        } text-xl font-bold mt-4 text-center`}
      >
        {isUnderBalance
          ? `You have an extra ${formatCurrency(difference)}!`
          : `You have overplanned by ${formatCurrency(difference)}.`}
      </div>
    </SectionContainer>
  );
};

export default Results;
