import Meal from '../../../types/Meal';
import { newImportanceIndex } from '../../../types/ImportanceIndex';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { Fragment, useState } from 'react';
import Notification from '../../other/Notification';

interface MealTableProps {
  data: Array<Meal>;
  buttonIcon?: JSX.Element;
  buttonTitle?: string;
  sortedBy?: string;
  buttonOnClick: (meal: Meal) => void;
  createNotification: ((name: string) => string);
}

/**
 * Renders a table component for displaying meal data with an optional button
 *
 * @param {Array<Meal>} data - The array of meal objects to be displayed in the table
 * @param {string} buttonTitle - The title of the optional button column
 * @param {JSX.Element} buttonIcon - The icon for the optional button
 * @param {string} sortedBy - The column to sort the table by
 * @param {(Meal) => void} buttonOnClick - The click event handler for the optional button
 * @param {(string) => string} notificationMessage - A function that takes in the meal name and returns the notification message when the meal button is clicked.
 * @return {JSX.Element} The rendered table component
 */
const MealTable = ({
  data,
  buttonIcon,
  buttonTitle,
  sortedBy,
  buttonOnClick,
  createNotification,
}: MealTableProps): JSX.Element => {
  const headers = ['Location', 'Name', 'Price', buttonTitle ?? null];
  if (sortedBy === undefined) {
    sortedBy = headers[0] as string;
  }

  // The notification message
  const [message, setMessage] = useState({text: ''});

  const handleButtonClick = (row: Meal) => {
    buttonOnClick(row);
    setMessage({text: createNotification(row.name)});
  }

  return (
    <>
    <div className={`overflow-y-scroll flex-grow max-h-[400px] w-full ${data.length > 0 ? '' : 'hidden'}`}>
      <table className='w-full [&_tr>td:nth-child(-n+2)]:text-left [&_tr>td:nth-child(n+3)]:text-right'>
        {/* Table header */}
        <thead>
          <tr>
            {headers.map((header, index) =>
              header !== null ? (
                <TableCell
                  key={index}
                  data={header}
                  importance={newImportanceIndex(header === sortedBy ? 5 : 4)}
                  isHeader={true}
                />
              ) : (
                <Fragment key={index}></Fragment>
              )
            )}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              data={row}
              buttonIcon={buttonIcon}
              buttonOnClick={() => handleButtonClick(row)}
            />
          ))}
        </tbody>
      </table>
    </div>
    <p className={`p-6 text-gray-400 ${data.length > 0 ? 'hidden' : ''}`}>No meals to display.</p>
    <Notification message={message}/>
    </>
  );
};

export default MealTable;
