import {
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback
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

  // Handle bottom corner rounding
  const [isBottomRounded, setIsBottomRounded] = useState(false);

  // Ref to the container of this element, for handling the bottom corner rounding
  const ref = useRef<HTMLDivElement>(null);

  // Stores the previous scroll position
  const previousScrollY = useRef(0);

  /**
   * Handles the scroll event and updates the state of `isBottomRounded` based on whether or not
   * the sticky div is at the bottom of the screen
   */
  const handleScroll = useCallback(() => {
    const stickyDiv = ref.current;
    if (stickyDiv) {
      const rect = stickyDiv.getBoundingClientRect();

      const isAtBottom = window.innerHeight - rect.bottom < 1;
      const currentScrollY = window.scrollY;

      // Only update state if the scroll position has changed significantly to avoid rapid toggling
      if (Math.abs(previousScrollY.current - currentScrollY) > 5) {
        setIsBottomRounded(!isAtBottom);
        previousScrollY.current = currentScrollY;
      }
    }
  }, []);

  // Add scroll and resize listeners
  useEffect(() => {
    const onScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={ref}
      className={`sticky w-full bottom-0 p-2 bg-messiah-light-blue drop-shadow-dark rounded-tl-xl rounded-tr-xl flex gap-6 justify-around text-center ${
        isBottomRounded ? 'rounded-bl-xl rounded-br-xl' : ''
      }`}
    >
      {window.innerWidth > 640 ? (
        <div>
          <span className='font-bold'>Starting Balance: </span>
          <span className='text-messiah-green'>{balCurrency}</span>
        </div>
      ) : (
        <></>
      )}
      <div>
        <span className='font-bold'>Grand Total: </span>
        <span className='text-messiah-red'>{formatCurrency(1000)}</span>
      </div>
      <div>
        <span className='font-bold'>$ Over/Under: </span>
        <span
          className={isUnderBalance ? 'text-messiah-green' : 'text-messiah-red'}
        >
          {formatCurrency(1000)}
        </span>
      </div>
    </div>
  );
};

export default ResultsBar;
