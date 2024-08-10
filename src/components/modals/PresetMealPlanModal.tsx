import { PresetMealPlans } from "../../static/PresetMealPlans";
import ModalContainer from "../containers/ModalContainer";
import { PresetMealPlanView } from "../other/PresetMealPlanView";

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

    return (
        isVisible ? (
            <ModalContainer
                onlyCancel={true}
                title="Preset Meal Plans"
                onCancel={onCancel}
            >
                {PresetMealPlans.map((plan, i) => 
                    <>
                        <PresetMealPlanView presetMealPlan={plan} key={i} />
                        {i + 1 != PresetMealPlans.length
                        ? <div className="w-full h-[1px] bg-gray-300 my-5"></div>
                        : ''}
                    </>
                )}
            </ModalContainer>
        ) : (
            <></>
        )
    );
}

export default PresetMealPlanModal;