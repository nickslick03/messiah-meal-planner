import SectionContainer from '../containers/SectionContainer';
import MealTable from '../containers/table/MealTable';
import Button from '../form_elements/Button';
import React, { useState } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import SortingModal from '../modals/SortingModal';
import Meal from '../../types/Meal';

interface MealContainerProps {
  title?: React.ReactNode;
  addOrRemove?: string;
  customMeal?: boolean;
  children?: React.ReactNode;
  meals: Meal[];
  buttonOnClick: (meal: Meal) => unknown;
}

// Default column
const DEFAULT_COLUMN = 'Location';
const DEFAULT_DIRECTION = true;

/**
 * A Container for sections with a meal table. Additional children of the section go under the meal table.
 * @param {string} title The title of the section
 * @param {string} addOrRemove A string denoting whether the side buttons are add or remove buttons. Defaults to 'add'.
 * @param {React.ReactNode} children The children of the section.
 * @param {Meal[]} meals The list of meals to display
 * @param {(index: Meal) => unkown} buttonOnClick Handle the add or remove button click
 * @return {JSX.Element} The Available Meals section component.
 */
const MealContainer = ({
  title,
  addOrRemove = 'Add',
  children = '',
  meals,
  buttonOnClick
}: MealContainerProps) => {
  // State variable to determine whether or not the sorting modal should be open
  const [isSorting, setIsSorting] = useState(false);

  // State variable to store sort direction
  // true = ascending, false = descending
  const [sortDirection, setSortDirection] = useState(DEFAULT_DIRECTION);

  // State variable to store sort column
  const [sortColumn, setSortColumn] = useState(DEFAULT_COLUMN);

  return (
    <SectionContainer title={typeof title === 'string' ? title : ''}>
      {typeof title === 'object' ? title : ''}
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
        data={meals}
        buttonTitle={addOrRemove}
        buttonIcon={addOrRemove === 'Add' ? <IoAdd /> : <IoRemove />}
        sortedBy={sortColumn}
        buttonOnClick={buttonOnClick}
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
