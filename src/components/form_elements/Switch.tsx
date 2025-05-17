import Highlighter from '../other/Highlighter';
import { IconContext } from 'react-icons';
import { v4 as uuid } from 'uuid';

interface SwitchProps {
  /**
   * The current state of the switch.
   */
  state: boolean;

  /**
   * Sets the state of the switch.
   * @param {boolean} state - The new state of the switch.
   */
  setState: (state: boolean) => void;

  /**
   * The icon to display on the "off" side of the switch.
   */
  offIcon?: JSX.Element;

  /**
   * The text to display on the "off" side of the switch.
   */
  offText: string;

  /**
   * The icon to display on the "on" side of the switch.
   */
  onIcon?: JSX.Element;

  /**
   * The text to display on the "on" side of the switch.
   */
  onText: string;

  /**
   * Whether or not the switch should shrink for small screeens.
   */
  shrinkable?: boolean;
}

/**
 * Component for a switch that can be toggled between two states.
 *
 * @param {SwitchProps} props - The props for the Switch component.
 * @returns {JSX.Element} The Switch component.
 */
const Switch = ({
  state,
  setState,
  offIcon = <></>,
  offText,
  onIcon = <></>,
  onText,
  shrinkable = false
}: SwitchProps) => {
  const id = `dayselector-${uuid()}`;

  return (
    <div className='relative text-black' id={id}>
      <div className='text-sm h-full bg-gray-300 rounded-lg flex relative z-5'>
        <button
          id={`dayselector-${id}-0`}
          onClick={() => setState(false)}
          className={`relative flex flex-row items-center justify-center h-full rounded-lg p-[5px] ${
            state
              ? 'sm:hover:bg-messiah-light-blue-hover'
              : 'bg-transparent hover:bg-transparent active:bg-transparent'
          } transition duration-50 z-20`}
        >
          <IconContext.Provider value={{ className: 'p-2', size: '30px' }}>
            {offIcon}
          </IconContext.Provider>
          <span
            className={`${shrinkable ? 'hidden sm:' : ''}inline text-nowrap`}
          >
            {offText}&nbsp;
          </span>
        </button>
        <button
          id={`dayselector-${id}-1`}
          onClick={() => setState(true)}
          className={`relative flex flex-row items-center justify-center h-full rounded-lg p-[5px] ${
            state
              ? 'bg-transparent hover:bg-transparent active:bg-transparent'
              : 'sm:hover:bg-messiah-light-blue-hover'
          } transition duration-50 z-20`}
        >
          <IconContext.Provider value={{ className: 'p-2', size: '30px' }}>
            {onIcon}
          </IconContext.Provider>
          <span
            className={`${shrinkable ? 'hidden sm:' : ''}inline text-nowrap`}
          >
            {onText}&nbsp;
          </span>
        </button>
      </div>
      <Highlighter
        selectedIndex={state ? 1 : 0}
        daySelectorId={id}
        offsetTop={0}
      />
    </div>
  );
};

export default Switch;
