import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * A custom hook that provides persistent state using localStorage.
 *
 * @param {string} key - The key used to store the value in localStorage.
 * @param {T} initialValue - The initial value of the state.
 * @returns {[T, Dispatch<SetStateAction<T>>]} - An array containing the current state value and a function to update the state value.
 */
const usePersistentState = <T>(
  key: string,
  initialValue: T,
  deserialize?: (value: string) => T,
): [T, Dispatch<SetStateAction<T>>] => {
  // Set the initial value of the state
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== 'null' && storedValue !== null) {
      if (deserialize) {
        return deserialize(JSON.parse(storedValue));
      }
      return JSON.parse(storedValue);
    }
    return initialValue;
  });

  // Update localStorage on update
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default usePersistentState;
