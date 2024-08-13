import { useMemo, useState } from 'react';
import camelify from '../../lib/titleToCamel';
import tooltipData, { TooltipObject } from '../../static/tooltip';
import ModalContainer from '../containers/ModalContainer';
import { Dispatch, SetStateAction } from 'react';

interface TooltipModalProps {
  /**
   * The tooltip to display.
   */
  tooltip?: TooltipObject;

  /**
   * Whether or not the modal is visible.
   */
  tooltipVisible: boolean;

  /**
   * The function to set whether or not the modal is visible.
   */
  setTooltipVisible: Dispatch<SetStateAction<boolean>>;
}

/**
 * Component for displaying a tooltip modal.
 *
 * @param {TooltipModalProps} props - The props for the component.
 * @returns {JSX.Element} The tooltip modal component.
 */
const TooltipModal = ({
  tooltip,
  tooltipVisible,
  setTooltipVisible: setTooltipVisible
}: TooltipModalProps) => {
  // State for the current tooltip
  const [currentTooltip, setCurrentTooltip] = useState(tooltip);

  /**
   * Event handler for when the cancel button is clicked.
   * Sets the tooltip visible state to false and resets the current tooltip to the passed in tooltip.
   */
  const handleCancel = () => {
    setTooltipVisible(false);
    setCurrentTooltip(tooltip);
  };

  /**
   * Event handler for when the confirm button is clicked.
   * If the current tooltip is not the last tooltip, sets the current tooltip to the next tooltip.
   */
  const handleConfirm = () => {
    if (currentIndex === Object.keys(tooltipData).length - 1) {
      return;
    }

    setCurrentTooltip(Object.values(tooltipData)[currentIndex + 1]);
  };

  /**
   * Memoized value for the index of the current tooltip
   */
  const currentIndex = useMemo(
    () =>
      Object.keys(tooltipData).indexOf(camelify(currentTooltip?.title ?? '')),
    [currentTooltip]
  );

  /**
   * Memoized value for whether or not the current tooltip is the last tooltip
   */
  const isLastTooltip = useMemo(
    () => currentIndex === Object.keys(tooltipData).length - 1,
    [currentIndex]
  );

  return (
    tooltipVisible && (
      <ModalContainer
        title={currentTooltip?.title}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        cancelText='Close'
        confirmText='Next'
        confirmDisabled={isLastTooltip}
        centered={false}
      >
        <div className='flex justify-center mb-4'>
          {/* Render the text of the tooltip */}
          {currentTooltip?.images?.small && (
            <img
              src={currentTooltip?.images?.small}
              alt={currentTooltip?.title}
              className={'block sm:hidden'}
            />
          )}
          {currentTooltip?.images?.large && (
            <img
              src={currentTooltip?.images?.large}
              alt={currentTooltip?.title}
              className={'hidden sm:block max-w-lg'}
            />
          )}
        </div>
        {currentTooltip?.text}
      </ModalContainer>
    )
  );
};

export default TooltipModal;
