import SectionHeader from './SectionHeader';

// Prop types
interface SectionContainerProps {
  children?: React.ReactNode;
  title?: string;
}

/**
 * Renders a section container with a title and children
 *
 * @param {React.ReactNode} children - The children components to render inside the section container
 * @param {string} title - The title of the section container
 * @returns {JSX.Element} The rendered section container
 */
const SectionContainer = ({
  children = <></>,
  title = ''
}: SectionContainerProps): JSX.Element => (
  <section className='relative border-4 border-messiah-blue rounded-xl p-4 flex flex-col justify-center items-center w-full shadow-md mb-4'>
    <SectionHeader text={title} />
    {children}
  </section>
);

export default SectionContainer;
