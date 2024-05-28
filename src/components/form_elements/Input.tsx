import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  HTMLInputTypeAttribute
} from 'react';
import { IMPORTANCE_CLASSES } from '../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../types/ImportanceIndex';

interface InputProps {
  label: string;
  importance?: ImportanceIndex;
  type: HTMLInputTypeAttribute;
  validator?: (value: string) => boolean;
  value: string | boolean | number;
  setValue: Dispatch<SetStateAction<string | boolean | number>>;
}

/**
 * Renders an input component with a label and handles input changes. Can be any type of input.
 *
 * @param {string} label - The label for the input.
 * @param {ImportanceIndex} importance - The importance level of the input.
 * @param {React.HTMLInputTypeAttribute} type - The type of the input.
 * @param {(value: string) => boolean} validator - The validator function for the input value.
 * @param {string | boolean | number} value - The value of the input.
 * @param {React.Dispatch<React.SetStateAction<string | boolean | number>>} setValue - The function to update the input value.
 * @returns {JSX.Element} The rendered input component.
 */
const Input = ({
  label,
  importance = newImportanceIndex(3),
  type = 'text',
  validator = () => true,
  value,
  setValue
}: InputProps): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';
  const styles =
    'border border-black rounded focus:outline focus:outline-2 focus:outline-messiah-blue';

  /**
   * Handles the change event of an input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      setValue(e.target.checked);
    } else {
      let newValue =
        type === 'number' ? parseFloat(e.target.value) : e.target.value;
      if (typeof newValue === 'number' && isNaN(newValue)) newValue = ''; // Allows blank values for number types

      if (validator(newValue.toString())) {
        setValue(newValue);
      } else {
        setValue(value);
      }
    }
  };

  return (
    <label
      className={`${importanceStyle} w-fit flex flex-row flex-wrap gap-2 items-center`}
    >
      {label}
      {type === 'checkbox' ? (
        <input
          className={`${styles} p-0 h-6 w-6`}
          type={type}
          checked={value as boolean}
          onChange={handleChange}
        />
      ) : (
        <input
          className={styles}
          type={type}
          value={value as string | number}
          inputMode={type === 'number' ? 'numeric' : undefined}
          onChange={handleChange}
        />
      )}
    </label>
  );
};

export default Input;
