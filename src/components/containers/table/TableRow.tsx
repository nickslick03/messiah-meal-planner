import { newImportanceIndex } from '../../../types/ImportanceIndex';
import Meal from '../../../types/Meal';
import ButtonCell from './ButtonCell';
import TableCell from './TableCell';
import formatCurrency from '../../../lib/formatCurrency';
import { useState, useContext } from 'react';
import CustomMealAddModal from '../../modals/CustomMealAddModal';
import { CustomMealsCtx } from '../../../static/context';

interface TableRowProps {
  data: Meal;
  buttonIcon?: JSX.Element;
  buttonOnClick?: () => void;
  includeCustomEditor?: boolean;
}

/**
 * Renders a table row with data and an optional button
 *
 * @param {Meal} data - The data for the table row
 * @param {JSX.Element} buttonIcon - The icon for the button
 * @param {() => void} buttonOnClick - The click event handler for the button
 * @param {boolean} includeCustomEditor - Whether or not to include the custom meal editor
 * @return {JSX.Element} The rendered table row.
 */
const TableRow = ({
  data,
  buttonIcon,
  buttonOnClick,
  includeCustomEditor
}: TableRowProps): JSX.Element => {
  // State variable to determine whether or not the custom meal modal should be open
  const [isEditingCustomMeal, setIsEditingCustomMeal] = useState(false);

  // Load custom meals context
  const customMeals = useContext(CustomMealsCtx);

  /**
   * Updates a custom meal in the customMeals context with the provided location, name, and price.
   *
   * @param {string} location - The new location for the custom meal.
   * @param {string} name - The new name for the custom meal.
   * @param {number} price - The new price for the custom meal.
   * @return {void} This function does not return anything.
   */
  const onUpdateCustomMeal = (
    location: string,
    name: string,
    price: number
  ) => {
    customMeals.setValue(
      customMeals.value.map((val) =>
        val.id === data.id ? { ...val, location, name, price } : val
      )
    );
    setIsEditingCustomMeal(false);
  };

  return (
    <>
      <CustomMealAddModal
        startingData={data}
        onConfirm={onUpdateCustomMeal}
        onCancel={() => {
          setIsEditingCustomMeal(false);
        }}
        onDelete={() => {
          customMeals.setValue(
            customMeals.value.filter((val) => val.id !== data.id)
          );
          setIsEditingCustomMeal(false);
        }}
        visible={isEditingCustomMeal}
      />
      {/* Table row */}
      <tr>
        <TableCell data={data.location} importance={newImportanceIndex(1)} />
        <TableCell
          data={data.name}
          isCustom={data.isCustom && includeCustomEditor}
          importance={newImportanceIndex(2)}
          onCustomClick={() => setIsEditingCustomMeal(true)}
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
