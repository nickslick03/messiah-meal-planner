import { createContext } from 'react';
import Meal from '../types/Meal';
import { Dispatch, SetStateAction } from 'react';
import {
  UserSelectedMealsObjectType,
  UserSelectedMealsObject
} from '../types/userSelectedMealsObject';

interface ContextType<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
}

export const IsBreakCtx = createContext<ContextType<boolean>>({
  value: false,
  setValue: () => {}
});

export const MealPlanCtx = createContext<ContextType<boolean>>({
  value: false,
  setValue: () => {}
});

export const BalanceCtx = createContext<ContextType<number>>({
  value: 0,
  setValue: () => {}
});

export const StartDateCtx = createContext<ContextType<string>>({
  value: '',
  setValue: () => {}
});

export const EndDateCtx = createContext<ContextType<string>>({
  value: '',
  setValue: () => {}
});

export const UserSelectedMealsCtx = createContext<
  ContextType<UserSelectedMealsObjectType>
>({
  value: new UserSelectedMealsObject(),
  setValue: () => {}
});

export const MealQueueCtx = createContext<ContextType<Meal[]>>({
  value: [],
  setValue: () => {}
});

export const CustomMealsCtx = createContext<ContextType<Meal[]>>({
  value: [],
  setValue: () => {}
});
