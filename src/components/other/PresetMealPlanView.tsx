import { useContext } from 'react';
import { PresetMealPlan } from '../../static/PresetMealPlans';
import { MealPlanCtx, MealsCtx } from '../../static/context';
import Button from '../form_elements/Button';
import formatCurrency from '../../lib/formatCurrency';

interface PresetMealPlanViewProps {
  /**
   * The preset meal plan to display.
   */
  presetMealPlan: PresetMealPlan;
  /**
   * The function to call when the user sets the meal plan.
   */
  onSet: () => void;
}

/**
 * Component for displaying a preset meal plan.
 *
 * @param {PresetMealPlanViewProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const PresetMealPlanView = ({
  presetMealPlan,
  onSet
}: PresetMealPlanViewProps) => {
  const hasDiscount = useContext(MealPlanCtx);
  const meals = useContext(MealsCtx);

  const weekPrice = formatCurrency(
    presetMealPlan.weekPrice(hasDiscount.value ?? false, meals.value)
  );

  return (
    <div>
      <h3 className='text-lg text-center font-bold mb-2'>
        {presetMealPlan.name}
      </h3>
      <div className='flex justify-between'>
        <div className='text-left flex flex-col gap-2'>
          <p className='pr-12'>{presetMealPlan.description}</p>
          <p>
            Price for 1 week: <strong>{weekPrice}</strong>
          </p>
        </div>
        <div className='self-end [&>button]:mb-0'>
          <Button title='Set' onClick={onSet} />
        </div>
      </div>
    </div>
  );
};
