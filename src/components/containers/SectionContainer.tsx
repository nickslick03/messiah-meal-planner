import { useState, useEffect } from 'react';
import { TooltipObject } from '../../static/tooltip';
import SectionHeader from './SectionHeader';
import { FiHelpCircle } from 'react-icons/fi';
import TooltipModal from '../modals/TooltipModal';
import usePersistentState from '../../hooks/usePersistentState';

// Prop types
interface SectionContainerProps {
  children?: React.ReactNode;
  title?: string;
  tooltip?: TooltipObject;
}

/**
 * Renders a section container with a title and children
 *
 * @param {React.ReactNode} children - The children components to render inside the section container
 * @param {string} title - The title of the section container
 * @param {TooltipObject} tooltip - The tooltip object for the section
 * @returns {JSX.Element} The rendered section container
 */
const SectionContainer = ({
  children = <></>,
  title,
  tooltip
}: SectionContainerProps): JSX.Element => {
  const [isNewUser, setIsNewUser] = usePersistentState('isNewUser', true);

  useEffect(() => {
    if (isNewUser && tooltip?.title === 'Meal Plan Info') {
      setTooltipVisible(true);
      setIsNewUser(false);
    }
  }, [isNewUser, setIsNewUser, tooltip?.title]);

  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <section className='relative border-4 border-messiah-blue rounded-xl p-4 flex flex-col justify-center items-center w-full shadow-md mb-4'>
      {title === undefined ? '' : <SectionHeader text={title} />}
      <button
        className='absolute top-5 right-5'
        onClick={() => setTooltipVisible(true)}
      >
        <FiHelpCircle size={20} color='#aaa' />
      </button>
      {children}
      <TooltipModal
        tooltip={tooltip}
        setTooltipVisible={setTooltipVisible}
        tooltipVisible={tooltipVisible}
      />
    </section>
  );
};

export default SectionContainer;
