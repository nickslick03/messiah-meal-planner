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
}: SectionContainerProps): JSX.Element => {
  return (
    <section className='border-4 border-blue-500 rounded-xl p-4 m-4 flex flex-col justify-center items-center'>
      <SectionHeader text={title} />
      {children}
    </section>
  );
};

export default SectionContainer;
