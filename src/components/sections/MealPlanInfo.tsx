import { useContext, useEffect } from 'react';
import SectionContainer from '../containers/SectionContainer';
import Input from '../form_elements/Input';
import {
  BalanceCtx,
  EndDateCtx,
  IsBreakCtx,
  MealPlanCtx,
  StartDateCtx
} from '../../static/context';
import { strToDate } from '../../lib/dateCalcuation';

/**
 * Renders a component for displaying and managing meal plan information.
 *
 * @return {JSX.Element} The rendered MealPlanInfo component.
 */
const MealPlanInfo = ({
  onEnterDetails
}: {
  onEnterDetails: (details: boolean) => void;
}): JSX.Element => {
  // Load all necessary contexts
  const startDate = useContext(StartDateCtx);
  const endDate = useContext(EndDateCtx);
  const mealPlan = useContext(MealPlanCtx);
  const isBreak = useContext(IsBreakCtx);
  const balance = useContext(BalanceCtx);

  useEffect(() => {
    if (startDate.value && endDate.value && balance.value) {
      onEnterDetails(true);
    } else {
      onEnterDetails(false);
    }
  }, [startDate, endDate, mealPlan, isBreak, balance, onEnterDetails]);

  return (
    <SectionContainer title='Meal Plan Info'>
      <div className='mt-4 flex flex-col gap-4'>
        <Input
          label={'Start Date:'}
          type={'date'}
          value={startDate.value}
          setValue={startDate.setValue}
          validator={(str) =>
            !isNaN(Date.parse(str)) &&
            (endDate.value === null || +strToDate(str) <= +endDate.value)
            ? strToDate(str)
            : null
          }
        />
        <Input
          label={'End Date:'}
          type={'date'}
          value={endDate.value}
          setValue={
            endDate.setValue
          }
          validator={(str) =>
            !isNaN(Date.parse(str)) &&
            (startDate.value === null || +strToDate(str) >= +startDate.value)
            ? strToDate(str)
            : null
          }
        />
        <Input
          label={'Dining Dollars Discount:'}
          type={'checkbox'}
          value={mealPlan.value}
          setValue={mealPlan.setValue}
          validator={(str) => str === 'true'}
        />
        <Input
          label={'Account for 1-Week Break:'}
          type={'checkbox'}
          value={isBreak.value}
          setValue={isBreak.setValue}
          validator={(str) => str === 'true'}
        />
        <Input
          label={'Starting Balance: $'}
          type={'number'}
          value={balance.value}
          setValue={balance.setValue}
          validator={(str) =>
            (!isNaN(parseFloat(str)) && parseFloat(str) >= 0)
            ? parseFloat(str)
            : null
          }
        />
      </div>
    </SectionContainer>
  );
};

export default MealPlanInfo;
