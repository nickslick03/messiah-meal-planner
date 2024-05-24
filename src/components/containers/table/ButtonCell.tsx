interface ButtonCellProps {
  icon: JSX.Element;
  onClick: () => void;
}

/**
 * Renders a table cell with a button that triggers the provided onClick function when clicked
 *
 * @param {JSX.Element} icon - The component for the icon to display on the button
 * @param {() => void} onClick - The function to be called when the button is clicked
 * @returns {JSX.Element} The rendered table cell with a button
 */
const ButtonCell = ({
  icon,
  onClick = () => {}
}: ButtonCellProps): JSX.Element => (
  <td className='text-center'>
    <button
      className='bg-messiah-light-blue hover:bg-messiah-light-blue-hover active:bg-messiah-light-blue-active
      text-black text-lg font-bold w-8 h-8 m-2 rounded-full text-center'
      onClick={onClick}
    >
      <div className='flex justify-center items-center'>{icon}</div>
    </button>
  </td>
);

export default ButtonCell;
