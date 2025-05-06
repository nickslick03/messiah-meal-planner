import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  HTMLInputTypeAttribute,
  useMemo,
  useState,
  useRef
} from 'react';
import { IMPORTANCE_CLASSES } from '../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../types/ImportanceIndex';
import { dateToString } from '../../lib/dateCalcuation';
import { MdClear } from 'react-icons/md';
import { IconContext } from 'react-icons';

interface InputProps<T> {
  /**
   * The label for the input.
   */
  label?: string;

  /**
   * The importance level of the input.
   */
  importance?: ImportanceIndex;

  /**
   * The type of the input.
   */
  type: HTMLInputTypeAttribute;

  /**
   * The validator function for the input value. Returns the new value if valid, null otherwise.
   * @param value - The value to validate.
   * @returns The validated value or null.
   */
  validator: (value: string) => T | null;

  /**
   * The value of the input.
   */
  value: T | null;

  /**
   * The function to update the input value.
   */
  setValue: Dispatch<SetStateAction<T | null>>;

  /**
   * The message to display when the input is invalid.
   */
  invalidMessage?: string;

  /**
   * The placeholder text for the input.
   */
  placeholder?: string;

  /**
   * The styles to apply to the input.
   */
  cssClasses?: string;

  /**
   * Whether the input should be clearable.
   */
  clearable?: boolean;
}

/**
 * Renders an input component with a label and handles input changes. Can be any type of input.
 *
 * @param {InputProps} props - The props for the Input component.
 * @returns {JSX.Element} The rendered input component.
 */
const Input = <T,>({
  label,
  importance = newImportanceIndex(3),
  type = 'text',
  validator,
  value,
  setValue,
  invalidMessage,
  placeholder = '',
  cssClasses,
  clearable
}: InputProps<T>): JSX.Element => {
  const importanceStyle = IMPORTANCE_CLASSES[importance] ?? 'font-normal';
  const styles = `border border-black rounded focus:outline focus:outline-2 
  dark:bg-gray-500 dark:outline-none dark:border-transparent
    ${
      type === 'number'
        ? 'w-16 text-right px-1'
        : type === 'text'
        ? 'w-40 px-1'
        : ''
    } ${cssClasses ?? ''}`;

  /** The initial value of the input. */
  const initialValue =
    value === null
      ? ''
      : value instanceof Date
      ? dateToString(value)
      : value!.toString();

  /** Controls showing the invalid if the user has previously entered data and the current value is invalid. */
  const [showInvalid, setShowInvalid] = useState(false);

  /** The title attribute of the input tag. */
  const titleAttribute = useMemo(
    () => (label ? label.replace(/[^(\s|\w)]/g, '').trim() : 'input'),
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
    } else {
      newValue = validator(e.target.value);
      setValue(newValue);
    }
    setShowInvalid(newValue === null);
  };

  /**
   * Clears the input value.
   */
  const clearInput = () => {
    const nothing = (
      typeof value === 'boolean'
        ? false
        : typeof value === 'string'
        ? ''
        : typeof value === 'number'
        ? 0
        : null
    ) as T | null;
    setValue(nothing);
    if (ref.current) ref.current.value = '';
  };

  /** Create ref to input element. */
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className='text-left w-full'>
      <label
        className={`${importanceStyle} ${
          styles.includes('w-full') ? 'w-full' : 'w-max'
        } flex flex-row flex-wrap gap-2 items-center relative`}
      >
        {label || ''}
        {type === 'checkbox' ? (
          <input
            className={`${styles} p-0 h-6 w-6`}
            type={type}
            defaultChecked={initialValue === 'true'}
            onInput={handleChange}
            title={titleAttribute}
          />
        ) : (
          <>
            <input
              ref={ref}
              className={styles}
              type={type}
              defaultValue={initialValue}
              inputMode={type === 'number' ? 'decimal' : undefined}
              onInput={handleChange}
              title={titleAttribute}
              placeholder={placeholder}
            />
            {clearable && (
              <button
                className='w-5 h-5 rounded absolute right-2'
                onClick={clearInput}
              >
                <IconContext.Provider
                  value={{
                    className:
                      'w-full h-full fill-gray-300 hover:fill-gray-500 active:fill-gray-700'
                  }}
                >
                  <MdClear />
                </IconContext.Provider>
              </button>
            )}
          </>
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
