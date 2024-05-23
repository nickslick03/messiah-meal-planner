interface ButtonProps {
  title: string;
  onClick: () => void;
  frame?: boolean;
  style?: string;
  disabled?: boolean;
}

/**
 * Renders a button component with the provided title and click event handler.
 *
 * @param {string} title - The text to display on the button.
 * @param {() => void} onClick - The event handler to be called when the button is clicked.
 * @param {boolean} disabled - optional boolean for whether the button is disabled.
 * @return {JSX.Element} The rendered button component.
 */
const Button = ({ title, onClick, frame, style, disabled = false }: ButtonProps): JSX.Element => (
  <button
    className={
      (frame
        ? ' bg-white text-black text-lg border-2 border-messiah-light-blue hover:border-messiah-light-blue-hover active:border-messiah-light-blue-active m-2 p-2 rounded-lg flex-shrink'
        : 'text-black bg-messiah-light-blue hover:bg-messiah-light-blue-hover active:bg-messiah-light-blue-active text-lg border-2 border-messiah-light-blue m-2 rounded-lg p-2') +
      (disabled
        ? ' opacity-30 pointer-events-none select-none '
        : ' ')
      + style
    }
    disabled={disabled}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
