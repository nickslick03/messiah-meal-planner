import { describe, expect, it } from "vitest";
import { filterMeals } from "../lib/filterMeals";
import Meal from "../types/Meal";

describe('filterMeals', () => {
  it('should return an empty array when no meals match the filter', () => {
    const meals = [
      { name: 'Pizza', location: 'Italian', price: 10 },
      { name: 'Sushi', location: 'Japanese', price: 15 },
    ];
    const filter = 'Mexican';
    const result = filterMeals(meals, filter);
    expect(result).toEqual([]);
  });

  it('should return all meals when the filter is empty', () => {
    const meals = [
      { name: 'Pizza', location: 'Italian', price: 10 },
      { name: 'Sushi', location: 'Japanese', price: 15 },
    ];
    const filter = '';
    const result = filterMeals(meals, filter);
    expect(result).toEqual(meals);
  });

  it('should return meals that match the filter', () => {
    const meals = [
      { name: 'Pizza', location: 'Italian', price: 10 },
      { name: 'Sushi', location: 'Japanese', price: 15 },
      { name: 'Tacos', location: 'Mexican', price: 8 },
    ];
    const filter = 'Mexican';
    const result = filterMeals(meals, filter);
    expect(result).toEqual([{ name: 'Tacos', location: 'Mexican', price: 8 }]);
  });

  it('should return meals that match all filter criteria', () => {
    const meals = [
      { name: 'Pizza', location: 'Italian', price: 10 },
      { name: 'Sushi', location: 'Japanese', price: 15 },
      { name: 'Tacos', location: 'Mexican', price: 8 },
    ];
    const filter = 'Mexican';
    const result = filterMeals(meals, filter);
    expect(result).toEqual([{ name: 'Tacos', location: 'Mexican', price: 8 }]);
  });

  it('should return an empty array when the meals array is empty', () => {
    const meals: Meal[] = [];
    const filter = 'Italian';
    const result = filterMeals(meals, filter);
    expect(result).toEqual([]);
  });

  it('should return meals when the word is in the middle of the name', () => {
    const meals = [
        { name: 'chicken sandwich', location: 'Italian', price: 10 },
        { name: 'turkey sandwich', location: 'Italian', price: 10 },
        { name: 'pizza', location: 'Italian', price: 10 },
    ];
    const filter = 'sandwich';
    const result = filterMeals(meals, filter);
    console.log(result);
    expect(result).toEqual([
        { name: 'chicken sandwich', location: 'Italian', price: 10 },
        { name: 'turkey sandwich', location: 'Italian', price: 10 },
    ]);
  });
});