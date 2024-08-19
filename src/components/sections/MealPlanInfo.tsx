import { useContext, useEffect, useState } from 'react';
import SectionContainer from '../containers/SectionContainer';
import Input from '../form_elements/Input';
import {
  BalanceCtx,
  EndDateCtx,
  MealPlanCtx,
  StartDateCtx,
  TutorialElementsCtx,
  WeeksOffCtx
} from '../../static/context';
import { dateInputToDate, getDaysBetween } from '../../lib/dateCalcuation';
import tooltip from '../../static/tooltip';
import Switch from '../form_elements/Switch';

interface MealPlanInfoProps {
  /**
   * A callback function that is called when the user enters details.
   * @param {boolean} details - The flag indicating whether the user has entered details.
   */
  onEnterDetails: (details: boolean) => void;

  /**
   * The order of the meal plan info.
   */
  order: number;
}

/**
 * Renders a component for displaying and managing meal plan information.
 *
 * @param {MealPlanInfoProps} props - The props for the component.
 * @return {JSX.Element} The rendered MealPlanInfo component.
 */
const MealPlanInfo = ({
  onEnterDetails,
  order
}: MealPlanInfoProps): JSX.Element => {
  const startDate = useContext(StartDateCtx);
  const endDate = useContext(EndDateCtx);
  const mealPlan = useContext(MealPlanCtx);
  const weeksOff = useContext(WeeksOffCtx);
  const balance = useContext(BalanceCtx);
  const tutorialRefs = useContext(TutorialElementsCtx);

  /**
   * The error message to display if the user's input is invalid.
   */
  const [weeksOffInvalidMsg, setWeeksOffInvalidMsg] = useState('');

  /**
   * Calls the onEnterDetails function with the validity of the user's input.
   */
  useEffect(() => {
    if (
      [startDate, endDate, balance, mealPlan, weeksOff].every(
        (ctx) => ctx.value !== null
      )
    ) {
      onEnterDetails(true);
    } else {
      onEnterDetails(false);
    }
  }, [startDate, endDate, mealPlan, balance, weeksOff, onEnterDetails]);

  return (
    <SectionContainer
      title='Meal Plan Info'
      tooltip={tooltip.mealPlanInfo}
      setRef={(ref) => tutorialRefs.setValue(ref, 'Meal Plan Info')}
      order={order}
    >
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
        <div className='flex flex-row items-center'>
          <div className='w-[130px]'>Meal Plan Type: </div>
          <Switch
            state={mealPlan.value ?? false}
            setState={mealPlan.setValue}
            offText='A La Carte'
            onText='Dining Dollars'
          />
        </div>
        <Input
          label={'Number of weeks off: '}
          type={'number'}
          value={weeksOff.value}
          setValue={weeksOff.setValue}
          validator={(str) => {
            const isValidNumber =
              !isNaN(parseFloat(str)) && parseFloat(str) >= 0;
            setWeeksOffInvalidMsg(
              isValidNumber
                ? 'Number of weeks off cannot be greater than the distance between the start and end date.'
                : 'Number of weeks off must be a non-negative number.'
            );
            return isValidNumber &&
              (startDate.value === null ||
                endDate.value === null ||
                Math.min(getDaysBetween(startDate.value, endDate.value)) >=
                  parseFloat(str) * 7)
              ? parseFloat(str)
              : null;
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
