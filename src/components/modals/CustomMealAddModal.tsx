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
  /**
   * Whether or not the modal is visible.
   */
  visible: boolean;

  /**
   * Event handler for when the confirm button is clicked.
   *
   * @param {string} location - The location of the custom meal.
   * @param {string} name - The name of the custom meal.
   * @param {number} price - The price of the custom meal.
   */
  onConfirm: (location: string, name: string, price: number) => void;

  /**
   * Event handler for when the cancel button is clicked.
   */
  onCancel: () => void;

  /**
   * Event handler for when the delete button is clicked (optional).
   */
  onDelete?: () => void;

  /**
   * The starting data for the modal (optional).
   */
  startingData?: Meal;
}

/**
 * Renders a modal component for adding a custom meal.
 *
 * @param {CustomMealAddModalProps} props - The props for the CustomMealAddModal component.
 * @returns {JSX.Element} The rendered CustomMealAddModal component.
 */
const CustomMealAddModal = ({
  visible,
  onConfirm,
  onCancel,
  onDelete,
  startingData
}: CustomMealAddModalProps) => {
  const DEFAULT_LOCATION = 'Select Place...';
  const DEFAULT_PRICE = null;
  const DEFAULT_NAME = null;

  /**
   * State for the location of the custom meal.
   */
  const [location, setPlace] = useState(
    startingData?.location ?? DEFAULT_LOCATION
  );

  /**
   * State for the price of the custom meal.
   */
  const [price, setPrice] = useState<number | null>(
    startingData?.price ?? DEFAULT_PRICE
  );

  /**
   * State for the name of the custom meal.
   */
  const [name, setName] = useState<string | null>(
    startingData?.name ?? DEFAULT_NAME
  );

  /**
   * Resets the modal state.
   */
  const resetState = () => {
    setPlace(DEFAULT_LOCATION);
    setPrice(DEFAULT_PRICE);
    setName(DEFAULT_NAME);
  };

  /**
   * Checks whether the form is incomplete.
   */
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
      zIndex={55}
    >
      <div className='flex flex-col mt-4 gap-4'>
        <Select
          label='Place:'
          list={['Select Place...', ...DINING_LOCATIONS]}
          value={location}
          setSelected={setPlace}
        />
        <Input
          label='Meal Name:'
          type='text'
          value={name}
          setValue={setName}
          validator={(str) => (str.length > 0 && str.match(/\S/) ? str : null)}
          invalidMessage={'Meal name cannot be empty.'}
        />
        <Input
          label='Price:'
          type='number'
          value={price}
          setValue={setPrice}
          validator={(str) =>
            !isNaN(parseFloat(str)) && parseFloat(str) > 0
              ? parseFloat(str)
              : null
          }
          invalidMessage={'Price must be a positive number.'}
        />
        {startingData && (
          <Button
            onClick={onDelete ?? (() => {})}
            style='bg-messiah-red border-messiah-red hover:bg-messiah-red-hover hover:border-messiah-red-hover active:bg-messiah-red-active active:border-messiah-red-active text-white  transition duration-50'
            icon={<FaTrash />}
            title='Delete Meal'
          ></Button>
        )}
      </div>
    </ModalContainer>
  ) : (
    <></>
  );
};

export default CustomMealAddModal;
