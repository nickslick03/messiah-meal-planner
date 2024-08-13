import { RefObject, useEffect } from 'react';

/**
 * Hook that triggers a callback when a click occurs outside a specified element.
 *
 * @param ref - Reference to the HTMLElement to detect clicks outside of.
 * @param onClickOutside - Callback function to trigger when a click occurs outside the element.
 */
const useClickOutside = (
  ref: RefObject<HTMLElement>,
  onClickOutside: () => void
) => {
  /**
   * Triggers a callback when a click occurs outside the specified element.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
