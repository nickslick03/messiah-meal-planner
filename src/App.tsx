import ScreenContainer from './components/containers/ScreenContainer';
import MealPlanInfo from './components/sections/MealPlanInfo';
import {
  MealPlanCtx,
  BalanceCtx,
  StartDateCtx,
  EndDateCtx,
  UserSelectedMealsCtx,
  MealQueueCtx,
  CustomMealsCtx,
  WeeksOffCtx,
  TutorialElementsCtx,
  TutorialControlCtx
} from './static/context';
import { useState, useEffect, useMemo, useRef } from 'react';
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
import Tutorial from './components/modals/Tutorial';
import tutorialSteps from './static/tutorialSteps';
import AvailableMeals from './components/sections/AvailableMeals';
import Menu from './components/other/Menu';
import WhatsNewModal from './components/modals/WhatsNewModal';

function App() {
  /**
   * Stores the user's chosen number of weeks off
   */
  const [weeksOff, setWeeksOff] = usePersistentState<number | null>(
    'weeksOff',
    null
  );

  /**
   * Stores the user's chosen meal plan (discount or not)
   */
  const [mealPlan, setMealPlan] = usePersistentState<boolean | null>(
    'isDD',
    false
  );

  /**
   * Stores the user's starting balance
   */
  const [balance, setBalance] = usePersistentState<number | null>(
    'startingBalance',
    null
  );

  /**
   * Stores the user's chosen start date
   */
  const [startDate, setStartDate] = usePersistentState<Date | null>(
    'startDate',
    null,
    (str) => new Date(str)
  );

  /**
   * Stores the user's chosen end date
   */
  const [endDate, setEndDate] = usePersistentState<Date | null>(
    'endDate',
    null,
    (str) => new Date(str)
  );

  /**
   * Stores the user's selected meals
   */
  const [userSelectedMeals, setUserSelectedMeals] = usePersistentState(
    'userSelectedMeals',
    new UserSelectedMealsObject()
  );

  /**
   * Stores the user's meal queue
   */
  const [mealQueue, setMealQueue] = usePersistentState<Array<MealReference>>(
    'mealQueue',
    []
  );

  /**
   * Stores all custom meals the user has created
   */
  const [customMeals, setCustomMeals] = usePersistentState<Array<Meal>>(
    'customMeals',
    []
  );

  /**
   * An array of refs to the tutorial divs
   */
  const tutorialDivs = useRef<(HTMLElement | null)[]>(
    Array(tutorialSteps.length).fill(null)
  );

  /**
   *
   * @param ref - The ref to add
   * @param title - The title of the step
   */
  const addRef = (ref: HTMLElement | null, title: string) => {
    if (ref === null) return;
    const index = tutorialSteps.findIndex((step) => step.title === title);
    if (index === -1)
      throw new Error(`Title ${title} is not part of the tutorial`);
    tutorialDivs.current[index] = ref;
  };

  /**
   * Tracks whether the tutorial should be shown
   */
  const [showTutorial, setShowTutorial] = useState(false);

  /**
   * The current step of the tutorial
   */
  const [tutorialStep, setTutorialStep] = useState(0);

  /**
   * Tracks whether all details have been entered to the meal plan info form
   */
  const [areDetailsEntered, setAreDetailsEntered] = useState(false);

  /**
   * Remove dangling meal references from mealQueue
   */
  useEffect(() => {
    const newMealQueue = mealQueue.filter((mr) =>
      [...meals, ...customMeals].find((m) => m.id === mr.id)
    );
    if (newMealQueue.length !== mealQueue.length) {
      setMealQueue(newMealQueue);
    }
  }, [mealQueue, customMeals, setMealQueue]);

  /**
   * Remove dangling meal references from userSelectedMeals
   */
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

  /**
   * The grand total cost of all the meals from the start date to the end date.
   */
  const grandTotal = useMemo(
    () =>
      startDate !== null &&
      endDate !== null &&
      balance !== null &&
      weeksOff !== null
        ? getMealTotal(
            userSelectedMeals,
            getWeekdaysBetween(startDate, endDate, weeksOff),
            mealPlan ?? false,
            [...meals, ...customMeals]
          )
        : 0,
    [
      balance,
      customMeals,
      endDate,
      mealPlan,
      startDate,
      userSelectedMeals,
      weeksOff
    ]
  );

  /**
   * Indicates whether the grand total is under the inital balance.
   */
  const isUnderBalance = useMemo(
    () => (balance !== null ? balance >= grandTotal : false),
    [balance, grandTotal]
  );

  /**
   * The difference between the balance and the grand total.
   */
  const difference = useMemo(
    () =>
      balance !== null && grandTotal !== null
        ? Math.abs(balance - grandTotal)
        : 0,
    [balance, grandTotal]
  );

  /**
   * The date when the user will run out of money, if they take their breaks before this date.
   */
  const dayWhenRunOut = useMemo(
    () =>
      calculateDateWhenRunOut(
        userSelectedMeals,
        mealPlan ?? false,
        [...meals, ...customMeals],
        startDate ?? new Date(),
        endDate ?? new Date(),
        balance ?? 0,
        weeksOff ?? 0
      ),
    [
      userSelectedMeals,
      mealPlan,
      customMeals,
      startDate,
      endDate,
      balance,
      weeksOff
    ]
  );

  return (
    <TutorialControlCtx.Provider value={{ setShowTutorial, setTutorialStep }}>
      <TutorialElementsCtx.Provider
        value={{ value: tutorialDivs.current, setValue: addRef }}
      >
        <WeeksOffCtx.Provider
          value={{ value: weeksOff, setValue: setWeeksOff }}
        >
          <MealPlanCtx.Provider
            value={{ value: mealPlan, setValue: setMealPlan }}
          >
            <BalanceCtx.Provider
              value={{ value: balance, setValue: setBalance }}
            >
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
                        <Menu />
                        <ScreenContainer>
                          <WhatsNewModal />
                          <header className='bg-messiah-blue rounded-xl border-4 border-white shadow-md w-full mb-4 flex flex-row justify-center items-center gap-4'>
                            <h1 className='font-semibold text-4xl text-white text-center py-8'>
                              Messiah Meal Planner
                            </h1>
                          </header>
                          <div className='flex flex-col relative gap-4'>
                            <Tutorial
                              show={showTutorial}
                              setShow={setShowTutorial}
                              step={tutorialStep}
                              setStep={setTutorialStep}
                              areDetailsEntered={areDetailsEntered}
                            />
                            <MealPlanInfo
                              onEnterDetails={setAreDetailsEntered}
                              order={1}
                            />
                            {areDetailsEntered ? (
                              <>
                                <AvailableMeals order={2} />
                                <MealQueue order={3} />
                                <DayEditor order={4} />
                                <Results
                                  order={5}
                                  grandTotal={grandTotal}
                                  isUnderBalance={isUnderBalance}
                                  difference={difference}
                                  dayWhenRunOut={dayWhenRunOut}
                                />
                                <ResultsBar
                                  order={6}
                                  grandTotal={grandTotal}
                                  isUnderBalance={isUnderBalance}
                                  difference={difference}
                                />
                              </>
                            ) : (
                              <div className='flex flex-col items-center order-1'>
                                <p className='text-gray-400'>
                                  Enter meal plan info to continue planning.
                                </p>
                              </div>
                            )}
                          </div>
                        </ScreenContainer>
                      </CustomMealsCtx.Provider>
                    </MealQueueCtx.Provider>
                  </UserSelectedMealsCtx.Provider>
                </EndDateCtx.Provider>
              </StartDateCtx.Provider>
            </BalanceCtx.Provider>
          </MealPlanCtx.Provider>
        </WeeksOffCtx.Provider>
      </TutorialElementsCtx.Provider>
    </TutorialControlCtx.Provider>
  );
}

export default App;
