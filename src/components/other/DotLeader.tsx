import { IMPORTANCE_CLASSES } from '../../static/constants';
import {
  ImportanceIndex,
  newImportanceIndex
} from '../../types/ImportanceIndex';

const DOTS = '.'.repeat(200);

interface DotLeaderProps {
  info: {
    title: string;
    titleImportance?: ImportanceIndex;
    value: string | number;
    resultsStyle?: string;
  }[];
}

/**
 * Renders a title, followed by the correct amount of dots to make the full width, followed by the title's associated value.
 * @param {DotLeaderProps["info"]} info The info to be rendered in the dot leader
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
