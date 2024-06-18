import React from 'react';
import { IMPORTANCE_CLASSES } from '../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../types/ImportanceIndex';

interface SelectProps {
  label: string;
  importance?: ImportanceIndex;
  list: readonly string[];
  value: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  isTitle?: boolean;
  cssClasses?: string;
}

/**
 * Renders a select form element
 * @param {string} label The text next to the select dropdown
 * @param {ImportanceIndex} importance The boldness of the label text
 * @param {boolean} isTitle If true, gives the options tags the styling of a header tag and removes the border of the select tag
 * @param {string[]} list The list of options
 * @param {string} value The value of the selected column
 * @param {React.Dispatch<React.SetStateAction<string>>} setSelected A react state setter to track the selected option
 * @param {boolean} isTitle If true, gives the options tags the styling of a header tag and removes the border of the select tag
 * @param {string} cssClasses The css classes to apply
 * @returns {JSX.Element} The rendered select
 */
const Select = ({
  label,
  isTitle = false,
  importance = newImportanceIndex(3),
  list = [],
  value,
  setSelected,
  cssClasses
}: SelectProps): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';

  return (
    <label
      className={`${
        isTitle ? 'font-bold' : importanceStyle
      } flex flex-wrap w-full gap-2`}
    >
      {label}
      <select
        value={value}
        className={`${
          isTitle ? 'text-2xl' : ''
        } border border-black rounded focus:outline focus:outline-2 focus:outline-messiah-blue ${cssClasses} p-1 relative`}
        onChange={(e) => setSelected(e.target.value)}
      >
        {list.map((opt, i) => (
          <option
            key={i}
            className={`${isTitle ? 'text-center text-base' : ''}`}
          >
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
