interface ButtonProps {
  title?: string;
  icon?: JSX.Element;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  frame?: boolean;
  style?: string;
  disabled?: boolean;
}

/**
 * Renders a button component with the provided title and click event handler.
 *
 * @param {string} title - The text to display on the button.
 * @param {JSX.Element} icon - The icon to display on the button.
 * @param {() => void} onClick - The event handler to be called when the button is clicked.
 * @param {boolean} disabled - optional boolean for whether the button is disabled.
 * @return {JSX.Element} The rendered button component.
 */
const Button = ({
  title,
  icon,
  onClick,
  frame,
  style,
  disabled = false
}: ButtonProps): JSX.Element => (
  <button
    className={
      (frame
        ? 'bg-white text-black text-lg border-2 border-messiah-light-blue hover:border-messiah-light-blue-hover active:border-messiah-light-blue-active m-2 p-2 rounded-lg flex-shrink transition duration-50'
        : 'text-black bg-messiah-light-blue hover:bg-messiah-light-blue-hover active:bg-messiah-light-blue-active text-lg border-2 border-messiah-light-blue m-2 rounded-lg p-2 transition duration-50 ') +
      (disabled ? 'opacity-30 pointer-events-none select-none' : ' ') +
      style
    }
    disabled={disabled}
    onClick={onClick}
  >
    <div className='w-full flex flex-row items-center justify-center gap-2'>
      {icon ?? <></>}
      {title ?? <></>}
    </div>
  </button>
);

export default Button;
