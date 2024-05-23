import { useState } from 'react';
import ModalContainer from '../containers/ModalContainer';
import Select from '../form_elements/Select';
import Button from '../form_elements/Button';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

interface SortingModalProps {
  visible: boolean;
  onConfirm: (sortColumn: string, sortDirection: boolean) => void;
  onCancel: () => void;
}

export const DEFAULT_COLUMN = 'Location';
export const DEFAULT_DIRECTION = true;

const SortingModal = ({
  visible = false,
  onConfirm,
  onCancel
}: SortingModalProps): JSX.Element => {
  const [sortColumn, setSortColumn] = useState(DEFAULT_COLUMN);
  const [sortDirection, setSortDirection] = useState(DEFAULT_DIRECTION);

  return visible ? (
    <ModalContainer
      title='Sort Options'
      confirmText='Sort'
      onConfirm={() => {
        onConfirm(sortColumn, sortDirection);
      }}
      onCancel={onCancel}
      confirmDisabled={false}
    >
      <form className='flex flex-col mt-4 gap-4'>
        <Select
          label='Sort By'
          list={['Location', 'Name', 'Price']}
          setSelected={setSortColumn}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setSortDirection(!sortDirection);
          }}
          icon={sortDirection ? <FaSortAmountUp /> : <FaSortAmountDown />}
          title={sortDirection ? 'Ascending' : 'Descending'}
        />
      </form>
    </ModalContainer>
  ) : (
    <></>
  );
};

export default SortingModal;
