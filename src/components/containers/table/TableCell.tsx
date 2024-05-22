import { IMPORTANCE_CLASSES } from '../../../lib/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../../types/ImportanceIndex';

interface TableCellProps {
  data: string | number;
  importance?: ImportanceIndex;
  isHeader?: boolean;
}

/**
 * Renders a table cell with the given data, importance level, and header status
 *
 * @param {string | number} data - The data to be displayed in the table cell
 * @param {ImportanceIndex} importance - The importance level of the table cell
 * @returns {JSX.Element} The rendered table cell
 */
const TableCell = ({
  data,
  importance = newImportanceIndex(3),
  isHeader = false
}: TableCellProps): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';

  return (
    <td
      className={`${importanceStyle} ${
        isHeader ? 'border-b-4 border-b-messiah-blue' : ''
      } p-2 text-center`}
    >
      {data}
    </td>
  );
};

export default TableCell;
