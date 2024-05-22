import ScreenContainer from './components/containers/ScreenContainer';
import MealPlanInfo from './components/sections/MealPlanInfo';
import AvailableMeals from './components/sections/AvailableMeals';
import {
  MealPlanCtx,
  BalanceCtx,
  StartDateCtx,
  EndDateCtx,
  UserSelectedMealsCtx,
  IsBreakCtx
} from './static/context';
import { useState } from 'react';
import Meal from './types/Meal';

function App() {
  const [isBreak, setIsBreak] = useState(false);
  const [mealPlan, setMealPlan] = useState(false);
  const [balance, setBalance] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userSelectedMeals, setUserSelectedMeals] = useState<Meal[][]>(
    new Array(7).fill([])
  );
  const [areDetailsEntered, setAreDetailsEntered] = useState(false);

  return (
    <IsBreakCtx.Provider value={{ value: isBreak, setValue: setIsBreak }}>
      <MealPlanCtx.Provider value={{ value: mealPlan, setValue: setMealPlan }}>
        <BalanceCtx.Provider value={{ value: balance, setValue: setBalance }}>
          <StartDateCtx.Provider
            value={{ value: startDate, setValue: setStartDate }}
          >
            <EndDateCtx.Provider
              value={{ value: endDate, setValue: setEndDate }}
            >
              <UserSelectedMealsCtx.Provider
                value={{
                  value: userSelectedMeals,
                  setValue: setUserSelectedMeals
                }}
              >
                <ScreenContainer>
                  <header className='bg-messiah-blue rounded-xl border-4 border-white shadow-md w-full my-4'>
                    <h1 className='font-semibold text-4xl text-white text-center p-8'>
                      Messiah Meal Planner
                    </h1>
                  </header>
                  <MealPlanInfo onEnterDetails={setAreDetailsEntered} />
                  {areDetailsEntered ? (
                    <AvailableMeals />
                  ) : (
                    <div className='flex flex-col items-center'>
                      <p className='text-gray-400'>
                        Enter meal plan details to continue planning.
                      </p>
                    </div>
                  )}
                </ScreenContainer>
              </UserSelectedMealsCtx.Provider>
            </EndDateCtx.Provider>
          </StartDateCtx.Provider>
        </BalanceCtx.Provider>
      </MealPlanCtx.Provider>
    </IsBreakCtx.Provider>
  );
}

export default App;
