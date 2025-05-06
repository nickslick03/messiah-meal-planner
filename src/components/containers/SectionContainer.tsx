import { useContext } from 'react';
import { TooltipObject } from '../../static/tooltip';
import SectionHeader from './SectionHeader';
import { FiHelpCircle } from 'react-icons/fi';
import { TutorialControlCtx } from '../../static/context';

interface SectionContainerProps {
  /**
   * The children components to render inside the section container
   */
  children?: React.ReactNode;

  /**
   * The title of the section container
   */
  title?: string;

  /**
   * The tooltip object for the section
   */
  tooltip?: TooltipObject;

  /**
   * Optional callback function to get the section ref
   * @param {HTMLElement | null} ref - The section ref
   */
  setRef?: (ref: HTMLElement | null) => void;

  /**
   * The order this component should appear
   */
  order?: number;
}


/**
 * Renders a section container with a title and children
 *
 * @param {SectionContainerProps} props - The props for the SectionContainer component.
 * @returns {JSX.Element} The rendered section container
 */
const SectionContainer = ({
  children = <></>,
  title,
  setRef = () => {},
  order = 0
}: SectionContainerProps): JSX.Element => {
  const { setTutorialStep, setShowTutorial } = useContext(TutorialControlCtx);

  return (
    <section
      className='relative border-4 border-messiah-blue bg-white dark:bg-gray-700 dark:border-messiah-blue-hover rounded-xl p-4 
      flex flex-col justify-center items-center w-full shadow-md'
      style={{
        order: order
      }}
      ref={(ref) => setRef(ref)}
    >
      {title === undefined ? '' : <SectionHeader text={title} />}
      <button
        className='absolute top-5 right-5'
        onClick={() => {
          setTutorialStep(order);
          setShowTutorial(true);
        }}
      >
        <FiHelpCircle size={20} color='#aaa' />
      </button>
      {children}
    </section>
  );
};

export default SectionContainer;
