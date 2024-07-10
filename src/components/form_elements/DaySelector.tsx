import { WEEKDAYS } from '../../static/constants';
import Highlighter from '../other/Highlighter';
import { v4 as uuid } from 'uuid';

const days = WEEKDAYS.map((day) => day.slice(0, 3));

interface DaySelectorProps {
  daysSelected: boolean[];
  onChange: (i: number) => void;
  square?: boolean;
  numOfMeals?: number[];
  slideHighlight?: boolean;
}

/**
 * Component for a day selector, with each day in a circle that can be selected (and deselected)
 * @param {boolean[]} props.daysSelected - List of booleans indicating whether each day is selected or not
 * @param {function} props.onChange - Function to call when a day is clicked, with the index of the day as an argument
 * @param {boolean} [props.square=false] - Optional boolean indicating whether the selector should be square or not
 * @param {number[]} [props.numOfMeals] - Optional list of numbers indicating the number of meals on each day
 * @param {boolean} [props.slideHighlight] - Optional boolean indicating whether to slide the highlighter
 * @returns {JSX.Element} The DaySelector component
 */
const DaySelector = ({
  daysSelected,
  onChange,
  square = false,
  numOfMeals,
  slideHighlight = false
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
            }`}
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
