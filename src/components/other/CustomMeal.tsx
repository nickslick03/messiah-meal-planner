import React, { useState, useContext } from 'react';
import { GiMeal } from 'react-icons/gi';
import Button from '../form_elements/Button';
import CustomMealAddModal from '../modals/CustomMealAddModal';
import { CustomMealsCtx } from '../../static/context';
import { v4 as uuid } from 'uuid';

interface CustomMealProps {
  /** Setter for newly added custom meals */
  setNewCustomMealID: React.Dispatch<React.SetStateAction<string | undefined>>;
}

/**
 * Renders a Custom Meal button and Modal.
 *
 * @param {CustomMealProps} props - Props for the CustomMeal component.
 * @returns {JSX.Element} The CustomMeal component.
 */
const CustomMeal = ({ setNewCustomMealID }: CustomMealProps) => {
  const customMeals = useContext(CustomMealsCtx);

  /**
   * State variable to determine whether or not the custom meal modal should be open
   */
  const [isAddingCustomMeal, setIsAddingCustomMeal] = useState(false);

  return (
    <>
      <Button
        title='Custom Meal'
        icon={<GiMeal />}
        onClick={() => setIsAddingCustomMeal(true)}
      />
      <CustomMealAddModal
        onConfirm={(location, name, price) => {
          const newCustomMeal = {
            location,
            name,
            price,
            isCustom: true,
            id: uuid()
          };
          customMeals.setValue([...customMeals.value, newCustomMeal]);
          setIsAddingCustomMeal(false);
          setNewCustomMealID(newCustomMeal.id);
        }}
        onCancel={() => setIsAddingCustomMeal(false)}
        visible={isAddingCustomMeal}
      />
    </>
  );
};

export default CustomMeal;
