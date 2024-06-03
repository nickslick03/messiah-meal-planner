import { newImportanceIndex } from '../../../types/ImportanceIndex';
import Meal from '../../../types/Meal';
import ButtonCell from './ButtonCell';
import TableCell from './TableCell';
import formatCurrency from '../../../lib/formatCurrency';

interface TableRowProps {
  data: Meal;
  buttonIcon?: JSX.Element;
  buttonOnClick?: () => void;
}

/**
 * Renders a table row with data and an optional button
 *
 * @param {Meal} data - The data for the table row
 * @param {JSX.Element} buttonIcon - The icon for the button
 * @param {() => void} buttonOnClick - The click event handler for the button
 * @return {JSX.Element} The rendered table row.
 */
const TableRow = ({
  data,
  buttonIcon,
  buttonOnClick
}: TableRowProps): JSX.Element => (
  <tr>
    <TableCell data={data.location} importance={newImportanceIndex(1)} />
    <TableCell data={data.name} importance={newImportanceIndex(2)} />
    <TableCell
      data={formatCurrency(data.price)}
      importance={newImportanceIndex(2)}
    />
    {buttonIcon && buttonOnClick ? (
      <ButtonCell icon={buttonIcon} onClick={buttonOnClick} />
    ) : (
      <></>
    )}
  </tr>
);

export default TableRow;
