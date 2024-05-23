import Select from '../form_elements/Select';
import Input from '../form_elements/Input';
import { Dispatch, SetStateAction } from 'react';

interface CustomMealAddModalProps {
  locations: string[];
  setLocation: Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

/**
 * Renders a modal component for adding a custom meal.
 *
 * @param {Dispatch<SetStateAction<string>>} setLocation - The function to set the location of the meal.
 * @param {Dispatch<SetStateAction<number>>} setPrice - The function to set the price of the meal.
 * @param {Dispatch<SetStateAction<string>>} setName - The function to set the name of the meal.
 * @param {string} name - The name of the meal.
 * @param {number} price - The price of the meal.
 * @param {string[]} locations - All possible meal locations.
 * @returns {JSX.Element} The rendered CustomMealAddModal component.
 */
const CustomMealAddModal = ({
  locations,
  setLocation,
  price,
  setPrice,
  name,
  setName
}: CustomMealAddModalProps) => {
  return (
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
  );
};

export default CustomMealAddModal;
