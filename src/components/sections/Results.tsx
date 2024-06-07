import { useContext, useMemo } from 'react';
import SectionContainer from '../containers/SectionContainer';
import DotLeader from '../other/DotLeader';
import { BalanceCtx, EndDateCtx, IsBreakCtx, MealPlanCtx, StartDateCtx, UserSelectedMealsCtx } from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';
import { getMealTotal } from '../../lib/calculationEngine';
import { getWeekdaysBetween, strToDate } from '../../lib/dateCalcuation';

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

  const weekTotal = useMemo(() => 
    getMealTotal(
      userMeals.value, 
      Array.from<number>({ length: 7 }).fill(1), 
      isDiscount.value),
    [isDiscount.value, userMeals.value]);
    
  const grandTotal = useMemo(() => 
    getMealTotal(
      userMeals.value, 
      getWeekdaysBetween(strToDate(startDate.value), strToDate(endDate.value), weekOff.value), 
      isDiscount.value),
    [endDate.value, isDiscount.value, startDate.value, userMeals.value, weekOff.value]);

  const isUnderBalance = useMemo(() => balance.value >= grandTotal, [balance.value, grandTotal]);

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
