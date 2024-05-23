import ModalContainer from '../containers/ModalContainer';
import SectionContainer from '../containers/SectionContainer';
import MealTable from '../containers/table/MealTable';
import Button from '../form_elements/Button';
import { useState } from 'react';
import CustomMealAddModal from '../modals/CustomMealAddModal';

// List of dining locations
const locations = ['Lottie', 'Union', 'Falcon', 'Vending'];

/**
 * Renders the Available Meals section with a table of meals to add and a button
 * to add a custom meal. Displays the add custommeal modal when the button is clicked.
 *
 * @return {JSX.Element} The Available Meals section component.
 */
const AvailableMeals = () => {
  // State variable to determine whether or not the custom meal modal should be open
  const [isAddingCustomMeal, setIsAddingCustomMeal] = useState(false);

  // State variables for use in adding a custom meal
  const [cLocation, setCLocation] = useState(locations[0]);
  const [cPrice, setCPrice] = useState(0);
  const [cName, setCName] = useState('');

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
          onConfirm={() => {
            // TODO: Add logic to add custom meal and probably separate this function out
            console.log(cLocation);
            console.log(cPrice);
            console.log(cName);
            setIsAddingCustomMeal(false);
          }}
          onCancel={() => setIsAddingCustomMeal(false)}
        >
          <CustomMealAddModal
            locations={locations}
            setLocation={setCLocation}
            price={cPrice}
            setPrice={setCPrice}
            name={cName}
            setName={setCName}
          />
        </ModalContainer>
      ) : (
        <></>
      )}
    </SectionContainer>
  );
};

export default AvailableMeals;
