import { Fragment, useMemo, useState } from 'react';
import { FaListUl, FaUser } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import Highlighter from '../../other/Highlighter';
import Input from '../../form_elements/Input';
import Notification from '../../other/Notification';
import TableCell from './TableCell';
import TableRow from './TableRow';
import sortMeals from '../../../lib/sortMeals';
import { filterMeals } from '../../../lib/filterMeals';
import { newImportanceIndex } from '../../../types/ImportanceIndex';
import SortBy from '../../../types/SortBy';
import Meal from '../../../types/Meal';
import { Weekday } from '../../../types/userSelectedMealsObject';

interface MealTableProps {
  /**
   * The array of Meal objects to be displayed in the table
   */
  data: Array<Meal>;

  /**
   * The icon for the optional button
   */
  buttonIcon?: JSX.Element;

  /**
   * The title of the optional button column
   */
  buttonTitle?: string;

  /**
   * The click event handler for the optional button
   * @param {Meal} meal - The meal object to be filtered
   */
  buttonOnClick: (meal: Meal) => void;

  /**
   * The click event handler for the optional day button
   * @param {Weekday} day - The day of the week
   * @param {Meal} meal - The meal object to be filtered
   */
  buttonOnClickDay?: (day: Weekday, meal: Meal) => void;

  /**
   * A function that takes in the meal name and returns the notification message
   * @param {string} name - The name of the meal
   * @returns {string} The notification message
   */
  createNotification: (name: string) => string;

  /**
   * A function that takes in the meal name and returns the notification message for adding direct to day
   * @param {Weekday} day - The day of the week
   * @param {string} name - The name of the meal
   * @returns {string} The notification message
   */
  createDayNotification?: (day: Weekday, name: string) => string;

  /**
   * The click event handler for editing a custom meal
   * @param {Meal} data - The meal object to be edited
   */
  onCustomClick?: (data: Meal) => void;

  /**
   * The ID of the newly added custom meal to scroll to
   */
  newCustomMealID?: string;

  /**
   * Whether the table should be searchable
   */
  searchable?: boolean;
}

/**
 * Renders a table component for displaying meal data with an optional button
 *
 * @param {MealTableProps} props - The props for the MealTable component
 * @return {JSX.Element} The rendered table component
 */
