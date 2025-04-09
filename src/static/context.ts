import { createContext } from 'react';
import Meal from '../types/Meal';
import MealReference from '../types/MealReference';
import { Dispatch, SetStateAction } from 'react';
import {
  UserSelectedMealsObjectType,
  UserSelectedMealsObject
} from '../types/userSelectedMealsObject';

interface ContextType<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
}

export const ColorPreferenceCtx = createContext<ContextType<string | null>>({
  value: null,
  setValue: () => {}
});

export const WeeksOffCtx = createContext<ContextType<number | null>>({
  value: null,
  setValue: () => {}
});

export const MealPlanCtx = createContext<ContextType<boolean | null>>({
  value: false,
  setValue: () => {}
});

export const BalanceCtx = createContext<ContextType<number | null>>({
  value: null,
  setValue: () => {}
});

export const StartDateCtx = createContext<ContextType<Date | null>>({
  value: null,
  setValue: () => {}
});

export const EndDateCtx = createContext<ContextType<Date | null>>({
  value: null,
  setValue: () => {}
});

export const UserSelectedMealsCtx = createContext<
  ContextType<UserSelectedMealsObjectType>
>({
  value: new UserSelectedMealsObject(),
  setValue: () => {}
});

export const MealQueueCtx = createContext<ContextType<MealReference[]>>({
  value: [],
  setValue: () => {}
});

export const CustomMealsCtx = createContext<ContextType<Meal[]>>({
  value: [],
  setValue: () => {}
});

interface TutorialDivs {
  value: (HTMLElement | null)[];
  setValue: (ref: HTMLElement | null, title: string) => void;
}

export const TutorialElementsCtx = createContext<TutorialDivs>({
  value: [],
  setValue: () => {}
});

interface TutorialControl {
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  setTutorialStep: React.Dispatch<React.SetStateAction<number>>;
}

export const TutorialControlCtx = createContext<TutorialControl>({
  setShowTutorial: () => {},
  setTutorialStep: () => {}
});
