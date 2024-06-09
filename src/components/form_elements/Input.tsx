import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  HTMLInputTypeAttribute,
  useMemo,
  useState
} from 'react';
import { IMPORTANCE_CLASSES } from '../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../types/ImportanceIndex';
interface InputProps<T> {
  label: string;
  importance?: ImportanceIndex;
  type: HTMLInputTypeAttribute;
  validator: (value: string) => T extends boolean ? T : T | null;
  value: T extends boolean ? boolean : T | null;
  setValue: Dispatch<SetStateAction<T extends boolean ? T : T | null>>;
}

/**
 * Renders an input component with a label and handles input changes. Can be any type of input.
 *
 * @param {string} label - The label for the input.
 * @param {ImportanceIndex} importance - The importance level of the input.
 * @param {React.HTMLInputTypeAttribute} type - The type of the input.
 * @param {(value: string) => T | null} validator - The validator function for the input value. Returns the new value if valid, null otherwise.
 * @param {string | boolean | number} value - The value of the input.
 * @param {React.Dispatch<React.SetStateAction<T>>} setValue - The function to update the input value.
 * @returns {JSX.Element} The rendered input component.
 */
const Input = <T,>({
  label,
  importance = newImportanceIndex(3),
  type = 'text',
  validator,
  value,
  setValue
}: InputProps<T>): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';
  const styles =
    `border border-black rounded focus:outline focus:outline-2 focus:outline-messiah-blue 
    ${type === 'number' 
      ? 'w-16 text-right px-1'
      : type === 'text'
      ? 'w-40 px-1'
      : ''}`;

  /** The actual value of input element so the input value may persist even when value is null. */
  const [internalValue, setInternalValue] = useState(value !== null ? '' : value!.toString());

  /** The title attribute of the input tag. */
  const titleAttribute = useMemo(() => 
    label[label.length -1].match(/[\s:]/) ? label.substring(0, label.length -1) : label, 
    [label]);

  /**
   * Handles the change event of an input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'checkbox') {
      setValue(validator(e.target.checked.toString()));
      setInternalValue(e.target.checked.toString());
    } else {
      setValue(validator(e.target.value));
      setInternalValue(e.target.value);
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
          checked={internalValue === 'true'}
          onChange={handleChange}
          title={titleAttribute}
        />
      ) : (
        <input
          className={styles}
          type={type}
          value={internalValue}
          inputMode={type === 'number' ? 'numeric' : undefined}
          onChange={handleChange}
          title={titleAttribute}
        />
      )}
    </label>
  );
};

export default Input;
