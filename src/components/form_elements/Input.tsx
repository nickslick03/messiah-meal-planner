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
import { dateToString } from '../../lib/dateCalcuation';
interface InputProps<T> {
  label: string;
  importance?: ImportanceIndex;
  type: HTMLInputTypeAttribute;
  validator: (value: string) => T extends boolean ? T : T | null;
  value: T extends boolean ? T : T | null;
  setValue: Dispatch<SetStateAction<T extends boolean ? T : T | null>>;
  invalidMessage?: string;
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
 * @param {string} invalidMessage - The message to display when the input is invalid.
 * @returns {JSX.Element} The rendered input component.
 */
const Input = <T,>({
  label,
  importance = newImportanceIndex(3),
  type = 'text',
  validator,
  value,
  setValue,
  invalidMessage
}: InputProps<T>): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';
  const styles = `border border-black rounded focus:outline focus:outline-2 focus:outline-messiah-blue 
    ${
      type === 'number'
        ? 'w-16 text-right px-1'
        : type === 'text'
        ? 'w-40 px-1'
        : ''
    }`;

  /** The actual value of input element so the input value may persist even when value is null. */
  const [internalValue, setInternalValue] = useState(
    value === null
      ? ''
      : value instanceof Date
      ? dateToString(value)
      : value!.toString()
  );

  /** Controls showing the invalid if the user has previously entered data and the current value is invalid. */
  const [showInvalid, setShowInvalid] = useState(false);

  /** The title attribute of the input tag. */
  const titleAttribute = useMemo(
    () =>
      label[label.length - 1].match(/[\s:]/)
        ? label.substring(0, label.length - 1)
        : label,
    [label]
  );

  /**
   * Handles the change event of an input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue: typeof value;
    if (type === 'checkbox') {
      newValue = validator(e.target.checked.toString());
      setValue(newValue);
      setInternalValue(e.target.checked.toString());
    } else {
      newValue = validator(e.target.value);
      setValue(newValue);
      setInternalValue(e.target.value);
    }
    setShowInvalid(newValue === null);
  };

  return (
    <div className='text-left'>
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
            inputMode={type === 'number' ? 'decimal' : undefined}
            onChange={handleChange}
            title={titleAttribute}
          />
        )}
      </label>
      <p
        className={`${
          invalidMessage !== undefined && showInvalid ? '' : 'hidden'
        } 
        text-messiah-red text-sm`}
      >
        {invalidMessage}
      </p>
    </div>
  );
};

export default Input;
