import React from 'react';
import { IMPORTANCE_CLASSES } from '../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../types/ImportanceIndex';

interface SelectProps {
  /**
   * The label text for the select dropdown.
   */
  label: string;

  /**
   * The importance level of the label text.
   */
  importance?: ImportanceIndex;

  /**
   * The list of options for the select dropdown.
   */
  list: readonly string[];

  /**
   * The value of the selected option.
   */
  value: string;

  /**
   * The function to set the selected option.
   */
  setSelected: React.Dispatch<React.SetStateAction<string>>;

  /**
   * If true, the options tags will have the styling of a header tag and the border of the
   * select tag will be removed.
   */
  isTitle?: boolean;

  /**
   * The CSS classes to apply to the select dropdown.
   */
  cssClasses?: string;
}

/**
 * Renders a select form element
 *
 * @param {SelectProps} props - The props for the Select component.
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
