import { WEEKDAYS } from '../../static/constants';

const days = WEEKDAYS.map((day) => day.slice(0, 3));

interface DaySelectorProps {
  daysSelected: boolean[];
  onChange: (i: number) => void;
  square?: boolean;
  numOfMeals?: number[];
}

/**
 * Component for a day selector, with each day in a circle that can be selected (and deselected)
 * @param {boolean[]} props.daysSelected - List of booleans indicating whether each day is selected or not
 * @param {function} props.onChange - Function to call when a day is clicked, with the index of the day as an argument
 * @param {boolean} [props.square=false] - Optional boolean indicating whether the selector should be square or not
 * @param {number[]} [props.numOfMeals] - Optional list of numbers indicating the number of meals on each day
 * @returns {JSX.Element} The DaySelector component
 */
const DaySelector = ({
  daysSelected,
  onChange,
  square = false,
  numOfMeals
}: DaySelectorProps) => {
  return (
    <div
      className={`flex flex-row justify-center gap-2 ${!square && 'w-full'}`}
    >
      {days.map((day, i) => (
        <div key={i} className={`flex-1 ${square && 'w-10'}`}>
          <button
            key={i}
            className={`w-full p-1 min-h-10 ${
              square && 'w-10'
            } rounded-lg flex flex-col items-center justify-center ${
              daysSelected[i]
                ? 'bg-messiah-light-blue sm:hover:bg-messiah-light-blue-hover active:bg-messiah-light-blue-active'
                : 'bg-gray-300 sm:hover:bg-gray-200 active:bg-gray-400'
            }`}
            onClick={() => onChange(i)}
          >
            <p className='text-14'>{day}</p>
            {numOfMeals ? (
              <p className='text-xs font-extralight'>
                {numOfMeals[i]}{' '}
                <span className='hidden sm:inline'>
                  meal{numOfMeals[i] !== 1 ? 's' : ''}
                </span>
              </p>
            ) : (
              ''
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DaySelector;
