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
import { ALACARTE_DISCOUNT } from '../static/discounts';

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
      'Breakfast', // 6.55
      'Smash Burger', // 4.75
      'Create Your Own Bowl', // 8
      'Soda/Water' // 2.25
    ].some((mName) => m.name === mName)
  );

  it('should work', () => {
    expect(getMealDayTotal(mealList, 1)).toBeCloseTo(
      (6.55 + 4.75 + 8 + 2.25) * (1 - ALACARTE_DISCOUNT),
      2
    );

    expect(getMealDayTotal(mealList, 2)).toBeCloseTo(
      (6.55 + 4.75 + 8 + 2.25) * 2 * (1 - ALACARTE_DISCOUNT),
      1
    );
  });

  it('should work with discount', () => {
    expect(getMealDayTotal(mealList, 1, true)).toBe(
      6.55 * 0.48 + 4.75 * 0.7 + 8 * 0.7 + 2.25
    );

    expect(getMealDayTotal(mealList, 2, true)).toBe(
      (6.55 * 0.48 + 4.75 * 0.7 + 8 * 0.7 + 2.25) * 2
    );
  });
});

describe('getMealTotal', () => {
  const mealList1: MealReference[] = meals
    .filter((m) =>
      [
        'Breakfast', // 6.55
        'Create Your Own Bowl' // 8
      ].some((mName) => m.name === mName)
    ) // Lottie and Falcon
    .map((m) => ({ id: m.id as string, instanceId: ':P' }));
  const mealList2: MealReference[] = meals
    .filter((m) =>
      [
        'Smash Burger', // 4.75
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
    ).toBeCloseTo((6.55 + 8) * (1 - ALACARTE_DISCOUNT), 2);
    expect(
      getMealTotal(userMeals, [1, 0, 0, 0, 0, 0, 0], false, meals) // mealList2
    ).toBeCloseTo(7 * (1 - ALACARTE_DISCOUNT), 2);
  });

  it('should work for multiple days', () => {
    expect(
      getMealTotal(userMeals, [1, 1, 0, 0, 0, 0, 0], false, meals)
    ).toBeCloseTo((6.55 + 8 + 7) * (1 - ALACARTE_DISCOUNT), 2);
  });

  it('should work for discount', () => {
    expect(
      getMealTotal(userMeals, [0, 1, 0, 0, 0, 0, 0], true, meals)
    ).toBeCloseTo(6.55 * 0.48 + 5.6);
  });
});

describe('calculateDateWhenRunOut', () => {
  const mealList1: MealReference[] = meals
    .filter((m) =>
      [
        'Breakfast', // 6.55
        'Create Your Own Bowl' // 8
      ].some((mName) => m.name === mName)
    ) // Lottie and Falcon
    .map((m) => ({ id: m.id as string, instanceId: ':P' }));
  const mealList2: MealReference[] = meals
    .filter((m) =>
      [
        'Smash Burger', // 4.75
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
    ).toStrictEqual(new Date('05/08/2024'));
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
  it('should work with a week or two off', () => {
    expect(
      calculateDateWhenRunOut(
        userMeals,
        true,
        meals,
        new Date('05/05/2024'),
        new Date('06/08/2024'),
        100,
        1
      )
    ).toStrictEqual(new Date('05/24/2024'));
    expect(
      calculateDateWhenRunOut(
        userMeals,
        true,
        meals,
        new Date('05/05/2024'),
        new Date('06/08/2024'),
        100,
        2
      )
    ).toStrictEqual(new Date('05/31/2024'));
  });
});
