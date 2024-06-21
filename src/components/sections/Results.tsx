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
import meals from '../../static/mealsDatabase';
import tutorial from '../../static/tutorial';

interface ResultsProps {
  grandTotal: number;
  isUnderBalance: boolean;
  difference: number;
}

/**
 * Renders the results of the meal planning.
 */
const Results = ({ grandTotal, isUnderBalance, difference }: ResultsProps) => {
  const balance = useContext(BalanceCtx);
  const userMeals = useContext(UserSelectedMealsCtx);
  const isDiscount = useContext(MealPlanCtx);
  const customMeals = useContext(CustomMealsCtx);

  /** The meal total for one week. */
  const weekTotal = useMemo(
    () =>
      getMealTotal(
        userMeals.value,
        Array<number>(7).fill(1),
        isDiscount.value ?? false,
        [...meals, ...customMeals.value]
      ),
    [customMeals.value, isDiscount.value, userMeals.value]
  );

  return (
    <SectionContainer title='Results' tutorial={tutorial.results}>
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
