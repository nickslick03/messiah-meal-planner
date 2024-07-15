import { IoAdd } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { WEEKDAYS } from '../../../static/constants';
import { Weekday } from '../../../types/userSelectedMealsObject';
import useLongPress from '../../../hooks/useLongPress';
import useClickOutside from '../../../hooks/useClickOutside';

interface ButtonCellProps {
  icon: JSX.Element;
  onClick: () => void;
  onClickDay?: (day: Weekday) => void;
}

/**
 * Renders a table cell with a button that triggers the provided onClick function when clicked
 * and the provided onClickDay function when a day button is clicked
 *
 * @param {JSX.Element} icon - The component for the icon to display on the button
 * @param {() => void} onClick - The function to be called when the button is clicked
 * @param {() => void} onClickDay - The function to be called when a day button is clicked
 * @returns {JSX.Element} The rendered table cell with a button
 */
const ButtonCell = ({
  icon,
  onClick = () => {},
  onClickDay = () => {}
}: ButtonCellProps): JSX.Element => {
  /**
   * State for whether the button is hovered
   * This and the next state together control whether the button should be expanded to show the day buttons
   * Note this is only shown when the icon is IoAdd (the icon for an 'add' button)
   */
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  /**
   * State for whether the tooltip is hovered
   */
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  /**
   * State to keep track of button rounding
   */
  const [isRounded, setIsRounded] = useState(true);

  /**
   * Detector for whether or not the user is on a mobile device
   * @returns {boolean} Whether the current device is a mobile device
   */
  const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

  /**
   * Ref to the button container, for handling outside click on mobile
   */
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Use long press for mobile
   */
  const handleLongPress = useLongPress(
    isMobileDevice() && icon.type == IoAdd
      ? () => {
          setIsTooltipHovered(true);
        }
      : () => {},
    isMobileDevice() && icon.type == IoAdd ? onClick : () => {},
    300
  );

  /** Use outside click for mobile */
  useClickOutside(ref, () => {
    setIsTooltipHovered(false);
  });

  /**
   * useEffect to keep track of button rounding
   */
  useEffect(() => {
    if (!isButtonHovered && !isTooltipHovered) {
      const timer = setTimeout(() => setIsRounded(false), 300); // Match the transition duration
      return () => clearTimeout(timer);
    } else {
      setIsRounded(true);
    }
  }, [isButtonHovered, isTooltipHovered]);

  return (
    <td className='text-center'>
      <div className='flex items-center h-full justify-center'>
        <div
          className='relative flex items-center justify-center h-full'
          ref={isMobileDevice() ? ref : null}
        >
          <button
            {...handleLongPress}
            className={`bg-messiah-light-blue hover:bg-messiah-light-blue-hover active:bg-messiah-light-blue-active
                 text-black text-lg font-bold w-8 h-8 my-2 mx-0 select-none z-10 ${
                   isRounded
                     ? 'rounded-full rounded-tl-none rounded-bl-none'
                     : 'rounded-full'
                 } text-center transition duration-50`}
            onClick={
              !isMobileDevice() || icon.type !== IoAdd ? onClick : () => {}
            }
            onMouseEnter={
              icon.type === IoAdd && !isMobileDevice()
                ? () => setIsButtonHovered(true)
                : () => {}
            }
            onMouseLeave={
              icon.type === IoAdd && !isMobileDevice()
                ? () => setIsButtonHovered(false)
                : () => {}
            }
          >
            <div className='flex justify-center items-center'>{icon}</div>
          </button>
          <div
            className={`flex absolute right-full top-1/2 transform -translate-y-1/2 transition-all duration-300 
            ${
              isButtonHovered || isTooltipHovered
                ? 'w-60 bg-messiah-light-blue'
                : 'w-0 bg-messiah-light-blue-hover'
            } z-10 h-8 rounded-tl-full rounded-bl-full overflow-hidden`}
            onMouseEnter={
              icon.type === IoAdd && !isMobileDevice()
                ? () => setIsTooltipHovered(true)
                : () => {}
            }
            onMouseLeave={
              icon.type === IoAdd && !isMobileDevice()
                ? () => setIsTooltipHovered(false)
                : () => {}
            }
          >
            {WEEKDAYS.map((day) => (
              <button
                key={day}
                className='w-full h-full hover:bg-messiah-light-blue-hover transition duration-50 select-none'
                onClick={() => onClickDay(day)}
              >
                {day.slice(0, 2)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </td>
  );
};

export default ButtonCell;
