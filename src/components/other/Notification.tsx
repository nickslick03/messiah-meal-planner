import { useEffect, useRef } from "react";

interface NotificationProps {
    message: { text: string};
}

const Notification = ({
    message,
}: NotificationProps) => {

    const div = useRef<HTMLDivElement>(null);

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
            fixed top-0 w-full md:w-3/5 flex justify-center z-10 -translate-y-full animate-topNotify`}>
            <div className="w-full bg-messiah-light-blue drop-shadow-dark p-2 my-4 mx-4 md:mx-0 rounded 
            text-center text-lg font-semibold bg-opacity-80 backdrop-blur-sm">
                {message.text}
            </div>
        </div>
    );
};

export default Notification;