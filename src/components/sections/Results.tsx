import { useContext, useEffect, useMemo } from 'react';
import SectionContainer from '../containers/SectionContainer';
import DotLeader from '../other/DotLeader';
import {
  BalanceCtx,
  MealPlanCtx,
  UserSelectedMealsCtx,
  CustomMealsCtx,
  WeeksOffCtx,
  TutorialElementsCtx,
  ColorPreferenceCtx
} from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';
import { getMealTotal } from '../../lib/calculationEngine';
import meals, { mealLocations } from '../../static/mealsDatabase';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { WEEKDAYS } from '../../static/constants';
import { userMealsToStackedChart } from '../../lib/mealChartFormat';
import Divider from '../other/Divider';
import { TooltipItem } from 'chart.js/auto';
import tooltip from '../../static/tooltip';
import { Chart as ChartJS } from 'chart.js';

interface ResultsProps {
  /**
   * Indicates whether the user is under their balance.
   */
  isUnderBalance: boolean;

  /**
   * The difference between the balance and the grand total.
   */
  difference: number;

  /**
   * The grand total of the meal plan.
   */
  grandTotal: number;

  /**
   * The date when the user will run out of funds, or null if they won't.
   */
  dayWhenRunOut: Date | null;

  /**
   * The order of this component relative to others.
   */
  order: number;
}

/**
 * The background color for charts.
 */
const backgroundColor = [
  'rgba(54, 162, 235, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(255, 99, 132, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)'
];

/**
 * The border color for charts.
 */
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
const Results = ({
  isUnderBalance,
  difference,
  grandTotal,
  dayWhenRunOut,
  order
}: ResultsProps) => {
  const balance = useContext(BalanceCtx);
  const weeksOff = useContext(WeeksOffCtx);
  const userMeals = useContext(UserSelectedMealsCtx);
  const isDiscount = useContext(MealPlanCtx);
  const customMeals = useContext(CustomMealsCtx);
  const userSelectedMeals = useContext(UserSelectedMealsCtx);
  const tutorialRefs = useContext(TutorialElementsCtx);
  const colorPreference = useContext(ColorPreferenceCtx);

  const color = useMemo(() => colorPreference.value === 'dark' ? 'white' : 'black', [colorPreference]);

  /**
   * The meal total for one week.
   */
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

  /**
   * The data for the bar chart, splits up weekly meal prices by location.
   */
  const barChartData = useMemo(() => {
    const locationMap = userMealsToStackedChart(
      userSelectedMeals.value,
      meals,
      customMeals.value,
      isDiscount.value ?? false
    );
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
  }, [customMeals.value, userSelectedMeals.value, isDiscount.value]);

  /**
   * The data for the pie chart, splits up weekly meal prices by location.
   */
  const pieChartData = useMemo(() => {
    const locationMap = userMealsToStackedChart(
      userSelectedMeals.value,
      meals,
      customMeals.value,
      isDiscount.value ?? false
    );
    const priceMap: number[] = [];
    locationMap.forEach((prices) =>
      priceMap.push(prices.reduce((p, c) => p + c))
    );
    return {
      labels: mealLocations,
      datasets: [
        {
          data: priceMap,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          hoverOffset: 4
        }
      ]
    };
  }, [customMeals.value, userSelectedMeals.value, isDiscount.value]);

  /** The options for the pie chart:
   *    Adds the title
   *    Makes it responsive to screen size changes
   *    Sets the tooltips to display currency and percentage
   */
  const pieChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Meals by Weekly Price',
          color,
        },
        legend: {
          labels: {
            color
          }
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: TooltipItem<'pie'>) => {
              if (!tooltipItem) return '';

              const dataset = pieChartData.datasets[tooltipItem.datasetIndex];
              if (!dataset) return '';

              const tooltipValue = dataset.data[tooltipItem.dataIndex];
              const total = dataset.data
                .filter((item) => !isNaN(item))
                .reduce((a, b) => a + b, 0);
              const tooltipPercentage = Math.round(
                (tooltipItem.parsed * 100) / total
              );

              return `${formatCurrency(tooltipValue)} (${tooltipPercentage}%)`;
            }
          }
        }
      }
    }),
    [pieChartData.datasets, color]
  );

  /**
   * The options for the bar chart:
   *    Adds the title
   *    Makes it responsive to screen size changes
   *    Configures it as stacked
   *    Sets the ticks to display currency
   */
  const barChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Meals by Weekday',
          color,
        },
        legend: {
          labels: {
            color
          }
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: TooltipItem<'bar'>) => {
              if (!tooltipItem) return '';
              const dataset = barChartData.datasets[tooltipItem.datasetIndex];
              if (!dataset) return '';
              return formatCurrency(dataset.data[tooltipItem.dataIndex]);
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color,
          }
        },
        y: {
          beginAtZero: true,
          stacked: true,
          ticks: {
            color,
            callback: function (tickValue: string | number) {
              const value =
                typeof tickValue === 'string'
                  ? parseFloat(tickValue)
                  : tickValue;
              return formatCurrency(value);
            }
          }
        }
      }
    }),
    [barChartData.datasets, color]
  );

  useEffect(() => {
    //ChartJS.defaults.color = color;
    //ChartJS.defaults.plugins.title.color = color;
    //ChartJS.defaults.plugins.legend.labels.color = color;
  }, [colorPreference]);

  return (
    <SectionContainer
      title='Results'
      tooltip={tooltip.results}
      setRef={(ref) => tutorialRefs.setValue(ref, 'Results')}
      order={order}
    >
      <div className='text-gray-400 mt-4 mb-1'>
        (Charts are based on the total for 1 week)
      </div>
      <div className='flex flex-row flex-wrap w-full justify-evenly mb-4'>
        <div className='relative mb-4 w-full lg:w-[45%] min-h-[250px] sm:min-h-[300px]'>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className='relative mb-4 w-full lg:w-[45%] min-h-[250px] sm:min-h-[300px]'>
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
      <Divider />
      <DotLeader
        info={[
          {
            title: 'Starting Balance',
            value: formatCurrency(balance.value || 0),
            resultsStyle: 'text-messiah-green dark:text-messiah-green-light'
          },
          {
            title: 'Weekly Total',
            value: `${formatCurrency(weekTotal)}`,
            resultsStyle: 'text-messiah-red dark:text-messiah-red-light'
          },
          {
            title: 'Grand Total',
            value: `${formatCurrency(grandTotal)}`,
            resultsStyle: 'text-messiah-red dark:text-messiah-red-light'
          }
        ].concat(
          !isUnderBalance && dayWhenRunOut !== null
            ? [
                {
                  title: `Date When Money Runs Out 
                  ${
                    weeksOff.value
                      ? '(Assuming the weeks off are before this)'
                      : ''
                  }`,
                  value: `${
                    dayWhenRunOut.getMonth() + 1
                  }/${dayWhenRunOut.getDate()}/${dayWhenRunOut.getFullYear()}`,
                  resultsStyle: 'text-black dark:text-white'
                }
              ]
            : []
        )}
      />
      <div
        className={`${
          isUnderBalance ? 'text-messiah-green dark:text-messiah-green-light ' : 'text-messiah-red dark:text-messiah-red-light'
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
