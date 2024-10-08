import { IMPORTANCE_CLASSES } from '../../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../../types/ImportanceIndex';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

enum SortState {
  NONE,
  ASCENDING,
  DESCENDING
}

interface TableCellProps {
  /**
   * The data to be displayed in the table cell
   */
  data: string | number;

  /**
   * The importance level of the table cell
   */
  importance?: ImportanceIndex;

  /**
   * Whether the table cell is a header
   */
  isHeader?: boolean;

  /**
   * Whether the table cell represents a custom meal
   */
  isCustom?: boolean;

  /**
   * The click event handler for clicking on a custom meal
   */
  onCustomClick?: () => void;

  /**
   * The sort state of the table cell
   */
  sortState?: SortState;
}

/**
 * Renders a table cell with the given data, importance level, and header status
 * @param {TableCellProps} props - The properties for the table cell
 * @returns {JSX.Element} The rendered table cell
 */
const TableCell = ({
  data,
  importance = newImportanceIndex(3),
  sortState = SortState.NONE,
  isCustom = false,
  onCustomClick
}: TableCellProps): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';

  return (
    <td className={`${importanceStyle} p-2 text-center`}>
      {onCustomClick !== undefined ? (
        <button
          className={`${
            isCustom || sortState !== SortState.NONE ? 'text-messiah-blue' : ''
          } 
          bg-transparent border-none font-inter underline 
          hover:text-messiah-blue-hover p-0 m-0 text-nowrap inline-flex transition duration-50`}
          type='button'
          onClick={onCustomClick}
        >
          {data}
          {sortState === SortState.ASCENDING ? (
            <MdArrowDropUp size={25} />
          ) : sortState === SortState.DESCENDING ? (
            <MdArrowDropDown size={25} />
          ) : (
            ''
          )}
        </button>
      ) : data === 'N/A' ? (
        <span className='text-messiah-red'>{data}</span>
      ) : (
        data
      )}
    </td>
  );
};

export default TableCell;
