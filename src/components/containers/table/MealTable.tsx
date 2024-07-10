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

interface MealTableProps {
  data: Array<Meal>;
  buttonIcon?: JSX.Element;
  buttonTitle?: string;
  buttonOnClick: (meal: Meal) => void;
  createNotification: (name: string) => string;
  onCustomClick?: (data: Meal) => void;
  newCustomMealID?: string;
  searchable?: boolean;
}

const MealTable = ({
  data,
  buttonIcon,
  buttonTitle,
  buttonOnClick,
  createNotification,
  onCustomClick,
  newCustomMealID,
  searchable = true
}: MealTableProps): JSX.Element => {
  const headers = ['Place', 'Name', 'Price', buttonTitle ?? null];
  const [sortDirection, setSortDirection] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortBy>('Place');
  const [searchKey, setSearchKey] = useState<string | null>('');
  const [customOnly, setCustomOnly] = useState(false);
  const [message, setMessage] = useState({ text: '' });

  const handleButtonClick = (row: Meal) => {
    buttonOnClick(row);
    setMessage({ text: createNotification(row.name) });
  };

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

  const handleSortClick = (header: SortBy) => {
    setSortColumn(header);
    setSortDirection(sortColumn === header ? !sortDirection : true);
  };

  const daySelectorId = `dayselector-${uuid()}`;

  return (
    <div id={daySelectorId} className='relative w-full'>
      <div
        className={`${
          data.length === 0 ? 'hidden' : ''
        } mt-4 mb-1 flex gap-2 items-center w-full relative`}
      >
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
            />
          </div>
          <div className='text-sm h-full bg-gray-300 rounded-lg flex flex-row relative z-5'>
            <button
              id={`dayselector-${daySelectorId}-0`}
              onClick={() => setCustomOnly(false)}
              className={`relative flex flex-row items-center justify-center h-full rounded-lg p-[5px] sm:hover:bg-messiah-light-blue-hover sm:active:bg-messiah-light-blue-active bg-transparent transition duration-50 z-20`}
            >
              <FaListUl className='p-2' size={30} />
              <span className='hidden sm:inline'>All&nbsp;</span>
            </button>
            <button
              id={`dayselector-${daySelectorId}-1`}
              onClick={() => setCustomOnly(true)}
              className={`relative flex flex-row items-center justify-center h-full rounded-lg p-[5px] sm:hover:bg-messiah-light-blue-hover sm:active:bg-messiah-light-blue-active bg-transparent transition duration-50 z-20`}
            >
              <FaUser className='p-2' size={30} />
              <span className='hidden sm:inline'>Custom Only&nbsp;</span>
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
        <table className='w-full [&_tr>td:nth-child(-n+2)]:text-left [&_tr>td:nth-child(n+3)]:text-right relative'>
          <thead className='sticky top-0 bg-white drop-shadow-dark'>
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
          <tbody>
            {filteredAndSortedData.map((row, index) => (
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
      <p
        className={`p-6 text-gray-400 ${
          filteredAndSortedData.length > 0 ? 'hidden' : ''
        }`}
      >
        {data.length === 0
          ? 'No meals to display.'
          : 'Your search returned no results.'}
      </p>
      <Notification message={message} />
    </div>
  );
};

export default MealTable;
