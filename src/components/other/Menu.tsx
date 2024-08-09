import { useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import SectionHeader from '../containers/SectionHeader';
import { IoMdClose } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import ResetModal from '../modals/ResetModal';

const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInFront, setIsInFront] = useState(false);

  const [isResetModalVisible, setIsResetModalVisible] = useState(false);

  const [scrollDistance, setScrollDistance] = useState(0);
  const [isIconVisible, setIsIconVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollDistance = Math.max(window.scrollY, 0);
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;
      setIsIconVisible(
        (scrollDistance > newScrollDistance || newScrollDistance === 0) &&
          !isAtBottom
      );
      setScrollDistance(newScrollDistance);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDistance]);

  return (
    <>
      <div
        className={`${isIconVisible ? 'top-8' : '-top-8'} 
                fixed z-50 left-4 bg-white p-1 rounded-full shadow shadow-[rgba(0,0,0,.4)]
                hover:shadow-[rgba(0,0,0,.5)] hover:shadow-md transition-all duration-200 cursor-pointer`}
        onClick={() => {
          setIsVisible(true);
          setIsInFront(true);
        }}
      >
        <IoMenu size='20px' />
      </div>
      <div
        className={`${isVisible ? 'opacity-100' : 'opacity-0'} 
                ${isInFront ? 'z-50' : '-z-10'} 
                transition-opacity duration-500
                fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-slate-900`}
        onClick={() => setIsVisible(false)}
        onTransitionEnd={() => setIsInFront(isVisible ? isInFront : false)}
      ></div>
      <div
        className={`${
          isVisible
            ? 'translate-x-full shadow-lg shadow-[rgba(0,0,0,.5)]'
            : 'translate-x-0'
        } 
                ${isInFront ? 'z-50' : '-z-10'} 
                transition-transform duration-500
                fixed top-0 right-full w-full max-w-80 h-full bg-white
                py-4 flex flex-col gap-4 justify-between items-center`}
      >
        <button
          className='absolute top-2 right-2'
          onClick={() => setIsVisible(false)}
        >
          <IoMdClose size='20px' />
        </button>
        <SectionHeader text='Menu' />
        <ul className='flex-1 select-none text-lg'>
          <li
            className='hover:underline cursor-pointer flex items-center gap-1'
            onClick={() => setIsResetModalVisible(true)}
          >
            <GrPowerReset /> Reset
          </li>
        </ul>
        <footer className='text-gray-500 text-sm text-center'>
          By{' '}
          <a
            target='_blank'
            href='https://www.linkedin.com/in/caleb-rice-2626-cs/'
            className='text-indigo-900 underline'
          >
            Caleb Rice
          </a>{' '}
          and{' '}
          <a
            target='_blank'
            href='https://www.linkedin.com/in/nicholas-epps-597b94295/'
            className='text-indigo-900 underline'
          >
            Nicholas Epps
          </a>
        </footer>
      </div>
      <ResetModal
        onConfirm={() => {}}
        onCancel={() => setIsResetModalVisible(false)}
        isVisible={isResetModalVisible}
      />
    </>
  );
};

export default Menu;
