import React, { useContext, useState } from 'react';
import { PresetMealPlans } from '../../static/PresetMealPlans';
import ModalContainer from '../containers/ModalContainer';
import { PresetMealPlanView } from '../other/PresetMealPlanView';
import { UserSelectedMealsCtx } from '../../static/context';
import Notification from '../other/Notification';

interface PresetMealPlanModalProps {
  /**
   * Whether or not the modal is visible.
   */
  isVisible: boolean;

  /**
   * Event handler for when the cancel button is clicked.
   */
  onCancel: () => void;
}

/**
 * Component for displaying a preset meal plan modal.
 *
 * @param {PresetMealPlanModalProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const PresetMealPlanModal = ({
  isVisible,
  onCancel
}: PresetMealPlanModalProps) => {
  const userSelectedMeals = useContext(UserSelectedMealsCtx);

  /**
   * Whether or not the confirmation modal is visible.
   */
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * The selected preset meal plan.
   */
  const [selectedPlan, setSelectedPlan] = useState(-1);

  /**
   * The message to be displayed in the notification.
   */
  const [message, setMessage] = useState({ text: '' });

  /**
   * Sets the selected preset meal plan.
   */
  const onSet = (index: number) => {
    setSelectedPlan(index);
    setShowConfirm(true);
  };

  /**
   * Confirms the selection of the preset meal plan.
   */
  const onConfirmSet = () => {
    userSelectedMeals.setValue(
      PresetMealPlans[selectedPlan].userSelectedMealPlan()
    );
    setShowConfirm(false);
    onCancel();
    setMessage({
      text: `Set meal plan to ${PresetMealPlans[selectedPlan].name}`
    });
  };

  return (
    <>
      <div className='z-[100] relative w-full flex justify-center'>
        <Notification message={message} />
      </div>
      {isVisible ? (
        <>
          <ModalContainer
            onlyCancel={true}
            title='Preset Meal Plans'
            onCancel={onCancel}
            centered={false}
          >
            {PresetMealPlans.map((plan, i) => (
              <React.Fragment key={i}>
                <PresetMealPlanView
                  presetMealPlan={plan}
                  onSet={() => onSet(i)}
                />
                {i + 1 != PresetMealPlans.length ? (
                  <div className='w-full h-[1px] bg-gray-300 my-5'></div>
                ) : (
                  ''
                )}
              </React.Fragment>
            ))}
          </ModalContainer>
          {showConfirm ? (
            <ModalContainer
              minimalSpace={true}
              confirmDisabled={false}
              title='Confirm Preset Meal Plan'
              confirmText='Set'
              onConfirm={onConfirmSet}
              onCancel={() => setShowConfirm(false)}
            >
              This will replace the current meal plan with the "
              {PresetMealPlans[selectedPlan].name}" meal plan. Are you sure?
            </ModalContainer>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PresetMealPlanModal;
