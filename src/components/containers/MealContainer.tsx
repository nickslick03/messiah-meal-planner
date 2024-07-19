import SectionContainer from '../containers/SectionContainer';
import MealTable from '../containers/table/MealTable';
import React from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import Meal from '../../types/Meal';
import { TooltipObject } from '../../static/tooltip';
import { Weekday } from '../../types/userSelectedMealsObject';

interface MealContainerProps {
  title?: string;
  daySelector?: React.ReactNode;
  addOrRemove?: string;
  customMeal?: boolean;
  children?: React.ReactNode;
  meals: Meal[];
  buttonOnClick: (meal: Meal) => unknown;
  buttonOnClickDay?: (day: Weekday, meal: Meal) => void;
  createNotification: (name: string) => string;
  createDayNotification?: (day: Weekday, name: string) => string;
  onCustomClick?: (data: Meal) => void;
  setRef?: (ref: HTMLElement | null) => void;
  newCustomMealID?: string;
  searchable?: boolean;
  tooltip?: TooltipObject;
}

/**
 * A Container for sections with a meal table. Additional children of the section go under the meal table.
 * @param {string} title The title of the section
 * @param {React.ReactNode} daySelector The day selector for the section, if applicable
 * @param {string} addOrRemove A string denoting whether the side buttons are add or remove buttons. Defaults to 'add'.
 * @param {React.ReactNode} children The children of the section.
 * @param {Meal[]} meals The list of meals to display
 * @param {(index: Meal) => unkown} buttonOnClick Handle the add or remove button click
 * @param {(day: Weekday, meal: Meal) => void} buttonOnClickDay - The click event handler for the day button
 * @param {() => string} createNotification - A function that takes in the meal name and returns the notification message
 * @param {() => string} createDayNotification - A function that takes in the meal name and returns the notification message for adding direct to day
 * @param {() => void} onCustomClick - The click event handler for editing a custom meal
 * @param {string | undefined} newCustomMealID - The ID of the newly added custom meal to scroll to
 * @param {boolean} searchable - Whether the table should be searchable
 * @param {TooltipObject} tooltip - The tooltip object for the section
 * @return {JSX.Element} The Available Meals section component.
 */
const MealContainer = ({
  title,
  daySelector,
  addOrRemove = 'Add',
  children = '',
  meals,
  buttonOnClick,
  buttonOnClickDay,
  createNotification,
  createDayNotification,
  onCustomClick,
  setRef = () => {},
  newCustomMealID,
  searchable = true,
  tooltip,
}: MealContainerProps) => {
  return (
    <SectionContainer title={title} tooltip={tooltip} setRef={setRef}>
      {daySelector ?? <></>}
      <MealTable
        data={meals}
        buttonTitle={addOrRemove}
        buttonIcon={addOrRemove === 'Add' ? <IoAdd /> : <IoRemove />}
        buttonOnClick={buttonOnClick}
        buttonOnClickDay={buttonOnClickDay}
        createNotification={createNotification}
        createDayNotification={createDayNotification}
        onCustomClick={onCustomClick}
        newCustomMealID={newCustomMealID}
        searchable={searchable}
      />
      {children}
    </SectionContainer>
  );
};

export default MealContainer;
