import SectionContainer from '../containers/SectionContainer';
import MealTable from '../containers/table/MealTable';
import React from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import Meal from '../../types/Meal';
import { TooltipObject } from '../../static/tooltip';
import { Weekday } from '../../types/userSelectedMealsObject';

interface MealContainerProps {
  /**
   * The title of the section.
   */
  title?: string;

  /**
   * The day selector for the section, if applicable.
   */
  daySelector?: React.ReactNode;

  /**
   * A string denoting whether the side buttons are add or remove buttons. Defaults to 'add'.
   */
  addOrRemove?: string;

  /**
   * The children of the section.
   */
  children?: React.ReactNode;

  /**
   * The list of meals to display.
   */
  meals: Meal[];

  /**
   * The click event handler for the add or remove button.
   *
   * @param {Meal} meal - The meal to be added or removed.
   * @return {unknown} The return value of the function.
   */
  buttonOnClick: (meal: Meal) => unknown;

  /**
   * The click event handler for buttons that add directly to days.
   *
   * @param {Weekday} day - The day to add the meal to.
   * @param {Meal} meal - The meal to be added.
   */
  buttonOnClickDay?: (day: Weekday, meal: Meal) => void;

  /**
   * A function that takes in the meal name and returns the notification message.
   *
   * @param {string} name - The name of the meal.
   * @return {string} The notification message.
   */
  createNotification: (name: string) => string;

  /**
   * A function that takes in the meal name and returns the notification message for adding direct to day.
   *
   * @param {Weekday} day - The day to add the meal to.
   * @param {string} name - The name of the meal.
   * @return {string} The notification message.
   */
  createDayNotification?: (day: Weekday, name: string) => string;

  /**
   * The click event handler for editing a custom meal.
   *
   * @param {Meal} data - The meal data to be edited.
   */
  onCustomClick?: (data: Meal) => void;

  /**
   * The function to set the ref of the section container.
   *
   * @param {HTMLElement | null} ref - The ref to be set.
   */
  setRef?: (ref: HTMLElement | null) => void;

  /**
   * The ID of the newly added custom meal to scroll to.
   */
  newCustomMealID?: string;

  /**
   * Whether the table should be searchable.
   */
  searchable?: boolean;

  /**
   * The tooltip object for the section.
   */
  tooltip?: TooltipObject;

  /**
   * The order this component should appear.
   */
  order?: number;
}

/**
 * A Container for sections with a meal table. Additional children of the section go under the meal table.
 * @param {MealContainerProps} props - The props for the MealContainer component.
 * @returns {JSX.Element} The rendered meal container.
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
  order = 0
}: MealContainerProps) => {
  return (
    <SectionContainer
      title={title}
      tooltip={tooltip}
      setRef={setRef}
      order={order}
    >
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
