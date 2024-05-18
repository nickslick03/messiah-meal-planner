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
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded-full text-center'
      onClick={onClick}
    >
      {title}
    </button>
  </td>
);

export default ButtonCell;
