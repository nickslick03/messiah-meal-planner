import dereferenceMeal from '../lib/dereferenceMeal';
import { describe, expect, it } from 'vitest';
import MealReference from '../types/MealReference';
import Meal from '../types/Meal';

const fakeMeals = [
  {
    id: '1',
    name: 'Lunch',
    price: 8.99,
    location: 'Lottie'
  } as Meal,
  {
    id: '2',
    name: 'Dinner',
    price: 12.99,
    location: 'Lottie'
  } as Meal
];

const fakeCustomMeals = [
  {
    id: '3',
    instanceId: '1',
    name: 'Lunch',
    price: 8.99,
    location: 'Lottie'
  } as Meal,
  {
    id: '4',
    instanceId: '2',
    name: 'Dinner',
    price: 12.99,
    location: 'Lottie'
  } as Meal
];

describe('dereferenceMeal', () => {
  it('should convert a MealReference to a Meal and override instanceId', () => {
    expect(
      dereferenceMeal(
        {
          id: '1',
          instanceId: '1'
        } as MealReference,
        fakeMeals,
        fakeCustomMeals
      )
    ).toStrictEqual({
      id: '1',
      name: 'Lunch',
      price: 8.99,
      location: 'Lottie',
      instanceId: '1'
    } as Meal);

    expect(
      dereferenceMeal(
        {
          id: '3',
          instanceId: '2'
        } as MealReference,
        fakeMeals,
        fakeCustomMeals
      )
    ).toStrictEqual({
      id: '3',
      instanceId: '2',
      name: 'Lunch',
      price: 8.99,
      location: 'Lottie'
    } as Meal);
  });
});
