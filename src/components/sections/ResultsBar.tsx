import {
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { BalanceCtx, CustomMealsCtx, EndDateCtx, IsBreakCtx, MealPlanCtx, StartDateCtx, UserSelectedMealsCtx } from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';
import { getMealTotal } from '../../lib/calculationEngine';
import { getWeekdaysBetween } from '../../lib/dateCalcuation';
import meals from '../../static/mealsDatabase';

/**
 * Renders a results bar that sticks to the bottom of the page, displays the starting balance,
 * grand total, and $ over/under of a meal plan.
 *
 * @returns {JSX.Element} The rendered ResultsBar component.
 */

const ResultsBar = () => {
  /** Load balance context */
  const balance = useContext(BalanceCtx);

  /** Format balance as currency */
  const balCurrency = useMemo(
    () => formatCurrency(balance.value ?? 0),
    [balance]
  );
  const userMeals = useContext(UserSelectedMealsCtx);
  const startDate = useContext(StartDateCtx);
  const endDate = useContext(EndDateCtx);
  const weekOff = useContext(IsBreakCtx);
  const isDiscount = useContext(MealPlanCtx);
  const customMeals = useContext(CustomMealsCtx);
  
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
    balance.value!== null
    ? balance.value >= grandTotal
    : false, 
  [balance.value, grandTotal]);

  /** Ref to the container of this element, for handling the bottom corner rounding. */
  const ref = useRef<HTMLDivElement>(null);

  // Indicates whether the user is at the bottom of the page
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    (new IntersectionObserver(
      ([e]) => setIsAtBottom(e.intersectionRatio === 1),
      { threshold: [1] }
    )).observe(ref.current!);
  }, []);

  return (
    <div
      id={'resultsBar'}
      ref={ref}
      className={`sticky w-full bottom-[-1px] p-2 bg-messiah-light-blue drop-shadow-dark 
      rounded-t-xl flex gap-6 justify-around text-center bg-opacity-80 backdrop-blur-sm ${
        isAtBottom ? 'rounded-bl-xl rounded-br-xl' : ''
      }`}>
      <div className='hidden sm:block'>
        <span className='font-bold'>Starting Balance: </span>
        <span className='text-messiah-green'>{balCurrency}</span>
      </div>
      <div>
        <span className='font-bold'>Grand Total: </span>
        <span className='text-messiah-red'>{formatCurrency(grandTotal)}</span>
      </div>
      <div>
        <span className='font-bold'>$ {isUnderBalance ? 'Extra' : 'Short'}: </span>
        <span className={isUnderBalance ? 'text-messiah-green' : 'text-messiah-red'}>
          {formatCurrency(Math.abs(balance.value ?? 0 - grandTotal))}
        </span>
      </div>
    </div>
  );
};

export default ResultsBar;
