import React from 'react';
import { IMPORTANCE_CLASSES } from '../../lib/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../types/ImportanceIndex';

interface InputProps {
  label: string;
  importance?: ImportanceIndex;
  type: React.HTMLInputTypeAttribute;
  validator?: (value: string) => boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Renders an input element
 * @param {string}label The text next to the input
 * @param {ImportanceIndex}importance The boldness of the label text
 * @param {React.HTMLInputTypeAttribute}type The input type
 * @param {(value: string) => boolean}validator An optional function that only allows inputs that return true in the validator function
 * @param {string}value The value of the input
 * @param {string}setValue The react state setter to track the value
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

  return (
    <label
      className={`${importanceStyle} flex flex-row flex-wrap w-full gap-2 items-center`}
    >
      {label}
      {type == 'checkbox' ? (
        <input
          className={`${styles} w-8 h-8`}
          type={type}
          value={value as string}
          onChange={(e) => setValue(e.target.checked.toString())}
        />
      ) : (
        <input
          className={styles}
          type={type}
          value={value as string}
          onChange={(e) =>
            validator(e.target.value) ? setValue(e.target.value) : ''
          }
        />
      )}
    </label>
  );
};

export default Input;
