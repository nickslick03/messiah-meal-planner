import { useContext, useRef, useState, useEffect } from 'react';
import { BalanceCtx } from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';

interface ResultsBarProps {
  /**
   * The grand total cost of the meal plan.
   */
  grandTotal: number;

  /**
   * Whether the grand total is under the starting balance.
   */
  isUnderBalance: boolean;

  /**
   * The difference between the grand total and the starting balance.
   */
  difference: number;

  /**
   * The order in which the ResultsBar should appear in the results section.
   */
  order: number;
}

/**
 * Renders a results bar that sticks to the bottom of the page, displays the starting balance,
 * grand total, and $ over/under of a meal plan.
 *
 * @returns {JSX.Element} The rendered ResultsBar component.
 */
const ResultsBar = ({
  grandTotal,
  isUnderBalance,
  difference,
  order
}: ResultsBarProps) => {
  /**
   * Load balance context
   */
  const balance = useContext(BalanceCtx);

  /**
   * Ref to the container of this element, for handling the bottom corner rounding.
   */
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Indicates whether the user is at the bottom of the page
   */
  const [isAtBottom, setIsAtBottom] = useState(false);

  /**
   * Detect if the user is at the bottom of the page
   */
  useEffect(() => {
    new IntersectionObserver(
      ([e]) => setIsAtBottom(e.intersectionRatio === 1),
      { threshold: [1] }
    ).observe(ref.current!);
  }, []);

  return (
    <div
      id={'resultsBar'}
      ref={ref}
      className={`sticky w-full bottom-[-1px] p-2 bg-messiah-light-blue drop-shadow-dark 
      rounded-t-xl flex gap-6 justify-around text-center bg-opacity-80 z-40 backdrop-blur-sm ${
        isAtBottom ? 'rounded-bl-xl rounded-br-xl' : ''
      }`}
      style={{
        order: order
      }}
    >
      <div className='hidden sm:block'>
        <span className='font-bold'>Starting Balance: </span>
        <span className='text-messiah-green dark:font-bold'>
          {formatCurrency(balance.value ?? 0)}
        </span>
      </div>
      <div>
        <span className='font-bold'>Grand Total: </span>
        <span className='text-messiah-red  dark:font-bold'>{formatCurrency(grandTotal)}</span>
      </div>
      <div>
        <span className='font-bold'>
          $ {isUnderBalance ? 'Extra' : 'Short'}:{' '}
        </span>
        <span
          className={`${isUnderBalance ? 'text-messiah-green' : 'text-messiah-red'} dark:font-bold`}
        >
          {formatCurrency(difference)}
        </span>
      </div>
    </div>
  );
};

export default ResultsBar;
