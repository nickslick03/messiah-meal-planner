import Select from '../form_elements/Select';
import Input from '../form_elements/Input';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { useState } from 'react';
import ModalContainer from '../containers/ModalContainer';

interface CustomMealAddModalProps {
  locations: string[];
  visible: boolean;
  onConfirm: (location: string, name: string, price: number) => void;
  onCancel: () => void;
}

/**
 * Renders a modal component for adding a custom meal.
 *
 * @param {string[]} locations - All possible meal locations.
 * @param {boolean} visible - Whether or not the modal is visible.
 * @param {(location: string, name: string, price: number) => void} onConfirm - Event handler for when the confirm button is clicked.
 * @param {() => void} onCancel - Event handler for when the cancel button is clicked.
 * @returns {JSX.Element} The rendered CustomMealAddModal component.
 */
const CustomMealAddModal = ({
  locations,
  visible,
  onConfirm,
  onCancel
}: CustomMealAddModalProps) => {
  // Default values
  const DEFAULT_LOCATION = 'Select Location...';
  const DEFAULT_PRICE = 0;
  const DEFAULT_NAME = '';

  // State variables for use in adding a custom meal
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [name, setName] = useState(DEFAULT_NAME);

  // Reset modal state
  const resetState = () => {
    setLocation(DEFAULT_LOCATION);
    setPrice(DEFAULT_PRICE);
    setName(DEFAULT_NAME);
  };

  // Function to check if the form is incomplete
  const isIncomplete = useMemo(
    () =>
      price === 0 ||
      (price as unknown as string) === '' ||
      name === '' ||
      location === 'Select Location...',
    [price, name, location]
  );

  return visible ? (
    <ModalContainer
      title='Add Custom Meal'
      confirmText='Add'
      onConfirm={() => {
        onConfirm(location, name, price);
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
          list={['Select Location...', ...locations]}
          setSelected={setLocation}
        />
        <Input
          label='Meal Name:'
          type='text'
          value={name}
          setValue={
            setName as Dispatch<SetStateAction<string | boolean | number>>
          }
        />
        <Input
          label='Price:'
          type='number'
          value={price}
          setValue={
            setPrice as Dispatch<SetStateAction<string | boolean | number>>
          }
          validator={(str) =>
            (!isNaN(parseFloat(str)) && parseFloat(str) >= 0) || str === ''
          }
        />
      </form>
    </ModalContainer>
  ) : (
    <></>
  );
};

export default CustomMealAddModal;
