import { useContext, useMemo } from 'react';
import SectionContainer from '../containers/SectionContainer';
import DotLeader from '../other/DotLeader';
import { BalanceCtx, EndDateCtx, IsBreakCtx, MealPlanCtx, StartDateCtx, UserSelectedMealsCtx, CustomMealsCtx } from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';
import { getMealTotal } from '../../lib/calculationEngine';
import { getWeekdaysBetween } from '../../lib/dateCalcuation';
import meals from '../../static/mealsDatabase';

/**
 * Renders the results of the meal planning.
 */
const Results = () => {
  const balance = useContext(BalanceCtx);
  const userMeals = useContext(UserSelectedMealsCtx);
  const startDate = useContext(StartDateCtx);
  const endDate = useContext(EndDateCtx);
  const weekOff = useContext(IsBreakCtx);
  const isDiscount = useContext(MealPlanCtx);
  const customMeals = useContext(CustomMealsCtx);

  /** The meal total for one week. */
  const weekTotal = useMemo(() => 
    getMealTotal(
      userMeals.value, 
      Array<number>(7).fill(1),
      isDiscount.value,
      [...meals, ...customMeals.value]),
    [customMeals.value, isDiscount.value, userMeals.value]);
  
  /** The grand total of all the meals from the start date to the end date. */
  const grandTotal = useMemo(() =>
    startDate.value !== null && endDate.value !== null && balance.value !== null
    ? getMealTotal(
      userMeals.value, 
      getWeekdaysBetween(startDate.value, endDate.value, weekOff.value), 
      isDiscount.value,
      [...meals, ...customMeals.value])
    : 0,
    [
      endDate.value, 
      isDiscount.value, 
      startDate.value, 
      userMeals.value, 
      weekOff.value, 
      balance.value,
      customMeals.value
    ]);

  /** Indicates whether the grand total is under the inital balance. */
  const isUnderBalance = useMemo(() => 
    balance.value !== null
    ? balance.value >= grandTotal
    : false,
    [balance.value, grandTotal]);

  /** The difference between the balance and the grand total. */
  const difference = useMemo(() => {
    const b = balance.value || 0;
    return Math.abs(b - grandTotal).toFixed(2);
  }, [balance, grandTotal]);

  return (
    <SectionContainer title='Results'>
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
          ? `You have an extra $${difference}!`
          : `You have overplanned by $${difference}.`}
      </div>
    </SectionContainer>
  );
};

export default Results;
