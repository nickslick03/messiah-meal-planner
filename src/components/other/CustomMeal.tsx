import { useState, useContext } from 'react';
import { GiMeal } from 'react-icons/gi';
import Button from '../form_elements/Button';
import CustomMealAddModal from '../modals/CustomMealAddModal';
import { CustomMealsCtx } from '../../static/context';
import { v4 as uuid } from 'uuid';

/**
 * Renders a Custom Meal button and Modal.
 */
const CustomMeal = () => {
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
          customMeals.setValue([
            ...customMeals.value,
            { location, name, price, isCustom: true, id: uuid() }
          ]);
          setIsAddingCustomMeal(false);
        }}
        onCancel={() => setIsAddingCustomMeal(false)}
        visible={isAddingCustomMeal}
      />
    </>
  );
};

export default CustomMeal;
