import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import SectionHeader from "../containers/SectionHeader";
import { IoMdClose } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";

const Menu = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [isInFront, setIsInFront] = useState(false);

    useEffect(() => {
        if (isVisible)
            setIsInFront(true);
    }, [isVisible]);

    return (
        <>
            <div 
                className="fixed z-50 top-8 left-4 bg-white p-1 rounded-full shadow shadow-[rgba(0,0,0,.3)]
                hover:shadow-[rgba(0,0,0,.4)] hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setIsVisible(true)}
            >
                <IoMenu size="20px" />
            </div>
            <div 
                className={`${isVisible ? "opacity-100" : "opacity-0"} 
                ${isInFront ? "z-50" : "-z-10"} 
                transition-opacity duration-500
                fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-slate-900 z-50`}
                onTransitionEnd={() => setIsInFront(isVisible ? isInFront : false)}
            ></div>
            <div 
                className={`${isVisible ? "translate-x-full" : "translate-x-0"} 
                ${isInFront ? "z-50" : "-z-10"} 
                transition-transform duration-500
                fixed top-0 right-full w-full max-w-80 h-full bg-white shadow-lg shadow-[rgba(0,0,0,.5)]
                py-4 flex flex-col gap-4 justify-between items-center z-50`}
            >
                <button
                    className='absolute top-2 right-2'
                    onClick={() => setIsVisible(false)}
                >
                    <IoMdClose size="20px" />
                </button>
                <SectionHeader text="Menu" />
                <ul className="flex-1 select-none text-lg">
                    <li className="hover:underline cursor-pointer flex items-center gap-1">
                        <GrPowerReset /> Reset
                    </li>
                </ul>
                <footer className="text-gray-500 text-sm text-center">
                    Website By{' '}
                    <a href="#" className='text-indigo-900 underline'>Caleb Rice</a>{' '}
                    And{' '}
                    <a href="#" className='text-indigo-900 underline'>Nicholas Epps</a>
                </footer>    
            </div> 
        </>
    );
}

export default Menu;