import { useContext, useState } from "react";
import { PresetMealPlans } from "../../static/PresetMealPlans";
import ModalContainer from "../containers/ModalContainer";
import { PresetMealPlanView } from "../other/PresetMealPlanView";
import { UserSelectedMealsCtx } from "../../static/context";

interface PresetMealPlanModalProps {
    /** Whether or not the modal is visible. */
    isVisible: boolean;
    /** Event handler for when the cancel button is clicked. */
    onCancel: () => void;
}

const PresetMealPlanModal = ({
    isVisible,
    onCancel,
}: PresetMealPlanModalProps) => {

    const userSelectedMeals = useContext(UserSelectedMealsCtx);

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(-1);

    const onSet = (index: number) => {
        setSelectedPlan(index);
        setShowConfirm(true);
    }

    const onConfirmSet = () => {
        userSelectedMeals.setValue(
            PresetMealPlans[selectedPlan].userSelectedMealPlan()
        );
        setShowConfirm(false);
        onCancel();
    }

    return (
        isVisible ? (
            <>
                <ModalContainer
                    onlyCancel={true}
                    title="Preset Meal Plans"
                    onCancel={onCancel}
                >
                    {PresetMealPlans.map((plan, i) => 
                        <>
                            <PresetMealPlanView presetMealPlan={plan} key={i} onSet={() => onSet(i)} />
                            {i + 1 != PresetMealPlans.length
                            ? <div className="w-full h-[1px] bg-gray-300 my-5"></div>
                            : ''}
                        </>
                    )}
                </ModalContainer>
                {showConfirm ? (
                    <ModalContainer
                        minimalSpace={true}
                        confirmDisabled={false}
                        title="Confirm Preset Meal"
                        confirmText="Set"
                        onConfirm={onConfirmSet}
                        onCancel={() => setShowConfirm(false)}
                    >
                        This will replace the current meal plan with the 
                        "{PresetMealPlans[selectedPlan].name}" meal plan. Are you sure?
                    </ModalContainer>
                ) : (
                    <></>
                )}
            </>
        ) : (
            <></>
        )
    );
}

export default PresetMealPlanModal;