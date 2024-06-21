import { useContext, useMemo } from 'react';
import SectionContainer from '../containers/SectionContainer';
import DotLeader from '../other/DotLeader';
import {
  BalanceCtx,
  MealPlanCtx,
  UserSelectedMealsCtx,
  CustomMealsCtx
} from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';
import { getMealTotal } from '../../lib/calculationEngine';
import meals, { mealLocations } from '../../static/mealsDatabase';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { WEEKDAYS } from '../../static/constants';
import { userMealsToStackedChart } from '../../lib/mealChartFormat';
import Divider from '../other/Divider';

interface ResultsProps {
  isUnderBalance: boolean;
  difference: number;
  grandTotal: number;
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Meals by Weekday'
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      beginAtZero: true,
      stacked: true,
      ticks: {
        callback: function (tickValue: string | number) {
          const value =
            typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
          return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          });
        }
      }
    }
  }
};

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Meals by Weekly Price'
    }
  }
};

const backgroundColor = [
  'rgba(54, 162, 235, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(255, 99, 132, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)'
];

const borderColor = [
  'rgb(54, 162, 235)',
  'rgb(75, 192, 192)',
  'rgb(255, 205, 86)',
  'rgb(255, 99, 132)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
];

/**
 * Renders the results of the meal planning.
 */
const Results = ({ isUnderBalance, difference, grandTotal }: ResultsProps) => {
  // Load all necessary contexts
  const balance = useContext(BalanceCtx);
  const userMeals = useContext(UserSelectedMealsCtx);
  const isDiscount = useContext(MealPlanCtx);
  const customMeals = useContext(CustomMealsCtx);
  const userSelectedMeals = useContext(UserSelectedMealsCtx);

  /** The meal total for one week. */
  const weekTotal = useMemo(
    () =>
      getMealTotal(
        userMeals.value,
        Array<number>(7).fill(1),
        isDiscount.value || false,
        [...meals, ...customMeals.value]
      ),
    [customMeals.value, isDiscount.value, userMeals.value]
  );

  /** The data for the bar chart, splits up weekly meal prices by location. */
  const barChartData = useMemo(() => {
    const locationMap = userMealsToStackedChart(userSelectedMeals.value);
    return {
      labels: [...WEEKDAYS],
      datasets: mealLocations.map((location, i) => ({
        label: location,
        data: locationMap.get(location) ?? [],
        backgroundColor: backgroundColor[i],
        borderColor: borderColor[i],
        borderWidth: 1
      }))
    };
  }, [userSelectedMeals.value]);

  /** The data for the pie chart, splits up weekly meal prices by location. */
  const pieChartData = useMemo(() => {
    const locationMap = userMealsToStackedChart(userSelectedMeals.value);
    const priceMap: number[] = [];
    locationMap.forEach((prices) =>
      priceMap.push(prices.reduce((p, c) => p + c))
    );
    return {
      labels: mealLocations,
      datasets: [
        {
          data: priceMap,
          backgroundColor: borderColor,
          hoverOffset: 4
        }
      ]
    };
  }, [userSelectedMeals.value]);

  return (
    <SectionContainer title='Results'>
      <div className='flex flex-row flex-wrap w-full justify-center'>
        <div className='flex flex-col items-center my-4 flex-1'>
          <div className='relative my-4 w-full min-h-[250px] sm:min-h-[300px]'>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        <div className='flex flex-col items-center my-4 flex-1'>
          <div className='relative w-full min-h-[250px] sm:min-h-[300px]'>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
      <Divider />
      <DotLeader
        info={[
          {
            title: 'Starting Balance',
            value: formatCurrency(balance.value || 0),
            resultsStyle: 'text-messiah-green'
          },
          {
            title: 'Weekly Total',
            value: `${formatCurrency(weekTotal)}`,
            resultsStyle: 'text-messiah-red'
          },
          {
            title: 'Grand Total',
            value: `${formatCurrency(grandTotal)}`,
            resultsStyle: 'text-messiah-red'
          }
        ]}
      />
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
