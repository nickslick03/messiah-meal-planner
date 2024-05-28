import {
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { BalanceCtx } from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';

/**
 * Renders a results bar that sticks to the bottom of the page, displays the starting balance,
 * grand total, and $ over/under of a meal plan.
 *
 * @returns {JSX.Element} The rendered ResultsBar component.
 */

const ResultsBar = () => {
  // Load balance context
  const balance = useContext(BalanceCtx);

  // Format balance as currency
  const balCurrency = useMemo(
    () => formatCurrency(balance.value || 0),
    [balance]
  );

  // Check if balance is under $1000
  const isUnderBalance = useMemo(() => balance.value >= 1000, [balance]);

  // Ref to the container of this element, for handling the bottom corner rounding
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
      rounded-t-xl flex gap-6 justify-around text-center ${
        isAtBottom ? 'rounded-bl-xl rounded-br-xl' : ''
      }`}>
      <div className='hidden sm:block'>
        <span className='font-bold'>Starting Balance: </span>
        <span className='text-messiah-green'>{balCurrency}</span>
      </div>
      <div>
        <span className='font-bold'>Grand Total: </span>
        <span className='text-messiah-red'>{formatCurrency(1000)}</span>
      </div>
      <div>
        <span className='font-bold'>$ {isUnderBalance ? 'Extra' : 'Short'}: </span>
        <span className={isUnderBalance ? 'text-messiah-green' : 'text-messiah-red'}>
          {formatCurrency(1000)}
        </span>
      </div>
    </div>
  );
};

export default ResultsBar;
