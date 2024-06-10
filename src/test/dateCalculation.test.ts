import { describe, expect, it } from "vitest";
import { getDaysBetween, getWeekdaysBetween, dateInputToDate } from "../lib/dateCalcuation";

describe('strToDate', () => {
    it('should return a date object', () => {
        expect(dateInputToDate('06/05/2024')).toEqual(new Date('06/05/2024'));
    });    
});

describe('getDaysBetween', () => {
    it('should return -1 if the start date is after the end date', () => {
        expect(
            getDaysBetween(new Date('06/05/2024'), new Date('06/04/2024'))
        ).toBe(-1);
    });

    it('should return 1 if the dates are on the same day', () => {
        expect(
            getDaysBetween(new Date('06/05/2024'), new Date('06/05/2024'))
        ).toBe(1);
    });

    it('should work for larger gaps of time', () => {
        expect(
            getDaysBetween(new Date('06/05/2024'), new Date('06/25/2024'))
        ).toBe(21);
        expect(
            getDaysBetween(new Date('06/05/2024'), new Date('07/02/2024'))
        ).toBe(28);
        expect(
            getDaysBetween(new Date('06/05/2024'), new Date('07/02/2025'))
        ).toBe(393);
    })
});

describe('getWeekdaysBetween', () => {
    it('should return an array filled with zero if start is after end', () => {
        expect(
            getWeekdaysBetween(new Date('06/05/2024'), new Date('06/04/2024'))
        ).toEqual([0, 0, 0, 0, 0, 0, 0]);
    });

    it('should return an array where one element equals 1 if the dates have the same day', () => {
        expect(
            getWeekdaysBetween(new Date('06/05/2024'), new Date('06/05/2024'))
        ).toEqual([0, 0, 0, 1, 0, 0, 0]);
        expect(
            getWeekdaysBetween(new Date('06/02/2024'), new Date('06/02/2024'))
        ).toEqual([1, 0, 0, 0, 0, 0, 0]);
        expect(
            getWeekdaysBetween(new Date('06/08/2024'), new Date('06/08/2024'))
        ).toEqual([0, 0, 0, 0, 0, 0, 1]);
    });

    it('should work when the weekday of the start date is after the weekday of the end week', () => {
        expect(
            getWeekdaysBetween(new Date('06/03/2024'), new Date('06/22/2024'))
        ).toEqual([2, 3, 3, 3, 3, 3, 3]);
        expect(
            getWeekdaysBetween(new Date('06/08/2024'), new Date('06/22/2024'))
        ).toEqual([2, 2, 2, 2, 2, 2, 3]);
    });

    it('should work when the weekday of the start date is before the weekday of the end week', () => {
        expect(
            getWeekdaysBetween(new Date('06/02/2024'), new Date('06/21/2024'))
        ).toEqual([3, 3, 3, 3, 3, 3, 2]);
    });

    it('should work when the weekday of the start date one before the weekday of the end week', () => {
        expect(
            getWeekdaysBetween(new Date('06/08/2024'), new Date('06/28/2024'))
        ).toEqual([3, 3, 3, 3, 3, 3, 3]);
        expect(
            getWeekdaysBetween(new Date('06/03/2024'), new Date('06/23/2024'))
        ).toEqual([3, 3, 3, 3, 3, 3, 3]);
        expect(
            getWeekdaysBetween(new Date('06/02/2024'), new Date('06/22/2024'))
        ).toEqual([3, 3, 3, 3, 3, 3, 3]);
    });

    it('should work with weekOff set to true', () => {
        expect(
            getWeekdaysBetween(new Date('06/08/2024'), new Date('06/28/2024'), true)
        ).toEqual([2, 2, 2, 2, 2, 2, 2]);
        expect(
            getWeekdaysBetween(new Date('06/08/2024'), new Date('06/22/2024'), true)
        ).toEqual([1, 1, 1, 1, 1, 1, 2]);
        expect(
            getWeekdaysBetween(new Date('06/05/2024'), new Date('06/05/2024'), true)
        ).toEqual([0, 0, 0, 0, 0, 0, 0]);
    });
});