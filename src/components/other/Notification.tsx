import { useEffect, useRef } from 'react';

interface NotificationProps {
  /** The nessage to put in the notification */
  message: {
    /** The text of the notification */
    text: string;
  };
}

/**
 * Component for displaying a notification
 *
 * @param {NotificationProps} props - The props for the component
 * @returns {JSX.Element} The notification component
 */
const Notification = ({ message }: NotificationProps) => {
  /**
   * Reference to the notification div
   */
  const div = useRef<HTMLDivElement>(null);

  /**
   * If the message is not empty, animate the notification
   */
  useEffect(() => {
    if (div.current) {
      div.current.classList.remove('animate-topNotify');
      void div.current.offsetWidth; // triggers reflow
      div.current.classList.add('animate-topNotify');
    }
  }, [message]);

  return (
    <div
      ref={div}
      className={`${message.text === '' ? 'hidden' : ''} 
            fixed top-0 w-full md:w-3/5 flex justify-center z-20 -translate-y-full animate-topNotify`}
    >
      <div
        className='w-full bg-messiah-light-blue drop-shadow-dark p-2 my-4 mx-4 md:mx-0 rounded 
            text-center text-lg font-semibold bg-opacity-80 backdrop-blur-sm'
      >
        {message.text}
      </div>
    </div>
  );
};

export default Notification;
