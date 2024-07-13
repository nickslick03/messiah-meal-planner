import { useContext, useEffect, useState } from 'react';
import SectionContainer from '../containers/SectionContainer';
import Input from '../form_elements/Input';
import {
  BalanceCtx,
  EndDateCtx,
  IsBreakCtx,
  MealPlanCtx,
  StartDateCtx,
  WeeksOffCtx
} from '../../static/context';
import { dateInputToDate, getDaysBetween } from '../../lib/dateCalcuation';
import tutorial from '../../static/tutorial';

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
  const weeksOff = useContext(WeeksOffCtx);
  const balance = useContext(BalanceCtx);

  const [ weeksOffInvalidMsg, setWeeksOffInvalidMsg ] = useState('');

  useEffect(() => {
    if (
      [startDate, 
        endDate, 
        balance, 
        mealPlan, 
        isBreak, 
        weeksOff].every(ctx => ctx.value !== null)
    ) {
      onEnterDetails(true);
    } else {
      onEnterDetails(false);
    }
  }, [startDate, endDate, mealPlan, isBreak, balance, onEnterDetails]);

  return (
    <SectionContainer title='Meal Plan Info' tutorial={tutorial.mealPlanInfo}>
      <div className='mt-4 flex flex-col items-start gap-4 w-min'>
        <Input
          label={'Start Date:'}
          type={'date'}
          value={startDate.value}
          setValue={startDate.setValue}
          validator={(str) =>
            !isNaN(Date.parse(str)) &&
            (endDate.value === null || +dateInputToDate(str) <= +endDate.value)
              ? dateInputToDate(str)
              : null
          }
          invalidMessage={'Start date must be before end date.'}
        />
        <Input
          label={'End Date:'}
          type={'date'}
          value={endDate.value}
          setValue={endDate.setValue}
          validator={(str) =>
            !isNaN(Date.parse(str)) &&
            (startDate.value === null ||
              +dateInputToDate(str) >= +startDate.value)
              ? dateInputToDate(str)
              : null
          }
          invalidMessage={'End date must be after start date.'}
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
          validator={(str) =>
            str === 'true' &&
            getDaysBetween(
              startDate.value ?? new Date(),
              endDate.value ?? new Date()
            ) >= 7
              ? true
              : str === 'false'
              ? false
              : null
          }
          invalidMessage={
            "You can't take a 1-week break if your meal plan is less than 1 week long."
          }
        />
        <Input 
          label={'Number of weeks off: '}
          type={'number'}
          value={weeksOff.value}
          setValue={weeksOff.setValue}
          validator={(str) => {
            const isValidNumber = !isNaN(parseFloat(str)) && parseFloat(str) >= 0;
            setWeeksOffInvalidMsg(isValidNumber 
              ? 'Number of weeks off cannot be greater than the distance between the start and end date.' 
              : 'Number of weeks off must be a non-negative number.');
            return isValidNumber 
              && 
              (startDate.value === null 
                || endDate.value === null
                || Math.min(getDaysBetween(startDate.value, endDate.value)) >= parseFloat(str) * 7)
              ? parseFloat(str)
              : null
          }}
          invalidMessage={weeksOffInvalidMsg}
          />
        <Input
          label={'Starting Balance: $'}
          type={'number'}
          value={balance.value}
          setValue={balance.setValue}
          validator={(str) =>
            !isNaN(parseFloat(str)) && parseFloat(str) > 0
              ? parseFloat(str)
              : null
          }
          invalidMessage={'Starting balance must be a positive number.'}
        />
      </div>
    </SectionContainer>
  );
};

export default MealPlanInfo;
