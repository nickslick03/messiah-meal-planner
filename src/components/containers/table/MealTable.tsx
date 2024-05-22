import Meal from '../../../types/Meal';
import { newImportanceIndex } from '../../../types/ImportanceIndex';
import TableRow from './TableRow';
import TableCell from './TableCell';
import React from 'react';

interface MealTableProps {
  data: Array<Meal>;
  buttonTitle?: string;
  buttonOnClick?: () => void;
}

/**
 * Renders a table component for displaying meal data with an optional button
 *
 * @param {Array<Meal>} data - The array of meal objects to be displayed in the table
 * @param {string} buttonTitle - The title of the optional button
 * @param {() => void} buttonOnClick - The click event handler for the optional button
 * @return {JSX.Element} The rendered table component
 */
const MealTable = ({
  data,
  buttonTitle,
  buttonOnClick
}: MealTableProps): JSX.Element => {
  const headers = ['Location', 'Name', 'Price', buttonTitle ?? null];
  return (
    <table className='w-full'>
      {/* Table header */}
      <thead>
        <tr>
          {headers.map((header, index) =>
            header !== null ? (
              <TableCell
                key={index}
                data={header}
                importance={newImportanceIndex(5)}
                isHeader={true}
              />
            ) : (
              <React.Fragment key={index}></React.Fragment>
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
            buttonTitle={buttonTitle}
            buttonOnClick={buttonOnClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MealTable;
