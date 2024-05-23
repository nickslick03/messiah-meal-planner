import Select from '../form_elements/Select';
import Input from '../form_elements/Input';
import { Dispatch, SetStateAction } from 'react';
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
 * @returns {JSX.Element} The rendered CustomMealAddModal component.
 */
const CustomMealAddModal = ({
  locations,
  visible,
  onConfirm,
  onCancel
}: CustomMealAddModalProps) => {
  // Default values
  const DEFAULT_LOCATION = locations[0];
  const DEFAULT_PRICE = 0;
  const DEFAULT_NAME = '';

  // State variables for use in adding a custom meal
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [name, setName] = useState(DEFAULT_NAME);

  return visible ? (
    <ModalContainer
      title='Add Custom Meal'
      confirmText='Add'
      onConfirm={() => {
        onConfirm(location, name, price);
        setLocation(DEFAULT_LOCATION);
        setPrice(DEFAULT_PRICE);
        setName(DEFAULT_NAME);
      }}
      onCancel={() => {
        onCancel();
        setLocation(DEFAULT_LOCATION);
        setPrice(DEFAULT_PRICE);
        setName(DEFAULT_NAME);
      }}
    >
      <form className='flex flex-col mt-4 gap-4'>
        <Select label='Location:' list={locations} setSelected={setLocation} />
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
