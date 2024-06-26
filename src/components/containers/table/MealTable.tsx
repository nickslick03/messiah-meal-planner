import Meal from '../../../types/Meal';
import { newImportanceIndex } from '../../../types/ImportanceIndex';
import TableRow from './TableRow';
import TableCell from './TableCell';
import { Fragment } from 'react';

interface MealTableProps {
  data: Array<Meal>;
  buttonIcon?: JSX.Element;
  buttonTitle?: string;
  sortedBy?: string;
  buttonOnClick: (meal: Meal) => void;
}

/**
 * Renders a table component for displaying meal data with an optional button
 *
 * @param {Array<Meal>} data - The array of meal objects to be displayed in the table
 * @param {string} buttonTitle - The title of the optional button column
 * @param {JSX.Element} buttonIcon - The icon for the optional button
 * @param {string} sortedBy - The column to sort the table by
 * @param {(Meal) => void} buttonOnClick - The click event handler for the optional button
 * @return {JSX.Element} The rendered table component
 */
const MealTable = ({
  data,
  buttonIcon,
  buttonTitle,
  sortedBy,
  buttonOnClick
}: MealTableProps): JSX.Element => {
  const headers = ['Location', 'Name', 'Price', buttonTitle ?? null];
  if (sortedBy === undefined) {
    sortedBy = headers[0] as string;
  }
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
            buttonOnClick={() => buttonOnClick(row)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MealTable;
