interface ButtonProps {
  title: string;
  onClick: () => void;
  frame?: boolean;
  style?: string;
}

/**
 * Renders a button component with the provided title and click event handler.
 *
 * @param {string} title - The text to display on the button.
 * @param {() => void} onClick - The event handler to be called when the button is clicked.
 * @return {JSX.Element} The rendered button component.
 */
const Button = ({ title, onClick, frame, style }: ButtonProps): JSX.Element => (
  <button
    className={
      (frame
        ? ' bg-white text-messiah-blue hover:text-messiah-blue-hover border-2 active:text-messiah-blue-active border-messiah-blue hover:border-messiah-blue-hover active:border-messiah-blue-active m-2 p-2 rounded-lg flex-shrink'
        : 'bg-messiah-blue hover:bg-messiah-blue-hover active:bg-messiah-blue-active text-white text-lg border-2 border-messiah-blue m-2 rounded-lg p-2') +
      ' ' +
      style
    }
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
