import { useState, useMemo } from 'react';
import ModalContainer from '../containers/ModalContainer';
import Select from '../form_elements/Select';
import Button from '../form_elements/Button';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

interface SortingModalProps {
  sortColumn: string;
  sortDirection: boolean;
  visible: boolean;
  onConfirm: (sortColumn: string, sortDirection: boolean) => void;
  onCancel: () => void;
}

const SortingModal = ({
  visible = false,
  onConfirm,
  onCancel,
  sortColumn,
  sortDirection
}: SortingModalProps): JSX.Element => {
  const [selectedSortColumn, setSelectedSortColumn] = useState(sortColumn);
  const [selectedSortDirection, setSelectedSortDirection] =
    useState(sortDirection);

  // Function to check if the form is incomplete
  const isIncomplete = useMemo(
    () =>
      selectedSortColumn === sortColumn &&
      selectedSortDirection === sortDirection,
    [selectedSortColumn, sortColumn, selectedSortDirection, sortDirection]
  );

  return visible ? (
    <ModalContainer
      title='Sort Options'
      confirmText='Sort'
      onConfirm={() => {
        onConfirm(selectedSortColumn, selectedSortDirection);
      }}
      onCancel={() => {
        setSelectedSortColumn(sortColumn);
        setSelectedSortDirection(sortDirection);
        onCancel();
      }}
      confirmDisabled={isIncomplete}
    >
      <form className='flex flex-col mt-4 gap-4'>
        <Select
          label='Sort By'
          list={['Location', 'Name', 'Price']}
          value={selectedSortColumn}
          setSelected={setSelectedSortColumn}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setSelectedSortDirection(!selectedSortDirection);
          }}
          icon={
            selectedSortDirection ? <FaSortAmountUp /> : <FaSortAmountDown />
          }
          title={selectedSortDirection ? 'Ascending' : 'Descending'}
        />
      </form>
    </ModalContainer>
  ) : (
    <></>
  );
};

export default SortingModal;
