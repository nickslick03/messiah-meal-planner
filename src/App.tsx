import ScreenContainer from './components/containers/ScreenContainer';
import MealPlanInfo from './components/sections/MealPlanInfo';
import AvailableMeals from './components/sections/AvailableMeals';
import {
  MealPlanCtx,
  BalanceCtx,
  StartDateCtx,
  EndDateCtx,
  UserSelectedMealsCtx,
  IsBreakCtx,
  MealQueueCtx,
  CustomMealsCtx
} from './static/context';
import { useState, useEffect, useMemo } from 'react';
import Meal from './types/Meal';
import MealReference from './types/MealReference';
import DayEditor from './components/sections/DayEditor';
import MealQueue from './components/sections/MealQueue';
import Results from './components/sections/Results';
import ResultsBar from './components/sections/ResultsBar';
import {
  UserSelectedMealsObject,
  UserSelectedMealsObjectType
} from './types/userSelectedMealsObject';
import usePersistentState from './hooks/usePersistentState';
import meals from './static/mealsDatabase';
import { getMealTotal, calculateDateWhenRunOut } from './lib/calculationEngine';
import { getWeekdaysBetween } from './lib/dateCalcuation';

function App() {
  const [isBreak, setIsBreak] = usePersistentState<boolean | null>(
    'isBreak',
    false
  );
  const [mealPlan, setMealPlan] = usePersistentState<boolean | null>(
    'isDD',
    false
  );
  const [balance, setBalance] = usePersistentState<number | null>(
    'startingBalance',
    null
  );
  const [startDate, setStartDate] = usePersistentState<Date | null>(
    'startDate',
    null,
    (str) => new Date(str)
  );
  const [endDate, setEndDate] = usePersistentState<Date | null>(
    'endDate',
    null,
    (str) => new Date(str)
  );
  const [userSelectedMeals, setUserSelectedMeals] = usePersistentState(
    'userSelectedMeals',
    new UserSelectedMealsObject()
  );
  const [mealQueue, setMealQueue] = usePersistentState<Array<MealReference>>(
    'mealQueue',
    []
  );
  const [customMeals, setCustomMeals] = usePersistentState<Array<Meal>>(
    'customMeals',
    []
  );
  const [areDetailsEntered, setAreDetailsEntered] = useState(false);

  // Remove dangling meal references from mealQueue and userSelectedMeals
  useEffect(() => {
    const newMealQueue = mealQueue.filter((mr) =>
      [...meals, ...customMeals].find((m) => m.id === mr.id)
    );
    if (newMealQueue.length !== mealQueue.length) {
      setMealQueue(newMealQueue);
    }
  }, [mealQueue, customMeals, setMealQueue]);
  useEffect(() => {
    const newUserSelectedMeals = Object.fromEntries(
      Object.entries(userSelectedMeals).map(([key, value]) => [
        key,
        value.filter((mr: MealReference) =>
          [...meals, ...customMeals].find((m) => m.id === mr.id)
        )
      ])
    ) as UserSelectedMealsObjectType;
    if (
      Object.keys(newUserSelectedMeals).length !==
      Object.keys(userSelectedMeals).length
    ) {
      setUserSelectedMeals(newUserSelectedMeals);
    }
  }, [userSelectedMeals, customMeals, setUserSelectedMeals]);

  /** The grand total of all the meals from the start date to the end date. */
  const grandTotal = useMemo(
    () =>
      startDate !== null && endDate !== null && balance !== null
        ? getMealTotal(
            userSelectedMeals,
            getWeekdaysBetween(startDate, endDate, isBreak ?? false),
            mealPlan ?? false,
            [...meals, ...customMeals]
          )
        : 0,
    [
      balance,
      customMeals,
      endDate,
      isBreak,
      mealPlan,
      startDate,
      userSelectedMeals
    ]
  );

  /** Indicates whether the grand total is under the inital balance. */
  const isUnderBalance = useMemo(
    () => (balance !== null ? balance >= grandTotal : false),
    [balance, grandTotal]
  );

  /** The difference between the balance and the grand total. */
  const difference = useMemo(
    () =>
      balance !== null && grandTotal !== null
        ? Math.abs(balance - grandTotal)
        : 0,
    [balance, grandTotal]
  );

  const dayWhenRunOut = useMemo(
    () =>
      calculateDateWhenRunOut(
        userSelectedMeals,
        mealPlan ?? false,
        [...meals, ...customMeals],
        startDate ?? new Date(),
        endDate ?? new Date(),
        balance ?? 0,
        isBreak ?? false
      ),
    [
      userSelectedMeals,
      mealPlan,
      customMeals,
      startDate,
      endDate,
      balance,
      isBreak
    ]
  );

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
                <MealQueueCtx.Provider
                  value={{ value: mealQueue, setValue: setMealQueue }}
                >
                  <CustomMealsCtx.Provider
                    value={{ value: customMeals, setValue: setCustomMeals }}
                  >
                    <ScreenContainer>
                      <header className='bg-messiah-blue rounded-xl border-4 border-white shadow-md w-full mb-4'>
                        <h1 className='font-semibold text-4xl text-white text-center p-8'>
                          Messiah Meal Planner
                        </h1>
                      </header>
                      <MealPlanInfo onEnterDetails={setAreDetailsEntered} />
                      {areDetailsEntered ? (
                        <>
                          <AvailableMeals />
                          <MealQueue />
                          <DayEditor />
                          <Results
                            grandTotal={grandTotal}
                            isUnderBalance={isUnderBalance}
                            difference={difference}
                            dayWhenRunOut={dayWhenRunOut}
                          />
                          <ResultsBar
                            grandTotal={grandTotal}
                            isUnderBalance={isUnderBalance}
                            difference={difference}
                          />
                        </>
                      ) : (
                        <div className='flex flex-col items-center'>
                          <p className='text-gray-400'>
                            Enter meal plan info to continue planning.
                          </p>
                        </div>
                      )}
                    </ScreenContainer>
                  </CustomMealsCtx.Provider>
                </MealQueueCtx.Provider>
              </UserSelectedMealsCtx.Provider>
            </EndDateCtx.Provider>
          </StartDateCtx.Provider>
        </BalanceCtx.Provider>
      </MealPlanCtx.Provider>
    </IsBreakCtx.Provider>
  );
}

export default App;
