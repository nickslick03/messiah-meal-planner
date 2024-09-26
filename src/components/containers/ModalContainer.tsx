import { useState } from 'react';
import SectionHeader from './SectionHeader';
import Button from '../form_elements/Button';

interface ModalContainerProps {
  /**
   * Child component(s) to display in the modal
   */
  children?: React.ReactNode;

  /**
   * Title of the modal
   */
  title?: string | null;

  /**
   * Text to display on the confirm button
   */
  confirmText?: string;

  /**
   * Text to display on the cancel button
   */
  cancelText?: string;

  /**
   * Event handler for when the confirm button is clicked
   */
  onConfirm?: () => void;

  /**
   * Event handler for when the cancel button is clicked
   */
  onCancel?: () => void;

  /**
   * boolean for whether the confirm button is disabled
   */
  confirmDisabled?: boolean;

  /**
   * boolean for whether the modal content should be centered
   */
  centered?: boolean;

  /**
   * boolean for whether the modal should only have the width and height of its children
   */
  minimalSpace?: boolean;

  /**
   * if true, only the cancel button is shown
   */
  onlyCancel?: boolean;

  /**
   * If specificed, sets the z-index of the modal
   */
  zIndex?: number;
}

/**
 * Renders a modal with a confirm and cancel button
 *
 * @param {ModalContainerProps} props - props for the ModalContainer
 * @returns {JSX.Element} JSX for rendering a modal
 */
const ModalContainer = ({
  children = <></>,
  title = null,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  confirmDisabled = true,
  centered = true,
  minimalSpace = false,
  onlyCancel = false,
  zIndex = 50,
}: ModalContainerProps): JSX.Element => {
  // Keep track of whether or not the modal is visible
  const [isVisible, setIsVisible] = useState(true);

  // Toggle the visibility of the modal
  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  // By default, clicking either button dismisses the modal by making it render nothing
  // This can be changed by pasing in an onConfirm or onCancel function
  const handleConfirm = onConfirm || toggleVisible;
  const handleCancel = onCancel || toggleVisible;

  return (
    <div
      className={`${
        isVisible ? '' : 'hidden'
      } h-screen w-screen bg-opacity-50 bg-slate-900 
        fixed top-0 left-0 flex items-center justify-center`}
      style={{
        zIndex
      }}
    >
      {/* The actual modal component */}
      <div
        className={`text-center bg-white p-5 m-4 flex flex-col rounded-lg
          ${
            minimalSpace
              ? ''
              : 'w-full h-[80%] sm:w-auto sm:h-auto sm:min-w-[500px] sm:min-h-[500px] sm:max-w-[800px] sm:max-h-screen'
          }`}
      >
        {
          /* Title goes here */
          title !== null && title !== undefined ? (
            <SectionHeader text={title} />
          ) : (
            <></>
          )
        }
        {/* Content goes here */}
        <div
          className={`flex-grow flex flex-col 
              ${minimalSpace ? '' : 'overflow-y-scroll'}
              ${
                centered
                  ? 'justify-center'
                  : 'justify-start align-center text-left'
              } mt-4`}
        >
          {children}
        </div>
        {/* Confirm and cancel buttons */}
        <div className='flex-shrink flex flex-row justify-center'>
          {!onlyCancel ? (
            <Button
              title={confirmText}
              onClick={handleConfirm}
              disabled={confirmDisabled}
            />
          ) : (
            ''
          )}
          <Button title={cancelText} onClick={handleCancel} frame />
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
