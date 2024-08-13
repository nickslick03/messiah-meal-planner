import { useEffect, useRef, useState, useCallback } from 'react';

interface HighlighterProps {
  /**
   * Index of the selected day
   */
  selectedIndex: number;

  /**
   * ID of the day selector
   */
  daySelectorId: string;

  /**
   * Optional offset for top
   */
  offsetTop?: number;

  /**
   * Optional offset for left
   */
  offsetLeft?: number;
}

/**
 * Component for highlighting the selected day in a day selector
 *
 * @param {HighlighterProps} props - The props for the Highlighter component.
 * @returns {JSX.Element} The Highlighter component
 */
const Highlighter = ({
  selectedIndex,
  daySelectorId,
  offsetTop = 0,
  offsetLeft = 0
}: HighlighterProps) => {
  /**
   * Style for the highlighter, specifically for position
   */
  const [highlightStyle, setHighlightStyle] = useState<{
    top: number;
    height: number;
    width: number;
    left: number;
  }>({ top: 0, height: 0, width: 0, left: 0 });

  /**
   * Reference to the highlight element
   */
  const highlightRef = useRef<HTMLDivElement>(null);

  /**
   * Flag to disable initial render
   */
  const [renderNumber, setRenderNumber] = useState(0);

  /**
   * Update the position of the highlighter
   */
  const updateHighlightPosition = useCallback(() => {
    const button = document.getElementById(
      `dayselector-${daySelectorId}-${selectedIndex}`
    );
    const parent = document.getElementById(daySelectorId);

    if (button && parent && highlightRef.current) {
      const buttonRect = button.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      if (buttonRect && parentRect) {
        setHighlightStyle({
          top: buttonRect.top - parentRect.top + offsetTop,
          height: buttonRect.height,
          width: buttonRect.width,
          left: buttonRect.left - parentRect.left + offsetLeft
        });
      }
    }
  }, [daySelectorId, selectedIndex, offsetTop, offsetLeft]);

  /**
   * Initial render to set position without transition
   */
  useEffect(() => {
    updateHighlightPosition();
    setRenderNumber(renderNumber < 2 ? renderNumber + 1 : renderNumber); // Disable initial render flag
  }, [renderNumber, updateHighlightPosition]);

  /**
   * Enable transition after initial render
   */
  useEffect(() => {
    if (renderNumber >= 2) {
      updateHighlightPosition();
    }
  }, [renderNumber, updateHighlightPosition]);

  /**
   * Update position on resize
   */
  useEffect(() => {
    window.addEventListener('resize', updateHighlightPosition);
    return () => {
      window.removeEventListener('resize', updateHighlightPosition);
    };
  }, [updateHighlightPosition]);

  return (
    <div className='absolute inset-0 pointer-events-none z-0'>
      <div
        ref={highlightRef}
        className={`absolute bg-messiah-light-blue rounded-lg ${
          renderNumber >= 2 ? 'transition-all duration-300' : 'transition-none'
        } z-6`}
        style={{
          top: highlightStyle.top,
          height: highlightStyle.height,
          width: highlightStyle.width,
          left: highlightStyle.left
        }}
      />
    </div>
  );
};

export default Highlighter;
