import { useContext, useState } from 'react';
import { IoMenu, IoMoon, IoSunny } from 'react-icons/io5';
import SectionHeader from '../containers/SectionHeader';
import { IoIosDocument, IoMdClose } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import ResetModal from '../modals/ResetModal';
import PresetMealPlanModal from '../modals/PresetMealPlanModal';
import { FaClock } from 'react-icons/fa';
import LocationHoursModal from '../modals/LocationHoursModal';
import Switch from '../form_elements/Switch';
import { ShowMealQueueCtx } from '../../static/context';
import { BiHide, BiShow } from 'react-icons/bi';
import { ColorPreferenceCtx } from '../../static/context';
import { MdFeedback } from 'react-icons/md';

/**
 * The main menu component of the app.
 *
 * @returns {JSX.Element} The rendered Menu component.
 */
const Menu = () => {
  const showMealQueue = useContext(ShowMealQueueCtx);
  /**
   * State for menu visibility.
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * State for whether the menu is in front of other elements.
   */
  const [isInFront, setIsInFront] = useState(false);

  /**
   * State for reset modal visibility.
   */
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  /**
   * State for location modal visibility.
   */
  const [isLocationHoursModalVisible, setIsLocationHoursModalVisible] =
    useState(false);

  /**
   * State for preset modal visibility.
   */
  const [isPresetModalVisible, setIsPresetModalVisible] = useState(false);

  const colorPreference = useContext(ColorPreferenceCtx);

  /**
   * Updates the scroll distance and icon visibility on scroll.
   */
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const newScrollDistance = Math.max(window.scrollY, 0);
  //     const isScrollingDown = scrollDistance > newScrollDistance;
  //     const isAtTop = newScrollDistance === 0;
  //     const isAtBottom =
  //       window.innerHeight + window.scrollY >=
  //       document.documentElement.scrollHeight;
  //     setIsIconVisible(isScrollingDown || isAtTop || isAtBottom);
  //     setScrollDistance(newScrollDistance);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [scrollDistance]);

  /**
   * Sets a timeout to show the menu icon after 5 seconds of inactivity.
   */
  // useEffect(() => {
  //   const timeoutID = isIconVisible
  //     ? -1
  //     : setTimeout(() => setIsIconVisible(true), 5000);
  //   return () => clearTimeout(timeoutID);
  // }, [scrollDistance]);

  return (
    <>
      {/* Main menu button */}
      <div
        className={`top-8
                fixed z-50 left-4 bg-white p-1 rounded-full shadow shadow-[rgba(0,0,0,.4)]
                hover:shadow-[rgba(0,0,0,.5)] hover:shadow-md transition-all duration-200 cursor-pointer
                dark:bg-gray-500`}
        onClick={() => {
          setIsVisible(true);
          setIsInFront(true);
        }}
      >
        <IoMenu size='20px' />
      </div>
      {/* Menu overlay */}
      <div
        className={`${isVisible ? 'opacity-100' : 'opacity-0'} 
                ${isInFront ? 'z-50' : '-z-10'} 
                transition-opacity duration-500
                fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-slate-900 backdrop-blur-[3px]`}
        onClick={() => setIsVisible(false)}
        onTransitionEnd={() => setIsInFront(isVisible ? isInFront : false)}
      ></div>
      {/* Menu content */}
      <div
        className={`${
          isVisible
            ? 'translate-x-full shadow-lg shadow-[rgba(0,0,0,.5)]'
            : 'translate-x-0'
        } 
                ${isInFront ? 'z-50' : '-z-10'} 
                transition-transform duration-500
                fixed top-0 right-full w-full max-w-80 h-full bg-white
                py-4 flex flex-col gap-4 justify-between items-center
                dark:bg-gray-700`}
      >
        {/* Close button */}
        <button
          className='absolute top-2 right-2'
          onClick={() => setIsVisible(false)}
        >
          <IoMdClose size='20px' />
        </button>
        {/* Menu header */}
        <SectionHeader text='Menu' />
        {/* Menu links */}
        <ul className='flex-1 select-none text-lg flex flex-col gap-2'>
          <li
            className='hover:underline cursor-pointer flex items-center gap-2'
            onClick={() => setIsLocationHoursModalVisible(true)}
          >
            <FaClock /> Location Hours
          </li>
          <li
            className='hover:underline cursor-pointer flex items-center gap-2'
            onClick={() => setIsPresetModalVisible(true)}
          >
            <IoIosDocument /> Preset Meal Plans
          </li>
          <li
            className='hover:underline cursor-pointer flex items-center gap-2'
            onClick={() => setIsResetModalVisible(true)}
          >
            <GrPowerReset /> Reset
          </li>
          <li className='hover:underline cursor-pointer flex items-center gap-2'>
            <MdFeedback />
            <a href='https://forms.gle/cMMqxgHpJBH2gSAp9' target='_blank'>
              Feedback
            </a>
          </li>
          <li className='flex items-center gap-2'>
            Meal Queue
            <Switch
              state={showMealQueue.value}
              setState={showMealQueue.setValue}
              offIcon={<BiHide />}
              offText='Off'
              onIcon={<BiShow />}
              onText='On'
              shrinkable={true}
            />
          </li>
        </ul>
        <div>
          <Switch
            offIcon={<IoSunny />}
            offText='Light'
            onIcon={<IoMoon />}
            onText='Dark'
            state={colorPreference.value === 'dark'}
            setState={(isDark) =>
              colorPreference.setValue(isDark ? 'dark' : 'light')
            }
          />
        </div>
        <footer className='text-gray-500 dark:text-gray-200 text-sm text-center'>
          By{' '}
          <a
            target='_blank'
            href='https://www.linkedin.com/in/caleb-rice-2626-cs/'
            className='text-indigo-900 underline dark:text-indigo-300'
          >
            Caleb Rice
          </a>{' '}
          and{' '}
          <a
            target='_blank'
            href='https://www.linkedin.com/in/nicholas-epps-597b94295/'
            className='text-indigo-900 underline dark:text-indigo-300'
          >
            Nicholas Epps
          </a>
          <br />
          <a
            href='https://github.com/nickslick03/messiah-meal-planner'
            className='text-indigo-900 underline dark:text-indigo-300'
            target='_blank'
          >
            Source Code
          </a>
          <br />
          <a
            href='https://github.com/nickslick03/messiah-meal-planner/blob/master/LICENSE'
            className='text-indigo-900 underline dark:text-indigo-300'
            target='_blank'
          >
            Legal
          </a>
        </footer>
      </div>
      <LocationHoursModal
        isVisible={isLocationHoursModalVisible}
        setIsVisible={setIsLocationHoursModalVisible}
      />
      <ResetModal
        onConfirm={() => {}}
        onCancel={() => setIsResetModalVisible(false)}
        isVisible={isResetModalVisible}
      />
      <PresetMealPlanModal
        onCancel={() => setIsPresetModalVisible(false)}
        isVisible={isPresetModalVisible}
      />
    </>
  );
};

export default Menu;
