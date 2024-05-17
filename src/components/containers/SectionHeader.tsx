// Prop types
interface SectionHeaderProps {
  text?: string;
}

/**
 * Renders a section header with the given text
 *
 * @param {string} text - The text to display in the section header
 * @returns {JSX.Element} The rendered section header
 */
const SectionHeader = ({ text = '' }: SectionHeaderProps): JSX.Element => {
  return <h1 className='font-bold text-2xl'>{text}</h1>;
};

export default SectionHeader;
