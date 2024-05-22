import { useContext, useEffect, Dispatch, SetStateAction } from 'react';
import SectionContainer from '../containers/SectionContainer';
import Input from '../form_elements/Input';
import {
  BalanceCtx,
  EndDateCtx,
  IsBreakCtx,
  MealPlanCtx,
  StartDateCtx
} from '../../static/context';

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
    if (startDate && endDate && balance) {
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
          setValue={
            startDate.setValue as Dispatch<
              SetStateAction<string | number | boolean>
            >
          }
          validator={(str) => !isNaN(Date.parse(str))}
        />
        <Input
          label={'End Date:'}
          type={'date'}
          value={endDate.value}
          setValue={
            endDate.setValue as Dispatch<
              SetStateAction<string | number | boolean>
            >
          }
          validator={(str) =>
            !isNaN(Date.parse(str)) &&
            +Date.parse(str) >= +Date.parse(startDate.value)
          }
        />
        <Input
          label={'Dining Dollars Discount:'}
          type={'checkbox'}
          value={mealPlan.value}
          setValue={
            mealPlan.setValue as Dispatch<
              SetStateAction<string | number | boolean>
            >
          }
        />
        <Input
          label={'Account for 1-Week Break:'}
          type={'checkbox'}
          value={isBreak.value}
          setValue={
            isBreak.setValue as Dispatch<
              SetStateAction<string | number | boolean>
            >
          }
        />
        <Input
          label={'Starting Balance: $'}
          type={'number'}
          value={balance.value === 0 ? '' : balance.value}
          setValue={
            balance.setValue as Dispatch<
              SetStateAction<string | number | boolean>
            >
          }
          validator={(str) =>
            (!isNaN(parseFloat(str)) && parseFloat(str) >= 0) || str === ''
          }
        />
      </div>
    </SectionContainer>
  );
};

export default MealPlanInfo;
