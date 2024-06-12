import SectionContainer from '../containers/SectionContainer';
import MealTable from '../containers/table/MealTable';
import Button from '../form_elements/Button';
import React, { useState } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import SortingModal from '../modals/SortingModal';
import Meal from '../../types/Meal';

interface MealContainerProps {
  title?: string;
  daySelector?: React.ReactNode;
  addOrRemove?: string;
  customMeal?: boolean;
  children?: React.ReactNode;
  meals: Meal[];
  buttonOnClick: (meal: Meal) => unknown;
  createNotification: (name: string) => string;
  onCustomClick?: (data: Meal) => void;
  newCustomMealID?: string;
}

// Default column
const DEFAULT_COLUMN = 'Location';
const DEFAULT_DIRECTION = true;

/**
 * A Container for sections with a meal table. Additional children of the section go under the meal table.
 * @param {string} title The title of the section
 * @param {React.ReactNode} daySelector The day selector for the section, if applicable
 * @param {string} addOrRemove A string denoting whether the side buttons are add or remove buttons. Defaults to 'add'.
 * @param {React.ReactNode} children The children of the section.
 * @param {Meal[]} meals The list of meals to display
 * @param {(index: Meal) => unkown} buttonOnClick Handle the add or remove button click
 * @param {(string) => string} notificationMessage - A function that takes in the meal name and returns the notification message when the meal button is clicked.
 * @param {() => void} onCustomClick - The click event handler for editing a custom meal
 * @param {string | undefined} newCustomMealID - The ID of the newly added custom meal to scroll to
 * @return {JSX.Element} The Available Meals section component.
 */
const MealContainer = ({
  title,
  daySelector,
  addOrRemove = 'Add',
  children = '',
  meals,
  buttonOnClick,
  createNotification,
  onCustomClick,
  newCustomMealID
}: MealContainerProps) => {
  // State variable to determine whether or not the sorting modal should be open
  const [isSorting, setIsSorting] = useState(false);

  // State variable to store sort direction
  // true = ascending, false = descending
  const [sortDirection, setSortDirection] = useState(DEFAULT_DIRECTION);

  // State variable to store sort column
  const [sortColumn, setSortColumn] = useState(DEFAULT_COLUMN);

  return (
    <SectionContainer title={title}>
      {daySelector ?? <></>}
      <div className='absolute top-0 right-0'>
        <Button
          icon={sortDirection ? <FaSortAmountUp /> : <FaSortAmountDown />}
          onClick={() => {
            setIsSorting(true);
          }}
        />
      </div>
      <MealTable
        data={meals}
        buttonTitle={addOrRemove}
        buttonIcon={addOrRemove === 'Add' ? <IoAdd /> : <IoRemove />}
        sortedBy={sortColumn}
        sortDirection={sortDirection}
        buttonOnClick={buttonOnClick}
        createNotification={createNotification}
        onCustomClick={onCustomClick}
        newCustomMealID={newCustomMealID}
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
      {children}
    </SectionContainer>
  );
};

export default MealContainer;
