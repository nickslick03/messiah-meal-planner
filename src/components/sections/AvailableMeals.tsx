import ModalContainer from '../containers/ModalContainer';
import SectionContainer from '../containers/SectionContainer';
import MealTable from '../containers/table/MealTable';
import Button from '../form_elements/Button';
import { useState } from 'react';
import CustomMealAddModal from '../modals/CustomMealAddModal';

/**
 * Renders the Available Meals section with a table of meals to add and a button
 * to add a custom meal. Displays the add custommeal modal when the button is clicked.
 *
 * @return {JSX.Element} The Available Meals section component.
 */
const AvailableMeals = () => {
  const [isAddingCustomMeal, setIsAddingCustomMeal] = useState(false);

  return (
    <SectionContainer title='Available Meals'>
      <MealTable
        // Temporary AI-generated data, will be replaced with real data later on...apparently
        // my extension really likes fries:)
        data={[
          {
            location: 'Home',
            name: 'Cheeseburger and Fries',
            price: 12.99
          },
          {
            location: 'Work',
            name: 'Hamburger and Fries',
            price: 10.99
          },
          {
            location: 'School',
            name: 'Pizza and Fries',
            price: 11.99
          },
          {
            location: 'Home',
            name: 'Salad and Fries',
            price: 9.99
          },
          {
            location: 'Work',
            name: 'Pasta and Fries',
            price: 12.99
          }
        ]}
        buttonTitle='+'
        buttonOnClick={() => {}}
      />
      <Button title='Custom Meal' onClick={() => setIsAddingCustomMeal(true)} />
      {isAddingCustomMeal ? (
        <ModalContainer
          title='Add Custom Meal'
          confirmText='Add'
          onConfirm={() => {}}
          onCancel={() => setIsAddingCustomMeal(false)}
        >
          <CustomMealAddModal />
        </ModalContainer>
      ) : (
        <></>
      )}
    </SectionContainer>
  );
};

export default AvailableMeals;
