import Select from '../form_elements/Select';
import Input from '../form_elements/Input';
import { useState } from 'react';
import Button from '../form_elements/Button';

/**
 * Renders a modal component for adding a custom meal.
 *
 * @return {JSX.Element} The rendered CustomMealAddModal component.
 */
const CustomMealAddModal = () => {
  // Define state for each input
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');

  // TODO: Push this to the meal queue context
  const handleClick = () => {
    console.log(name);
    console.log(price);
    console.log(location);
  };

  return (
    <form className='flex flex-col mt-4 gap-4'>
      <Select
        label='Location:'
        list={['Lottie', 'Union', 'Falcon', 'Vending']}
        setSelected={setLocation}
      />
      <Input label='Meal Name:' type='text' value={name} setValue={setName} />
      <Input
        label='Price:'
        type='number'
        value={price}
        setValue={setPrice}
        validator={(str) =>
          (!isNaN(parseFloat(str)) && parseFloat(str) >= 0) || str === ''
        }
      />
      <Button title='Add' onClick={handleClick} />
    </form>
  );
};

export default CustomMealAddModal;
