import { useState, useEffect } from 'react';
import { TutorialObject } from '../../static/tutorial';
import SectionHeader from './SectionHeader';
import { FiHelpCircle } from 'react-icons/fi';
import TutorialModal from '../modals/TutorialModal';
import usePersistentState from '../../hooks/usePersistentState';

// Prop types
interface SectionContainerProps {
  children?: React.ReactNode;
  title?: string;
  tutorial?: TutorialObject;
}

/**
 * Renders a section container with a title and children
 *
 * @param {React.ReactNode} children - The children components to render inside the section container
 * @param {string} title - The title of the section container
 * @param {TutorialObject} tutorial - The tutorial object for the section
 * @returns {JSX.Element} The rendered section container
 */
const SectionContainer = ({
  children = <></>,
  title,
  tutorial
}: SectionContainerProps): JSX.Element => {
  const [isNewUser, setIsNewUser] = usePersistentState('isNewUser', true);

  useEffect(() => {
    if (isNewUser && tutorial?.title === 'Meal Plan Info') {
      setTutorialVisible(true);
      setIsNewUser(false);
    }
  }, [isNewUser, setIsNewUser, tutorial?.title]);

  const [tutorialVisible, setTutorialVisible] = useState(false);

  return (
    <section className='relative border-4 border-messiah-blue rounded-xl p-4 flex flex-col justify-center items-center w-full shadow-md mb-4'>
      {title === undefined ? '' : <SectionHeader text={title} />}
      <button
        className='absolute top-5 right-5'
        onClick={() => setTutorialVisible(true)}
      >
        <FiHelpCircle size={20} color='#aaa' />
      </button>
      {children}
      <TutorialModal
        tutorial={tutorial}
        setTutorialVisible={setTutorialVisible}
        tutorialVisible={tutorialVisible}
      />
    </section>
  );
};

export default SectionContainer;
