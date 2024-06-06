import { describe, expect, it } from "vitest";
import { applyDiscount, getMealTotal } from "../lib/calculationEngine";
import meals from "../static/mealsDatabase";
import MealReference from "../types/MealReference";
import { UserSelectedMealsObjectType } from "../types/userSelectedMealsObject";
import Meal from "../types/Meal";

describe('applyDiscount', () => {
    it('should work for Lottie', () => {
        expect(applyDiscount({location: 'Lottie', price: 1} as Meal)).toBe(.48);
    });

    it('should work for Union', () => {
        expect(applyDiscount({location: 'Union', price: 1} as Meal)).toBe(.7);
    });

    it('should work for Vending', () => {
        expect(applyDiscount({location: 'Vending', price: 1} as Meal)).toBe(1);
    });
})

describe('getMealTotal', () => {
    const mealList1: MealReference[] = meals
    .filter(m => ['Breakfast', 'Grain Bowl'].some(mName => m.name === mName)) // Lottie and Falcon
    .map(m => ({ id: m.id as string, instanceId: ':P'}));
    const mealList2: MealReference[] = meals
    .filter(m => ['Smash Burger', 'Soda/Water'].some(mName => m.name === mName)) // Union and Vending
    .map(m => ({ id: m.id as string, instanceId: ':P'}));
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
            getMealTotal(userMeals, [0,1,0,0,0,0,0]) // mealList1
        ).toBe(14.3);
        expect(
            getMealTotal(userMeals, [1,0,0,0,0,0,0]) // mealList2
        ).toBe(6.75);
    });

    it('should work for multiple days', () => {
        expect(
            getMealTotal(userMeals, [1,1,0,0,0,0,0]) 
        ).toBe(21.05);
    });

    //TODO: test for discount
});