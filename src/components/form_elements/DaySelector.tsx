import { WEEKDAYS } from '../../static/constants';
import Highlighter from '../other/Highlighter';
import { v4 as uuid } from 'uuid';

const days = WEEKDAYS.map((day) => day.slice(0, 3));

interface DaySelectorProps {
  /**
   * List of booleans indicating whether each day of the week is selected or not.
   */
  daysSelected: boolean[];
  /**
   * Function to call when a day is clicked, with the index of the day as an argument.
   */
  onChange: (i: number) => void;
  /**
   * Optional boolean indicating whether each day should be square or not.
   * Defaults to false.
   */
  square?: boolean;
  /**
   * Optional list of numbers indicating the number of meals on each day.
   */
  numOfMeals?: number[];
  /**
   * Optional boolean indicating whether to slide the highlighter.
   * Defaults to false.
   */
  slideHighlight?: boolean;
  /**
   * Optional list of booleans indicating whether each day should be highlighted red for an error.
   * Defaults to [false, false, false, false, false, false, false].
   */
  daysWithErrors?: boolean[];
}

/**
 * Component for a day selector, with each day in a circle that can be selected (and deselected)
 *
 * @param {DaySelectorProps} props - The props for the DaySelector component.
 * @returns {JSX.Element} The DaySelector component
 */
const DaySelector = ({
  daysSelected,
  onChange,
  square = false,
  numOfMeals,
  slideHighlight = false,
  daysWithErrors = [false, false, false, false, false, false, false]
}: DaySelectorProps) => {
  const daySelectorId = `dayselector-${uuid()}`;
  return (
    <div
      id={daySelectorId}
      className={`relative flex flex-row justify-center gap-2 ${
        !square && 'w-full'
      }`}
    >
      {days.map((day, i) => (
        <div key={i} className={`flex-1 z-10 relative ${square && 'w-10'}`}>
          <button
            key={i}
            id={`dayselector-${daySelectorId}-${i}`}
            className={`w-full p-1 min-h-10 z-10 ${
              square && 'w-10'
            } rounded-lg flex flex-col items-center justify-center ${
              daysSelected[i]
                ? slideHighlight
                  ? 'bg-transparent'
                  : 'bg-messiah-light-blue'
                : slideHighlight
                ? 'bg-transparent sm:hover:bg-gray-200 sm:active:bg-gray-400 transition duration-50'
                : 'bg-gray-300 sm:hover:bg-gray-200 sm:active:bg-gray-400 transition duration-50'
            } ${daysWithErrors[i] && 'text-messiah-red'}`}
            onClick={() => onChange(i)}
          >
            <p className='text-14'>{day}</p>
            {numOfMeals !== undefined && (
              <p className='text-xs font-extralight'>
                {numOfMeals[i]}{' '}
                <span className='hidden sm:inline'>
                  meal{numOfMeals[i] !== 1 ? 's' : ''}
                </span>
              </p>
            )}
          </button>
        </div>
      ))}
      {slideHighlight && (
        <Highlighter
          selectedIndex={daysSelected.indexOf(true)}
          daySelectorId={daySelectorId}
        />
      )}
    </div>
  );
};

export default DaySelector;
