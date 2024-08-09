import { useState } from 'react';
import SectionHeader from './SectionHeader';
import Button from '../form_elements/Button';

// Prop types
interface ModalContainerProps {
  children?: React.ReactNode;
  title?: string | null;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmDisabled?: boolean;
  centered?: boolean;
  minimalSpace?: boolean;
}

/**
 * Renders a modal with a confirm and cancel button
 *
 * @param {JSX.Element} children - Child component(s) to display in the modal
 * @param {string | null} title - Title of the modal
 * @param {string} confirmText - Text to display on the confirm button
 * @param {string} cancelText - Text to display on the cancel button
 * @param {() => void} onConfirm - Event handler for when the confirm button is clicked
 * @param {() => void} onCancel - Event handler for when the cancel button is clicked
 * @param {boolean} confirmDisabled - boolean for whether the confirm button is disabled
 * @param {boolean} centered - boolean for whether the modal content should be centered
 * @param {boolean} minimalSpace - boolean for whether the modal should only have the width and height of its children
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
  minimalSpace = false
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
    <div className={isVisible ? '' : 'hidden'}>
      {/* Fullscreen translucent black div to disable everything and focus attention on the modal */}
      <div className='h-screen w-screen bg-opacity-50 bg-slate-900 fixed top-0 left-0 flex items-center justify-center z-50'>
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
              ${
                minimalSpace
                ? ''
                : 'overflow-y-scroll'
              }
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
            <Button
              title={confirmText}
              onClick={handleConfirm}
              disabled={confirmDisabled}
            />
            <Button title={cancelText} onClick={handleCancel} frame />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
