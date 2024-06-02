
interface NotificationProps {
    text: string;
}

const Notification = ({
    text
}: NotificationProps) => {

    return (
        <div className="fixed top-0 w-full md:w-3/5 flex justify-center z-10">
            <div className="w-full bg-messiah-light-blue drop-shadow-dark p-2 my-4 mx-4 md:mx-0 rounded 
            text-center text-lg font-semibold bg-opacity-80 backdrop-blur-sm">
                {text}
            </div>
        </div>
    );
};

export default Notification;