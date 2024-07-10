import React, { useEffect, useRef, useState } from 'react';

/**
 * Props for the Highlighter component.
 */
interface HighlighterProps {
  /**
   * The index of the selected day in the day selector.
   */
  selectedIndex: number;

  /**
   * The id of the day selector.
   */
  daySelectorId: string;
}

/**
 * Highlighter component that highlights the selected day in a day selector by creating a div that follows the selected day button.
 *
 * @param props - The props for the Highlighter component.
 * @param props.selectedIndex - The index of the selected day in the day selector.
 * @param props.daySelectorId - The id of the day selector.
 * @returns The Highlighter component with a div that follows the selected day button.
 */
const Highlighter: React.FC<HighlighterProps> = ({
  selectedIndex,
  daySelectorId
}: HighlighterProps) => {
  const [highlightStyle, setHighlightStyle] = useState<{
    top: number;
    height: number;
    width: number;
    left: number;
  }>({ top: 0, height: 0, width: 0, left: 0 });
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = document.getElementById(
      `dayselector-${daySelectorId}-${selectedIndex}`
    );
    const daySelector = document.getElementById(daySelectorId);
    if (button && highlightRef.current && daySelector) {
      const buttonRect = button.getBoundingClientRect();
      const parentRect = daySelector.getBoundingClientRect();
      if (buttonRect && parentRect) {
        setHighlightStyle({
          top: buttonRect.top - parentRect.top,
          height: buttonRect.height,
          width: buttonRect.width,
          left: buttonRect.left - parentRect.left
        });
      }
    }
  }, [daySelectorId, selectedIndex]);

  return (
    <div className='absolute inset-0 pointer-events-none'>
      <div
        ref={highlightRef}
        className={`absolute bg-messiah-light-blue rounded-lg transition-all duration-300 z-0`}
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
