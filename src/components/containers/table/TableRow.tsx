import { newImportanceIndex } from '../../../types/ImportanceIndex';
import Meal from '../../../types/Meal';
import ButtonCell from './ButtonCell';
import TableCell from './TableCell';
import formatCurrency from '../../../lib/formatCurrency';

interface TableRowProps {
  data: Meal;
  buttonTitle?: string;
  buttonOnClick?: () => void;
}

/**
 * Renders a table row with data and an optional button
 *
 * @param {Meal} data - The data for the table row
 * @param {string} buttonTitle - The title for the button
 * @param {() => void} buttonOnClick - The click event handler for the button
 * @return {JSX.Element} The rendered table row.
 */
const TableRow = ({
  data,
  buttonTitle,
  buttonOnClick
}: TableRowProps): JSX.Element => (
  <tr>
    <TableCell data={data.location} importance={newImportanceIndex(1)} />
    <TableCell data={data.name} importance={newImportanceIndex(3)} />
    <TableCell
      data={formatCurrency(data.price)}
      importance={newImportanceIndex(3)}
    />
    {buttonTitle && buttonOnClick ? (
      <ButtonCell title={buttonTitle} onClick={buttonOnClick} />
    ) : (
      <></>
    )}
  </tr>
);

export default TableRow;
