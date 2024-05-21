interface ButtonCellProps {
  title: string;
  onClick: () => void;
}

/**
 * Renders a table cell with a button that triggers the provided onClick function when clicked
 *
 * @param {string} title - The text to display on the button
 * @param {() => void} onClick - The function to be called when the button is clicked
 * @returns {JSX.Element} The rendered table cell with a button
 */
const ButtonCell = ({
  title,
  onClick = () => {}
}: ButtonCellProps): JSX.Element => (
  <td className='text-center'>
    <button
      className='bg-messiah-blue hover:bg-messiah-blue-hover active:bg-messiah-blue-active
      text-white text-lg font-bold w-8 h-8 m-2 rounded-full text-center'
      onClick={onClick}
    >
      <div>{title}</div>
    </button>
  </td>
);

export default ButtonCell;
