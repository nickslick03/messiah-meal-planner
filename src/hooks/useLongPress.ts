import { useEffect, useRef } from 'react';

/**
 * A hook that detects a long press event on a component.
 *
 * @param {function} onLongPress - The function to be called when the long press event is detected
 * @param {function} [onClick] - The function to be called when the component is clicked (optional)
 * @param {number} [delay=300] - The delay in milliseconds before the long press event is detected (optional, default is 300)
 * @returns {object} An object with two properties: `onMouseDown` and `onMouseUp`. These should be passed to the component as props.
 */
const useLongPress = (
  onLongPress: () => void,
  onClick?: () => void,
  delay = 300
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handleMouseDown = () => {
    isLongPress.current = false; // Reset the flag
    timer.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress();
      if ('vibrate' in navigator) {
        navigator.vibrate(100); // Vibrate for 100 milliseconds
      }
    }, delay);
  };

  const handleMouseUp = () => {
    // No action on mouse up for short clicks
  };

  const handleTouchStart = () => {
    isLongPress.current = false; // Reset the flag
    timer.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress();
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
    }, delay);
  };

  const handleTouchEnd = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      if (!isLongPress.current && onClick) {
        onClick(); // Call onClick only if it wasn't a long press
      }
    }
  };

  const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
    // Prevent onClick from firing if it's a long press
    if (isLongPress.current) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onClick: handleClick
  };
};

export default useLongPress;
