import React, { useEffect, useRef, useState, useCallback } from 'react';

interface HighlighterProps {
  selectedIndex: number;
  daySelectorId: string;
  offsetTop?: number; // Optional offset for top
  offsetLeft?: number; // Optional offset for left
}

/**
 * Component for highlighting the selected day in a day selector
 * @param {number} selectedIndex - Index of the selected day
 * @param {string} daySelectorId - ID of the day selector
 * @param {number} [offsetTop=0] - Optional offset for top
 * @param {number} [offsetLeft=0] - Optional offset for left
 * @returns {JSX.Element} The Highlighter component
 */
const Highlighter: React.FC<HighlighterProps> = ({
  selectedIndex,
  daySelectorId,
  offsetTop = 0, // Default to 0 if not provided
  offsetLeft = 0 // Default to 0 if not provided
}) => {
  const [highlightStyle, setHighlightStyle] = useState<{
    top: number;
    height: number;
    width: number;
    left: number;
  }>({ top: 0, height: 0, width: 0, left: 0 });
  const highlightRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    updateHighlightPosition();
    window.addEventListener('resize', updateHighlightPosition);
    return () => {
      window.removeEventListener('resize', updateHighlightPosition);
    };
  }, [updateHighlightPosition]);

  return (
    <div className='absolute inset-0 pointer-events-none z-0'>
      <div
        ref={highlightRef}
        className='absolute bg-messiah-light-blue rounded-lg transition-all duration-300 z-6'
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
