interface ButtonProps {
  /**
   * The text to display on the button.
   */
  title?: string;

  /**
   * The icon to display on the button.
   */
  icon?: JSX.Element;

  /**
   * The event handler to be called when the button is clicked.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The mouse event.
   */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * If true, the button will have a white background with a border and a
   * messiah-specific style.
   */
  frame?: boolean;

  /**
   * Additional CSS classes to apply to the button.
   */
  style?: string;

  /**
   * If true, the button will be disabled and cannot be clicked.
   */
  disabled?: boolean;

  /**
   * If true, the icon will be displayed to the right of the text.
   */
  iconRight?: boolean;
}

/**
 * Renders a button component with the provided title and click event handler.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @return {JSX.Element} The rendered button component.
 */
const Button = ({
  title,
  icon,
  onClick,
  frame,
  style,
  iconRight = false,
  disabled = false
}: ButtonProps): JSX.Element => (
  <button
    className={
      (frame
        ? 'bg-white text-black text-lg border-2 border-messiah-light-blue hover:border-messiah-light-blue-hover active:border-messiah-light-blue-active m-2 p-2 rounded-lg flex-shrink transition duration-50'
        : 'text-black bg-messiah-light-blue hover:bg-messiah-light-blue-hover active:bg-messiah-light-blue-active text-lg border-2 border-messiah-light-blue m-2 rounded-lg p-2 transition duration-50 ') +
      (disabled ? 'opacity-30 pointer-events-none select-none ' : ' ') +
      style
    }
    disabled={disabled}
    onClick={onClick}
  >
    <div className='w-full flex flex-row items-center justify-center gap-2'>
      {icon && !iconRight ? icon : <></>}
      {title ?? <></>}
      {icon && iconRight ? icon : <></>}
    </div>
  </button>
);

export default Button;
