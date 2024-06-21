import { useMemo, useState } from 'react';
import camelify from '../../lib/titleToCamel';
import tutorialData, { TutorialObject } from '../../static/tutorial';
import ModalContainer from '../containers/ModalContainer';
import { Dispatch, SetStateAction } from 'react';

interface TutorialModalProps {
  tutorial?: TutorialObject;
  tutorialVisible: boolean;
  setTutorialVisible: Dispatch<SetStateAction<boolean>>;
}

/**
 * Component for displaying a tutorial modal.
 *
 * @param {TutorialModalProps} props - The props for the component.
 * @param {TutorialObject} props.tutorial - The tutorial to display.
 * @param {boolean} props.tutorialVisible - Whether or not the modal is visible.
 * @param {Dispatch<SetStateAction<boolean>>} props.setTutorialVisible - The function to set whether or not the modal is visible.
 * @returns {JSX.Element} The tutorial modal component.
 */
const TutorialModal = ({
  tutorial,
  tutorialVisible,
  setTutorialVisible
}: TutorialModalProps) => {
  // State for the current tutorial
  const [currentTutorial, setCurrentTutorial] = useState(tutorial);

  /**
   * Event handler for when the cancel button is clicked.
   * Sets the tutorial visible state to false and resets the current tutorial to the passed in tutorial.
   */
  const handleCancel = () => {
    setTutorialVisible(false);
    setCurrentTutorial(tutorial);
  };

  /**
   * Event handler for when the confirm button is clicked.
   * If the current tutorial is not the last tutorial, sets the current tutorial to the next tutorial.
   */
  const handleConfirm = () => {
    if (currentIndex === Object.keys(tutorialData).length - 1) {
      return;
    }

    setCurrentTutorial(Object.values(tutorialData)[currentIndex + 1]);
  };

  /** Memoized value for the index of the current tutorial */
  const currentIndex = useMemo(
    () =>
      Object.keys(tutorialData).indexOf(camelify(currentTutorial?.title ?? '')),
    [currentTutorial]
  );

  /** Memoized value for whether or not the current tutorial is the last tutorial */
  const isLastTutorial = useMemo(
    () => currentIndex === Object.keys(tutorialData).length - 1,
    [currentIndex]
  );

  return (
    tutorialVisible && (
      <ModalContainer
        title={currentTutorial?.title}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        cancelText='Close'
        confirmText='Next'
        confirmDisabled={isLastTutorial}
        centered={false}
      >
        {/* Render the text of the tutorial */}
        {currentTutorial?.text}
      </ModalContainer>
    )
  );
};

export default TutorialModal;
