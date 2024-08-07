import { describe, expect, it } from 'vitest';
import sortMeals from '../lib/sortMeals';

describe('sortMeals', () => {
  it('should sort an array of Meal objects based on the specified criteria', () => {
    const sortedData = [
      { name: 'Item 1', location: 'Place 1', price: 10 },
      { name: 'Item 2', location: 'Place 2', price: 5 },
      { name: 'Item 3', location: 'Place 3', price: 15 }
    ];
    const sortedData2 = [
      { name: 'Item 3', location: 'Place 3', price: 15 },
      { name: 'Item 2', location: 'Place 2', price: 5 },
      { name: 'Item 1', location: 'Place 1', price: 10 }
    ];
    const sortedData3 = [
      { name: 'Item 2', location: 'Place 2', price: 5 },
      { name: 'Item 1', location: 'Place 1', price: 10 },
      { name: 'Item 3', location: 'Place 3', price: 15 }
    ];
    const sortedData4 = [
      { name: 'Item 3', location: 'Place 3', price: 15 },
      { name: 'Item 1', location: 'Place 1', price: 10 },
      { name: 'Item 2', location: 'Place 2', price: 5 }
    ];
    const data = [
      { name: 'Item 2', location: 'Place 2', price: 5 },
      { name: 'Item 1', location: 'Place 1', price: 10 },
      { name: 'Item 3', location: 'Place 3', price: 15 }
    ];

    expect(sortMeals(data, 'Place', true)).toEqual(sortedData);
    expect(sortMeals(data, 'Place', false)).toEqual(sortedData2);

    expect(sortMeals(data, 'Name', true)).toEqual(sortedData);
    expect(sortMeals(data, 'Name', false)).toEqual(sortedData2);

    expect(sortMeals(data, 'Price', true)).toEqual(sortedData3);
    expect(sortMeals(data, 'Price', false)).toEqual(sortedData4);
  });
});