const MealTable = ({
  data,
  buttonIcon,
  buttonTitle,
  buttonOnClick,
  buttonOnClickDay,
  createNotification,
  createDayNotification,
  onCustomClick,
  newCustomMealID,
  searchable = true
}: MealTableProps): JSX.Element => {
  const headers = ['Place', 'Name', 'Price', buttonTitle ?? null];

  /**
   * State variable to store sort direction
   */
  const [sortDirection, setSortDirection] = useState(true);

  /**
   * State variable to store sort column
   */
  const [sortColumn, setSortColumn] = useState<SortBy>('Place');

  /**
   * State variable to store search key
   */
  const [searchKey, setSearchKey] = useState<string | null>('');

  /**
   * State variable to store whether only custom meals should be displayed
   */
  const [customOnly, setCustomOnly] = useState(false);

  /**
   * State variable to store notification message.
   */
  const [message, setMessage] = useState({ text: '' });

  /**
   * Creates a notification on button click
   * @param row - The meal object to be filtered
   */
  const handleButtonClick = (row: Meal) => {
    buttonOnClick(row);
    setMessage({ text: createNotification(row.name) });
  };

  /**
   * Creates a notification on a direct to day button click
   * @param day - The day of the week
   * @param row - The meal object to be filtered
   */
  const handleDayButtonClick = (day: Weekday, row: Meal) => {
    buttonOnClickDay?.(day, row);
    setMessage({
      text: createDayNotification ? createDayNotification(day, row.name) : ''
    });
  };

  /**
   * Filters and sorts the meal data based on the search key and sort direction
   */
  const filteredAndSortedData = useMemo(() => {
    const customFilteredMeals = customOnly
      ? data.filter((meal) => meal.isCustom)
      : data;
    const filteredMeals =
      searchKey !== ''
        ? filterMeals(customFilteredMeals, searchKey as string)
        : customFilteredMeals;
    return sortMeals(
      sortMeals(filteredMeals, 'Name', true),
      sortColumn || 'Place',
      sortDirection
    );
  }, [data, sortColumn, sortDirection, searchKey, customOnly]);

  /**
   * Set sort column and sort direction
   * @param header - The column to sort by
   */
  const handleSortClick = (header: SortBy) => {
    setSortColumn(header);
    setSortDirection(sortColumn === header ? !sortDirection : true);
  };

  /**
   * The HTML ID of the day selector
   */
  const daySelectorId = `dayselector-${uuid()}`;

  return (
    <>
      <div id={daySelectorId} className='relative w-full'>
        <div
          className={`${
            data.length === 0 ? 'hidden' : ''
          } mt-4 mb-1 flex gap-2 items-center w-full relative`}
        >
          {/* Search bar */}
          <div
            className={
              searchable
                ? 'w-full flex flex-row gap-2 items-center relative'
                : 'hidden'
            }
          >
            <div className='flex-grow'>
              <Input
                type='text'
                value={searchKey}
                setValue={setSearchKey}
                validator={(s) => s}
                placeholder='Search for meals...'
                cssClasses='w-full border-[2px] border-messiah-blue rounded-lg p-2 px-3 h-full'
                clearable={true}
              />
            </div>

            {/* Custom meal filter */}
            <div className='text-sm h-full bg-gray-300 rounded-lg flex relative z-5'>
              <button
                id={`dayselector-${daySelectorId}-0`}
                onClick={() => setCustomOnly(false)}
                className={`relative flex flex-row items-center justify-center h-full rounded-lg p-[5px] ${
                  customOnly
                    ? 'sm:hover:bg-messiah-light-blue-hover'
                    : 'bg-transparent hover:bg-transparent active:bg-transparent'
                } transition duration-50 z-20`}
              >
                <FaListUl className='p-2' size={30} />
                <span className='hidden sm:inline'>All&nbsp;</span>
              </button>
              <button
                id={`dayselector-${daySelectorId}-1`}
                onClick={() => setCustomOnly(true)}
                className={`relative flex flex-row items-center justify-center h-full rounded-lg p-[5px] ${
                  customOnly
                    ? 'bg-transparent hover:bg-transparent active:bg-transparent'
                    : 'sm:hover:bg-messiah-light-blue-hover'
                } transition duration-50 z-20`}
              >
                <FaUser className='p-2' size={30} />
                <span className='hidden sm:inline text-nowrap'>
                  Custom Only&nbsp;
                </span>
              </button>
            </div>
            <Highlighter
              selectedIndex={customOnly ? 1 : 0}
              daySelectorId={daySelectorId}
              offsetTop={-16}
            />
          </div>
        </div>
        <div
          className={`overflow-y-scroll flex-grow max-h-[400px] w-full ${
            filteredAndSortedData.length > 0 ? '' : 'hidden'
          }`}
        >
          <table className='w-full [&_tr>td:nth-child(-n+2)]:text-left [&_tr>td:nth-child(n+3)]:text-center relative'>
            {/* Table header */}
            <thead className='sticky top-0 bg-white drop-shadow-dark z-20'>
              <tr>
                {headers.map((header, index) =>
                  header !== null ? (
                    <TableCell
                      key={index}
                      data={header}
                      importance={newImportanceIndex(
                        header === sortColumn ? 5 : 4
                      )}
                      isHeader={true}
                      onCustomClick={
                        !['Add', 'Del'].includes(header)
                          ? () => handleSortClick(header as SortBy)
                          : undefined
                      }
                      sortState={
                        header !== sortColumn ? 0 : sortDirection ? 1 : 2
                      }
                    />
                  ) : (
                    <Fragment key={index}></Fragment>
                  )
                )}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {filteredAndSortedData.map((row, index) => (
                <TableRow
                  key={index}
                  data={row}
                  buttonIcon={buttonIcon}
                  buttonOnClick={() => handleButtonClick(row)}
                  buttonOnClickDay={(day: Weekday) =>
                    handleDayButtonClick(day, row)
                  }
                  onCustomClick={onCustomClick}
                  newCustomMealID={newCustomMealID}
                />
              ))}
            </tbody>
          </table>
        </div>
        <p
          className={`p-6 w-full flex items-center justify-center text-gray-400 ${
            filteredAndSortedData.length > 0 ? 'hidden' : ''
          }`}
        >
          {data.length === 0
            ? 'No meals to display.'
            : 'Your search returned no results.'}
        </p>
      </div>
      <Notification message={message} />
    </>
  );
};

export default MealTable;
