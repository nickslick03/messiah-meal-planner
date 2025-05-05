import React from 'react';
import {
  MealsCtx,
  LocationsCtx,
  TutorialControlCtx,
  TutorialElementsCtx,
  WeeksOffCtx,
  MealPlanCtx,
  BalanceCtx,
  StartDateCtx,
  EndDateCtx,
  UserSelectedMealsCtx,
  MealQueueCtx,
  CustomMealsCtx,
  ColorPreferenceCtx
} from '../../static/context';
import Meal from '../../types/Meal';
import { UserSelectedMealsObjectType } from '../../types/userSelectedMealsObject';
import MealReference from '../../types/MealReference';

interface ContextProviderProps {
  children: React.ReactNode;
  meals: Meal[];
  mealLocations: string[];
  setMealLocations: React.Dispatch<React.SetStateAction<string[]>>;
  weeksOff: number | null;
  setWeeksOff: React.Dispatch<React.SetStateAction<number | null>>;
  mealPlan: boolean | null;
  setMealPlan: React.Dispatch<React.SetStateAction<boolean | null>>;
  balance: number | null;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  userSelectedMeals: UserSelectedMealsObjectType;
  setUserSelectedMeals: React.Dispatch<
    React.SetStateAction<UserSelectedMealsObjectType>
  >;
  mealQueue: MealReference[];
  setMealQueue: React.Dispatch<React.SetStateAction<MealReference[]>>;
  customMeals: Meal[];
  setCustomMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorialStep: React.Dispatch<React.SetStateAction<number>>;
  tutorialDivs: React.MutableRefObject<(HTMLElement | null)[]>;
  setColorPreference: React.Dispatch<React.SetStateAction<string | null>>;
  colorPreference: string | null;
  addRef: (ref: HTMLElement | null, title: string) => void;
}

const ContextProvider = ({
  children,
  meals,
  mealLocations,
  setMealLocations,
  setShowTutorial,
  setTutorialStep,
  tutorialDivs,
  addRef,
  weeksOff,
  setWeeksOff,
  mealPlan,
  setMealPlan,
  balance,
  setBalance,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  userSelectedMeals,
  setUserSelectedMeals,
  mealQueue,
  setMealQueue,
  customMeals,
  setCustomMeals,
  colorPreference,
  setColorPreference
}: ContextProviderProps) => {
  return (
    <ColorPreferenceCtx.Provider
      value={{ value: colorPreference, setValue: setColorPreference }}
    >
      <MealsCtx.Provider value={{ value: meals, setValue: () => {} }}>
        <LocationsCtx.Provider
          value={{ value: mealLocations, setValue: setMealLocations }}
        >
          <TutorialControlCtx.Provider
            value={{ setShowTutorial, setTutorialStep }}
          >
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
                              value={{
                                value: customMeals,
                                setValue: setCustomMeals
                              }}
                            >
                              {children}
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
        </LocationsCtx.Provider>
      </MealsCtx.Provider>
    </ColorPreferenceCtx.Provider>
  );
};

export default ContextProvider;
