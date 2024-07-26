import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { IMPORTANCE_CLASSES } from "../../static/constants";
import Button from "../form_elements/Button";
import { IoMdClose } from "react-icons/io";
import { TutorialElementsCtx } from "../../static/context";
import tutorialSteps from "../../static/tutorialSteps";
import usePersistentState from "../../hooks/usePersistentState";
import tooltip from "../../static/tooltip";

interface TutorialProps {
    /** Whether the details for the meal plan info form are complete and valid. */
    areDetailsEntered: boolean;
}

const Tutorial = ({
    areDetailsEntered
}: TutorialProps) => {

    const tutorialRefs = useContext(TutorialElementsCtx);

    const [step, setStep] = useState(0);
    const [isDone, setIsDone] = useState(true);
    const [isNewUser, setIsNewUser] = usePersistentState('isNewUser', true);

    const moreDetails = useMemo(
        () => Object.values(tooltip).find(info => info.title === tutorialSteps[step].title)?.text,
        [step]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
      if (isNewUser) {
        setIsDone(false);
        setIsNewUser(false);
      }
    }, [isNewUser, setIsNewUser]);

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
        const tooltip = tutorialTooltipRef!.current!;
        const position = tutorialSteps[step].position;
        let div: HTMLElement | null = null;
        if (tutorialRefs.value[step] !== null) {
            div = tutorialRefs.value[step];
            div.style.zIndex = '50';
        }
        if (position !== 'center') {
            tooltip.style.position = 'static';
            tooltip.style.transform = '';
            tooltip.style.order = `${tutorialSteps[step].order}`;
            (div !== null && tutorialSteps[step].position === 'below'
                ? div
                : tooltip
            ).scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        } else {
            tooltip.style.position = 'absolute';
            tooltip.style.transform = 'translate(-50%, -50%)';
            tooltip.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                className={`absolute max-w-[25rem] p-3 drop-shadow-md self-center
                    shadow-black bg-white rounded top-1/2 left-1/2 z-[55]
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
                    {showDetails ? moreDetails : ''}
                    <div 
                        className={`${moreDetails ? '' : 'hidden'} text-indigo-900 underline text-sm cursor-pointer`}
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? 'less details' : 'more details...'}
                    </div>
                </div> 
                <div className="text-center">
                    <Button 
                        title={'Previous'}
                        style={`${step === 0 ? 'hidden' : ''} text-sm mb-0`}
                        frame={true}
                        onClick={() => {
                            resetPrevDiv(step);
                            if (step !== 0) setStep(step - 1);
                        }}/>    
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