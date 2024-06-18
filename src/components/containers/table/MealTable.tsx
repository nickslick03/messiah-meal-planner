import Meal from '../../../types/Meal';
import { newImportanceIndex } from '../../../types/ImportanceIndex';
import TableRow from './TableRow';
import TableCell from './TableCell';
import Notification from '../../other/Notification';
import { Fragment, useMemo, useState } from 'react';
import sortMeals from '../../../lib/sortMeals';
import SortBy from '../../../types/SortBy';

interface MealTableProps {
  data: Array<Meal>;
  buttonIcon?: JSX.Element;
  buttonTitle?: string;
  buttonOnClick: (meal: Meal) => void;
  createNotification: (name: string) => string;
  onCustomClick?: (data: Meal) => void;
  newCustomMealID?: string;
}

/**
 * Renders a table component for displaying meal data with an optional button
 *
 * @param {Array<Meal>} data - The array of meal objects to be displayed in the table
 * @param {string} buttonTitle - The title of the optional button column
 * @param {JSX.Element} buttonIcon - The icon for the optional button
 * @param {(Meal) => void} buttonOnClick - The click event handler for the optional button
 * @param {(string) => string} notificationMessage - A function that takes in the meal name and returns the notification message when the meal button is clicked.
 * @param {() => void} onCustomClick - The click event handler for editing a custom meal
 * @param {string | undefined} newCustomMealID - The ID of the newly added custom meal to scroll to
 * @return {JSX.Element} The rendered table component
 */
const MealTable = ({
  data,
  buttonIcon,
  buttonTitle,
  buttonOnClick,
  createNotification,
  onCustomClick,
  newCustomMealID,
}: MealTableProps): JSX.Element => {
  const headers = ['Location', 'Name', 'Price', buttonTitle ?? null];
  
  /** State variable to store sort direction */ 
  const [sortDirection, setSortDirection] = useState(true);

  /** State variable to store sort column */ 
  const [sortColumn, setSortColumn] = useState<SortBy | ''>('');

  /** The notification message */ 
  const [message, setMessage] = useState({ text: '' });

  const handleButtonClick = (row: Meal) => {
    buttonOnClick(row);
    setMessage({ text: createNotification(row.name) });
  };

  /** The sorted meal list. */
  const sortedData = useMemo(
    () => sortMeals(
      sortMeals(data, 'Name', true), 
      sortColumn || 'Location', 
      sortDirection),
    [data, sortColumn, sortDirection]
  );

  /** Handles the header click which sorts the meal table. */
  const handleSortClick = (header: SortBy) => {
    if (header === sortColumn) {
      setSortColumn(sortDirection ? sortColumn : '');
      setSortDirection(!sortDirection);
    } else {
      setSortColumn(header);
      setSortDirection(true);
    }
  }

  return (
    <>
      <div
        className={`overflow-y-scroll flex-grow max-h-[400px] w-full ${
          data.length > 0 ? '' : 'hidden'
        }`}
      >
        <table className='w-full [&_tr>td:nth-child(-n+2)]:text-left [&_tr>td:nth-child(n+3)]:text-right'>
          {/* Table header */}
          <thead>
            <tr>
              {headers.map((header, index) =>
                header !== null ? (
                  <TableCell
                    key={index}
                    data={header}
                    importance={newImportanceIndex(header === sortColumn ? 5 : 4)}
                    isHeader={true}
                    onCustomClick={
                      !['Add', 'Del'].includes(header)
                      ? () => handleSortClick(header as SortBy)
                      : undefined
                    }
                    sortState={header !== sortColumn ? 0 : sortDirection ? 1 : 2}
                  />
                ) : (
                  <Fragment key={index}></Fragment>
                )
              )}
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {sortedData.map((row, index) => (
              <TableRow
                key={index}
                data={row}
                buttonIcon={buttonIcon}
                buttonOnClick={() => handleButtonClick(row)}
                onCustomClick={onCustomClick}
                newCustomMealID={newCustomMealID}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p className={`p-6 text-gray-400 ${data.length > 0 ? 'hidden' : ''}`}>
        No meals to display.
      </p>
      <Notification message={message} />
    </>
  );
};

export default MealTable;
