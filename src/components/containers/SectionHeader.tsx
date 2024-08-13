// Prop types
interface SectionHeaderProps {
  /**
   * Text to display in the section header
   */
  text?: string;
}

/**
 * Renders a section header with the given text
 *
 * @param {SectionHeaderProps} props - The props for the SectionHeader component.
 * @returns {JSX.Element} The rendered section header
 */
const SectionHeader = ({ text = '' }: SectionHeaderProps): JSX.Element => (
  <h1 className='font-bold text-2xl'>{text}</h1>
);

export default SectionHeader;
