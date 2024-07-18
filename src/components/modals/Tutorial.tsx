import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { IMPORTANCE_CLASSES } from "../../static/constants";
import Button from "../form_elements/Button";
import { IoMdClose } from "react-icons/io";
import { TutorialDivsCtx } from "../../static/context";
import tutorialSteps from "../../static/tutorialSteps";

interface TutorialProps {
    /** Whether the details for the meal plan info form are complete and valid. */
    areDetailsEntered: boolean;
}

const Tutorial = ({
    areDetailsEntered
}: TutorialProps) => {

    const tutorialRefs = useContext(TutorialDivsCtx);

    const [step, setStep] = useState(0);
    const [isDone, setIsDone] = useState(false);

    const tutorialTooltipRef = useRef<HTMLDivElement | null>(null);

    const isStepComplete = useMemo(() => {
        const validation = [
            {
                title: 'Meal Plan Info',
                check: () => areDetailsEntered
            }
        ].find(validation => validation.title === tutorialSteps[step].title);
        return !validation || validation.check();
    }, [step, areDetailsEntered]);

    const resetPrevDiv = (i: number) => {
        const div = tutorialRefs.value[i];
        if (div !== null) { 
            div.style.zIndex = "0";
        }
    }

    useEffect(() => {
        if (tutorialRefs.value[step] !== null) {
            const isBottom = tutorialSteps[step].position === 'bottom';
            const div = tutorialRefs.value[step]; 
            const top = div.offsetTop + (isBottom 
                ? div.offsetHeight + 15 
                : 0);
            div.style.zIndex = "50";    
            tutorialTooltipRef!.current!.style.top = `${top}px`;
            tutorialTooltipRef!.current!.scrollIntoView({ 
                behavior: 'smooth', 
                block: isBottom 
                    ? 'end' 
                    : 'start' 
            });
        } else {
            tutorialTooltipRef!.current!.style.top = "50%";
            tutorialTooltipRef!.current!.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [step]);

    useEffect(() => {
        if (isDone) resetPrevDiv(step);
    }, [isDone]);

    const importance = IMPORTANCE_CLASSES[4];
    return (
        <>
            <div className={`h-screen w-full bg-opacity-50 bg-slate-900 fixed top-0 left-0 z-50 ${isDone ? 'hidden' : ''}`}>
            </div>
            <div 
                className={`absolute max-w-[25rem] p-3 drop-shadow-md shadow-black bg-white 
                    rounded -translate-x-1/2 gap-2 z-[55] top-1/2 left-1/2
                    ${tutorialSteps[step].position === 'bottom' ? '' : '-translate-y-full'}
                    ${isDone ? 'hidden' : ''}`}
                ref={tutorialTooltipRef}
            >
                <button 
                    className="absolute top-1 right-1"
                    onClick={() => setIsDone(true)}    
                >
                    <IoMdClose />
                </button>
                <h2 className={`${importance} text-xl text-center mb-2`}>
                    {tutorialSteps[step].title}
                    <span className="font-thin text-gray-500">
                      {' '}({step + 1}/{tutorialSteps.length})
                    </span>
                </h2>
                <div className="text-sm flex-1 px-1 mb-1">
                    {tutorialSteps[step].description}{' '}
                    {tutorialSteps[step].action ?? ''}
                </div>
                <div className="text-center text-xs text-gray-500">
                        
                </div>
                <div className="text-center">
                    <Button 
                        title={step + 1 === tutorialSteps.length ? 'Finish' : 'Next'}
                        style="text-sm mb-0"
                        disabled={!isStepComplete}
                        onClick={() => {
                            resetPrevDiv(step);
                            step + 1 === tutorialSteps.length
                                ? setIsDone(true)
                                : setStep(step + 1);
                        }}/>    
                </div>    
            </div>
        </>
    );
};

export default Tutorial;