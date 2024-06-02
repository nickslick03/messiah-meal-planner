import { describe, it, expect } from 'vitest';
import { UserSelectedMealsObject } from '../types/userSelectedMealsObject';

describe('UserSelectedMealsObject', () => {
  it('should create a new UserSelectedMealsObject value based on the given object', () => {
    expect(new UserSelectedMealsObject()).toEqual({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: []
    });
  });
});
