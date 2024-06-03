import { IMPORTANCE_CLASSES } from '../../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../../types/ImportanceIndex';

interface TableCellProps {
  data: string | number;
  importance?: ImportanceIndex;
  isHeader?: boolean;
  isCustom?: boolean;
  onCustomClick?: () => void;
}

/**
 * Renders a table cell with the given data, importance level, and header status
 *
 * @param {string | number} data - The data to be displayed in the table cell
 * @param {ImportanceIndex} importance - The importance level of the table cell
 * @param {boolean} isHeader - Whether the table cell is a header
 * @param {boolean} isCustom - Whether the table cell represents a custom meal
 * @param {() => void} onCustomClick - The click event handler for clicking on a custom meal
 * @returns {JSX.Element} The rendered table cell
 */
const TableCell = ({
  data,
  importance = newImportanceIndex(3),
  isHeader = false,
  isCustom = false,
  onCustomClick = () => {}
}: TableCellProps): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';

  return (
    <td
      className={`${importanceStyle} ${
        isHeader ? 'border-b-4 border-b-messiah-blue' : ''
      } p-2 text-center`}
    >
      {isCustom ? (
        <button
          className='bg-transparent border-none font-inter underline text-messiah-blue hover:text-messiah-blue-hover p-0 m-0'
          type='button'
          onClick={onCustomClick}
        >
          {data}
        </button>
      ) : (
        data
      )}
    </td>
  );
};

export default TableCell;
