import { useState } from 'react';
import SectionHeader from './SectionHeader';

// Prop types
interface ModalContainerProps {
  children?: React.ReactNode;
  title?: string | null;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
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
 * @returns {JSX.Element} JSX for rendering a modal
 */
const ModalContainer = ({
  children = <></>,
  title = null,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
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

  return isVisible ? (
    <div>
      {/* Fullscreen translucent black div to disable everything and focus attention on the modal */}
      <div className='h-screen w-screen bg-opacity-50 bg-slate-900 fixed top-0 left-0 flex items-center justify-center'>
        {/* The actual modal component */}
        <div className=' bg-white w-full h-full max-w-[500px] max-h-[500px] rounded-lg p-5 flex flex-col sm:w-5/6 sm:h-5/6'>
          {
            /* Title goes here */
            title !== null && title !== undefined ? (
              <SectionHeader text={title} />
            ) : (
              <></>
            )
          }
          {/* Content goes here */}
          <div className='flex-grow'>{children}</div>
          {/* Confirm and cancel buttons */}
          <div className='flex-shrink flex flex-row justify-center'>
            <button
              className='bg-messiah-blue border-2 border-messiah-blue text-white m-2 p-2 rounded-lg flex-shrink'
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
            <button
              className=' bg-white text-messiah-blue border-2 border-messiah-blue m-2 p-2 rounded-lg flex-shrink'
              onClick={handleCancel}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ModalContainer;
