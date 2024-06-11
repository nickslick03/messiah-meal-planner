import Select from '../form_elements/Select';
import Input from '../form_elements/Input';
import { useMemo } from 'react';
import { useState } from 'react';
import ModalContainer from '../containers/ModalContainer';
import { DINING_LOCATIONS } from '../../static/constants';
import Meal from '../../types/Meal';
import Button from '../form_elements/Button';
import { FaTrash } from 'react-icons/fa';

interface CustomMealAddModalProps {
  visible: boolean;
  onConfirm: (location: string, name: string, price: number) => void;
  onCancel: () => void;
  onDelete?: () => void;
  startingData?: Meal;
}

/**
 * Renders a modal component for adding a custom meal.
 *
 * @param {boolean} visible - Whether or not the modal is visible.
 * @param {(location: string, name: string, price: number) => void} onConfirm - Event handler for when the confirm button is clicked.
 * @param {() => void} onCancel - Event handler for when the cancel button is clicked.
 * @param {() => void} onDelete - Event handler for when the delete button is clicked.
 * @param {Meal | undefined} startingData - The starting data for the modal.
 * @returns {JSX.Element} The rendered CustomMealAddModal component.
 */
const CustomMealAddModal = ({
  visible,
  onConfirm,
  onCancel,
  onDelete,
  startingData
}: CustomMealAddModalProps) => {
  // Default values
  const DEFAULT_LOCATION = 'Select Location...';
  const DEFAULT_PRICE = null;
  const DEFAULT_NAME = null;

  // State variables for use in adding a custom meal
  const [location, setLocation] = useState(
    startingData?.location ?? DEFAULT_LOCATION
  );
  const [price, setPrice] = useState<number | null>(startingData?.price ?? DEFAULT_PRICE);
  const [name, setName] = useState<string | null>(startingData?.name ?? DEFAULT_NAME);

  /** Resets the modal state. */
  const resetState = () => {
    setLocation(DEFAULT_LOCATION);
    setPrice(DEFAULT_PRICE);
    setName(DEFAULT_NAME);
  };

  /** Checks whether the form is incomplete. */
  const isIncomplete = useMemo(
    () => price === null || name === null || location === DEFAULT_LOCATION,
    [price, name, location]
  );

  return visible ? (
    <ModalContainer
      title={`${startingData ? 'Edit' : 'Add'} Custom Meal`}
      confirmText={startingData ? 'Update' : 'Add'}
      onConfirm={() => {
        onConfirm(location, name ?? 'custom meal', price ?? 0);
        resetState();
      }}
      onCancel={() => {
        onCancel();
        resetState();
      }}
      confirmDisabled={isIncomplete}
    >
      <form className='flex flex-col mt-4 gap-4'>
        <Select
          label='Location:'
          list={['Select Location...', ...DINING_LOCATIONS]}
          value={location}
          setSelected={setLocation}
        />
        <Input
          label='Meal Name:'
          type='text'
          value={name}
          setValue={setName}
          validator={(str) => 
            str.length > 0 && str.match(/\S/)
            ? str
            : null
          }
          invalidMessage={'Meal name cannot be empty.'}
        />
        <Input
          label='Price:'
          type='number'
          value={price}
          setValue={setPrice}
          validator={(str) => 
            (!isNaN(parseFloat(str)) && parseFloat(str) > 0)
            ? parseFloat(str)
            : null
          }
          invalidMessage={'Price must be a positive number.'}
        />
        {startingData && (
          <Button
            onClick={onDelete ?? (() => {})}
            style='bg-messiah-red border-messiah-red hover:bg-messiah-red-hover hover:border-messiah-red-hover active:bg-messiah-red-active active:border-messiah-red-active text-white'
            icon={<FaTrash />}
            title='Delete Meal'
          ></Button>
        )}
      </form>
    </ModalContainer>
  ) : (
    <></>
  );
};

export default CustomMealAddModal;
