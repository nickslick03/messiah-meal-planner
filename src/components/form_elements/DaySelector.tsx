import { WEEKDAYS } from '../../static/constants';

const days = WEEKDAYS.map((day) => day.slice(0, 3));

interface DaySelectorProps {
  daysSelected: boolean[];
  onChange: (i: number) => void;
  maxWidth?: number;
}

/**
 * Component for a day selector, with each day in a circle that can be selected (and deselected)
 * @param {Object} props - Object with onChange function and list of selected days
 */
const DaySelector = ({
  daysSelected,
  onChange,
  maxWidth
}: DaySelectorProps) => {
  return (
    <div className='flex flex-row justify-center w-full gap-2'>
      {days.map((day, i) => (
        <div
          key={i}
          className={`w-full ${maxWidth ? `max-w-${maxWidth}` : ''}`}
        >
          <button
            key={i}
            className={`w-full h-10 rounded-lg items-center justify-center ${
              daysSelected[i]
                ? 'bg-messiah-light-blue sm:hover:bg-messiah-light-blue-hover active:bg-messiah-light-blue-active'
                : 'bg-gray-300 sm:hover:bg-gray-200 active:bg-gray-400'
            }`}
            onClick={() => onChange(i)}
          >
            <p className='text-14'>{day}</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default DaySelector;
