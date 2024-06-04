import React, { useState, useContext } from 'react';
import { GiMeal } from 'react-icons/gi';
import Button from '../form_elements/Button';
import CustomMealAddModal from '../modals/CustomMealAddModal';
import { CustomMealsCtx } from '../../static/context';
import { v4 as uuid } from 'uuid';

interface CustomMealProps {
  setNewCustomMealID: React.Dispatch<React.SetStateAction<string | undefined>>;
}

/**
 * Renders a Custom Meal button and Modal.
 * @param {React.SetStateAction<Meal | undefined>} setNewCustomMeal Setter for newly added custom meals
 */
const CustomMeal = ({
  setNewCustomMealID
}: CustomMealProps) => {
  // State variable to determine whether or not the custom meal modal should be open
  const [isAddingCustomMeal, setIsAddingCustomMeal] = useState(false);

  // Load custom meals context
  const customMeals = useContext(CustomMealsCtx);

  return (
    <>
      <Button
        title='Custom Meal'
        icon={<GiMeal />}
        onClick={() => setIsAddingCustomMeal(true)}
      />
      <CustomMealAddModal
        onConfirm={(location, name, price) => {
          const newCustomMeal = { location, name, price, isCustom: true, id: uuid() };
          customMeals.setValue([
            ...customMeals.value,
            newCustomMeal
          ]);
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
