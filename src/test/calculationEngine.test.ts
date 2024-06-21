import { describe, expect, it } from 'vitest';
import {
  applyDiscount,
  getMealDayTotal,
  getMealTotal,
  calculateDateWhenRunOut
} from '../lib/calculationEngine';
import meals from '../static/mealsDatabase';
import MealReference from '../types/MealReference';
import { UserSelectedMealsObjectType } from '../types/userSelectedMealsObject';
import Meal from '../types/Meal';

describe('applyDiscount', () => {
  it('should work for Lottie', () => {
    expect(applyDiscount({ location: 'Lottie', price: 1 } as Meal)).toBe(0.48);
  });

  it('should work for Union', () => {
    expect(applyDiscount({ location: 'Union', price: 1 } as Meal)).toBe(0.7);
  });

  it('should work for Vending', () => {
    expect(applyDiscount({ location: 'Vending', price: 1 } as Meal)).toBe(1);
  });
});

describe('getMealDayTotal', () => {
  const mealList = meals.filter((m) =>
    [
      'Breakfast', // 6.3
      'Smash Burger', // 4.15
      'Grain Bowl', // 8
      'Soda/Water' // 2.25
    ].some((mName) => m.name === mName)
  );

  it('should work', () => {
    expect(getMealDayTotal(mealList, 1)).toBe(6.3 + 4.5 + 8 + 2.25);

    expect(getMealDayTotal(mealList, 2)).toBe((6.3 + 4.5 + 8 + 2.25) * 2);
  });

  it('should work with discount', () => {
    expect(getMealDayTotal(mealList, 1, true)).toBe(
      6.3 * 0.48 + 4.5 * 0.7 + 8 * 0.7 + 2.25
    );

    expect(getMealDayTotal(mealList, 2, true)).toBe(
      (6.3 * 0.48 + 4.5 * 0.7 + 8 * 0.7 + 2.25) * 2
    );
  });
});

describe('getMealTotal', () => {
  const mealList1: MealReference[] = meals
    .filter((m) =>
      [
        'Breakfast', // 6.3
        'Grain Bowl' // 8
      ].some((mName) => m.name === mName)
    ) // Lottie and Falcon
    .map((m) => ({ id: m.id as string, instanceId: ':P' }));
  const mealList2: MealReference[] = meals
    .filter((m) =>
      [
        'Smash Burger', // 4.5
        'Soda/Water' // 2.25
      ].some((mName) => m.name === mName)
    ) // Union and Vending
    .map((m) => ({ id: m.id as string, instanceId: ':P' }));
  const userMeals: UserSelectedMealsObjectType = {
    Monday: mealList1,
    Tuesday: mealList1,
    Wednesday: mealList1,
    Thursday: mealList1,
    Friday: mealList1,
    Saturday: mealList2,
    Sunday: mealList2
  };

  it('should work for 1 day', () => {
    expect(
      getMealTotal(userMeals, [0, 1, 0, 0, 0, 0, 0], false, meals) // mealList1
    ).toBe(14.3);
    expect(
      getMealTotal(userMeals, [1, 0, 0, 0, 0, 0, 0], false, meals) // mealList2
    ).toBe(6.75);
  });

  it('should work for multiple days', () => {
    expect(getMealTotal(userMeals, [1, 1, 0, 0, 0, 0, 0], false, meals)).toBe(
      21.05
    );
  });

  it('should work for discount', () => {
    expect(
      getMealTotal(userMeals, [0, 1, 0, 0, 0, 0, 0], true, meals)
    ).toBeCloseTo(3.02 + 5.6);
  });
});

describe('calculateDateWhenRunOut', () => {
  const mealList1: MealReference[] = meals
    .filter((m) =>
      [
        'Breakfast', // 6.3
        'Grain Bowl' // 8
      ].some((mName) => m.name === mName)
    ) // Lottie and Falcon
    .map((m) => ({ id: m.id as string, instanceId: ':P' }));
  const mealList2: MealReference[] = meals
    .filter((m) =>
      [
        'Smash Burger', // 4.5
        'Soda/Water' // 2.25
      ].some((mName) => m.name === mName)
    ) // Union and Vending
    .map((m) => ({ id: m.id as string, instanceId: ':P' }));
  const userMeals: UserSelectedMealsObjectType = {
    Monday: mealList1,
    Tuesday: mealList1,
    Wednesday: mealList1,
    Thursday: mealList1,
    Friday: mealList1,
    Saturday: mealList2,
    Sunday: mealList2
  };
  it('should return the date when money runs out', () => {
    expect(
      calculateDateWhenRunOut(
        userMeals,
        false,
        meals,
        new Date('05/05/2024'),
        new Date('06/08/2024'),
        35
      )
    ).toStrictEqual(new Date('05/07/2024'));
  });
  it('should return the end date if money never runs out', () => {
    expect(
      calculateDateWhenRunOut(
        userMeals,
        true,
        meals,
        new Date('06/05/2024'),
        new Date('06/08/2024'),
        1000
      )
    ).toStrictEqual(new Date('06/08/2024'));
  });
});
