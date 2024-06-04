import { newImportanceIndex } from '../../../types/ImportanceIndex';
import Meal from '../../../types/Meal';
import ButtonCell from './ButtonCell';
import TableCell from './TableCell';
import formatCurrency from '../../../lib/formatCurrency';
import { useEffect, useRef } from 'react';

interface TableRowProps {
  data: Meal;
  buttonIcon?: JSX.Element;
  buttonOnClick?: () => void;
  onCustomClick?: (data: Meal) => void;
  newCustomMealID?: string;
}

/**
 * Renders a table row with data and an optional button
 *
 * @param {Meal} data - The data for the table row
 * @param {JSX.Element} buttonIcon - The icon for the button
 * @param {() => void} buttonOnClick - The click event handler for the button
 * @param {() => void} onCustomClick - The click event handler for editing a custom meal
 * @param {string} newCustomMealID - The ID of the newly added custom meal to be scrolled to
 * @return {JSX.Element} The rendered table row.
 */
const TableRow = ({
  data,
  buttonIcon,
  buttonOnClick,
  onCustomClick,
  newCustomMealID,
}: TableRowProps): JSX.Element => {
  /**
   * Updates a custom meal in the customMeals context with the provided location, name, and price.
   *
   * @param {string} location - The new location for the custom meal.
   * @param {string} name - The new name for the custom meal.
   * @param {number} price - The new price for the custom meal.
   * @return {void} This function does not return anything.
   */

  const tr = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (newCustomMealID && data.id === newCustomMealID && tr.current)
      tr.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCustomMealID]);

  return (
    <>
      {/* Table row */}
      <tr ref={tr}>
        <TableCell data={data.location} importance={newImportanceIndex(1)} />
        <TableCell
          data={data.name}
          isCustom={data.isCustom}
          importance={newImportanceIndex(2)}
          onCustomClick={
            onCustomClick !== undefined ? () => onCustomClick(data) : undefined
          }
        />
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
    </>
  );
};

export default TableRow;
