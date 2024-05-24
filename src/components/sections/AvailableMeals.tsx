import SectionContainer from '../containers/SectionContainer';
import MealTable from '../containers/table/MealTable';
import Button from '../form_elements/Button';
import { useState } from 'react';
import CustomMealAddModal from '../modals/CustomMealAddModal';
import { IoAdd } from 'react-icons/io5';
import { GiMeal } from 'react-icons/gi';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import SortingModal from '../modals/SortingModal';

// List of dining locations
const locations = ['Lottie', 'Union', 'Falcon', 'Vending'];

// Default column
const DEFAULT_COLUMN = 'Location';
const DEFAULT_DIRECTION = true;

/**
 * Renders the Available Meals section with a table of meals to add and a button
 * to add a custom meal. Displays the add custommeal modal when the button is clicked.
 *
 * @return {JSX.Element} The Available Meals section component.
 */
const AvailableMeals = () => {
  // State variable to determine whether or not the custom meal modal should be open
  const [isAddingCustomMeal, setIsAddingCustomMeal] = useState(false);

  // State variable to determine whether or not the sorting modal should be open
  const [isSorting, setIsSorting] = useState(false);

  // State variable to store sort direction
  // true = ascending, false = descending
  const [sortDirection, setSortDirection] = useState(DEFAULT_DIRECTION);

  // State variable to store sort column
  const [sortColumn, setSortColumn] = useState(DEFAULT_COLUMN);

  return (
    <SectionContainer title='Available Meals'>
      <div className='absolute top-0 right-0'>
        <Button
          icon={sortDirection ? <FaSortAmountUp /> : <FaSortAmountDown />}
          onClick={() => {
            setIsSorting(true);
          }}
        />
      </div>
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
        sortedBy={sortColumn}
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
      <SortingModal
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onConfirm={(newSortColumn: string, newSortDirection: boolean) => {
          setSortColumn(newSortColumn);
          setSortDirection(newSortDirection);
          setIsSorting(false);
        }}
        onCancel={() => setIsSorting(false)}
        visible={isSorting}
      />
    </SectionContainer>
  );
};

export default AvailableMeals;
