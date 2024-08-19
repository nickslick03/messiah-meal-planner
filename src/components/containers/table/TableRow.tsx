import { newImportanceIndex } from '../../../types/ImportanceIndex';
import Meal from '../../../types/Meal';
import ButtonCell from './ButtonCell';
import TableCell from './TableCell';
import formatCurrency from '../../../lib/formatCurrency';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { MealPlanCtx } from '../../../static/context';
import { applyDiscount } from '../../../lib/calculationEngine';
import { Weekday } from '../../../types/userSelectedMealsObject';

interface TableRowProps {
  /**
   * The data for the table row
   */
  data: Meal;

  /**
   * The icon for the button
   */
  buttonIcon?: JSX.Element;

  /**
   * The click event handler for the button
   */
  buttonOnClick?: () => void;

  /**
   * The click event handler for the day button
   *
   * @param {Weekday} day - The day of the week
   */
  buttonOnClickDay?: (day: Weekday) => void;

  /**
   * The click event handler for editing a custom meal
   *
   * @param {Meal} data - The data for the table row
   */
  onCustomClick?: (data: Meal) => void;

  /**
   * The ID of the newly added custom meal to be scrolled to
   */
  newCustomMealID?: string;
}

/**
 * Renders a table row with data and an optional button
 *
 * @param {TableRowProps} props - The properties for the table row
 * @return {JSX.Element} The rendered table row.
 */
const TableRow = ({
  data,
  buttonIcon,
  buttonOnClick,
  buttonOnClickDay,
  onCustomClick,
  newCustomMealID
}: TableRowProps): JSX.Element => {
  const isMealPlan = useContext(MealPlanCtx);

  /**
   * The price of the meal based on whether or not the DD meal plan discount is enabled
   */
  const price = useMemo(
    () => (isMealPlan.value ? applyDiscount(data) : data.price * 0.9),
    [data, isMealPlan.value]
  );

  /**
   * Reference to the table row element
   */
  const tr = useRef<HTMLTableRowElement>(null);

  /**
   * Scrolls to the newly added custom meal
   */
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
      <tr ref={tr}>
        <TableCell data={data.location} importance={newImportanceIndex(1)} />
        <TableCell
          data={data.name}
          isCustom={data.isCustom}
          importance={newImportanceIndex(2)}
          onCustomClick={
            onCustomClick !== undefined && data.isCustom
              ? () => onCustomClick(data)
              : undefined
          }
        />
        <TableCell
          data={formatCurrency(price)}
          importance={newImportanceIndex(2)}
        />
        {buttonIcon && buttonOnClick ? (
          <ButtonCell
            icon={buttonIcon}
            onClick={buttonOnClick}
            onClickDay={buttonOnClickDay}
            meal={data}
          />
        ) : (
          <></>
        )}
      </tr>
    </>
  );
};

export default TableRow;
