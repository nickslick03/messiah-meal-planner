import { describe, expect, it } from "vitest";
import { mealsIndex } from "../lib/mealsIndex";
import meals from "../static/mealsDatabase";

describe('mealsIndex', () => {

    const firstMeal = meals[0];
    const lastMeal = meals[meals.length - 1];
    
    it('should work', () => {
        expect(
            meals[mealsIndex[firstMeal.id as string]]
        ).toBe(firstMeal);

        expect(
            meals[mealsIndex[lastMeal.id as string]]
        ).toBe(lastMeal);
    });
});