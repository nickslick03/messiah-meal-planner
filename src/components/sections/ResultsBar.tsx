import {
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { BalanceCtx } from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';


interface ResultsBarProps {
  grandTotal: number;
  isUnderBalance: boolean;
  difference: number;
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
  difference
}: ResultsBarProps) => {
  /** Load balance context */
  const balance = useContext(BalanceCtx);

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
        <span className='text-messiah-green'>{formatCurrency(balance.value ?? 0)}</span>
      </div>
      <div>
        <span className='font-bold'>Grand Total: </span>
        <span className='text-messiah-red'>{formatCurrency(grandTotal)}</span>
      </div>
      <div>
        <span className='font-bold'>$ {isUnderBalance ? 'Extra' : 'Short'}: </span>
        <span className={isUnderBalance ? 'text-messiah-green' : 'text-messiah-red'}>
          {formatCurrency(difference)}
        </span>
      </div>
    </div>
  );
};

export default ResultsBar;
