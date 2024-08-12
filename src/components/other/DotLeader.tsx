import { IMPORTANCE_CLASSES } from '../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../types/ImportanceIndex';

const DOTS = '.'.repeat(200);

interface DotLeaderProps {
  /**
   * An array of objects containing information to be displayed in the DotLeader component.
   */
  info: Array<{
    /**
     * The title to be displayed.
     */
    title: string;

    /**
     * The importance level of the title. Defaults to `newImportanceIndex(3)`.
     */
    titleImportance?: ImportanceIndex;

    /**
     * The value to be displayed next to the title. Can be a string or a number.
     */
    value: string | number;

    /**
     * The CSS classes to be applied to the value.
     */
    resultsStyle?: string;
  }>;
}

/**
 * Renders a title, followed by the correct amount of dots to make the full width, followed by the title's associated value.
 *
 * @param {DotLeaderProps} props - The props for the DotLeader component.
 * @returns {JSX.Element} The rendered dot leader
 */
const DotLeader = ({ info }: DotLeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-4'>
      {info.map(
        (
          {
            title,
            titleImportance = newImportanceIndex(3),
            value,
            resultsStyle
          },
          i
        ) => {
          const importance = IMPORTANCE_CLASSES[titleImportance];
          return (
            <div className='flex gap-1' key={i}>
              <div className={`${importance}`}>{title}</div>
              <div className='flex-1 flex justify-center overflow-hidden'>
                <div className='tracking-widest font-light'>{DOTS}</div>
              </div>
              <div className={resultsStyle}>{value}</div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default DotLeader;
