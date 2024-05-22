import { createContext } from 'react';
import Meal from '../types/Meal';

interface ContextType<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
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
export const UserSelectedMealsCtx = createContext<ContextType<Meal[][]>>({
  value: new Array(7).fill([]),
  setValue: () => {}
});
export const MealQueueCtx = createContext<ContextType<Meal[]>>({
  value: [],
  setValue: () => {}
});
