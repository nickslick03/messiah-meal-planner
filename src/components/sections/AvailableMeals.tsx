import SectionContainer from '../containers/SectionContainer';
import MealTable from '../containers/table/MealTable';
import Button from '../form_elements/Button';
import { useState } from 'react';
import CustomMealAddModal from '../modals/CustomMealAddModal';
import { IoAdd } from 'react-icons/io5';
import { GiMeal } from 'react-icons/gi';

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
        buttonTitle='Add'
        buttonIcon={<IoAdd />}
        buttonOnClick={() => {}}
      />
      <Button
        title='Custom Meal'
        icon={<GiMeal />}
        onClick={() => setIsAddingCustomMeal(true)}
      />
      <CustomMealAddModal
        onConfirm={(location, name, price) => {
          console.log(location);
          console.log(name);
          console.log(price);
          setIsAddingCustomMeal(false);
        }}
        onCancel={() => setIsAddingCustomMeal(false)}
        locations={locations}
        visible={isAddingCustomMeal}
      />
    </SectionContainer>
  );
};

export default AvailableMeals;
