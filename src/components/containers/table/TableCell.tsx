import { IMPORTANCE_CLASSES } from '../../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../../types/ImportanceIndex';

enum SortState {
  NONE,
  ASCENDING,
  DESCENDING,
}

interface TableCellProps {
  data: string | number;
  importance?: ImportanceIndex;
  isHeader?: boolean;
  isCustom?: boolean;
  onCustomClick?: () => void;
  sortState?: SortState;
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
  sortState = SortState.NONE,
  isCustom = false,
  onCustomClick
}: TableCellProps): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';

  return (
    <td
      className={`${importanceStyle} p-2 text-center`}
    >
      {onCustomClick !== undefined ? (
        <button
          className={`${isCustom || sortState !== SortState.NONE ? 'text-messiah-blue' : ''} 
          bg-transparent border-none font-inter underline 
          hover:text-messiah-blue-hover p-0 m-0 text-nowrap`}
          type='button'
          onClick={onCustomClick}
        >
          {data}{sortState === SortState.ASCENDING? ' ▲' : sortState === SortState.DESCENDING? ' ▼' : ''}
        </button>
      ) : (
        data
      )}
    </td>
  );
};

export default TableCell;
