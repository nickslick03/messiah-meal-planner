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
  /**
   * The timer that will be used to detect the long press event
   */
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * A flag that will be used to detect the long press event
   */
  const isLongPress = useRef(false);

  /**
   * The function that will be called when the long press event is detected
   * Must be triggered by other events, see below calls
   */
  const handleLongPress = () => {
    isLongPress.current = false;
    timer.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress();
      vibrate();
    }, delay);
  };

  /**
   * The function that will be called when the mouse is pressed down
   */
  const handleMouseDown = handleLongPress;

  /**
   * The function that will be called when the touch is started
   */
  const handleTouchStart = handleLongPress;

  /**
   * If supported, vibrate the device
   */
  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  /**
   * The function that will be called when the mouse is released
   * Doesn't do anything currently, we don't need it for this app
   */
  const handleMouseUp = () => {};

  /**
   * The function that will be called when the touch is ended
   */
  const handleTouchEnd = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      if (!isLongPress.current && onClick) {
        onClick();
      }
    }
  };

  /**
   * The function that will be called when the component is clicked (but not long pressed)
   */
  const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
    if (isLongPress.current) {
      event.preventDefault();
    }
  };

  /**
   * Clean up the timer
   */
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
