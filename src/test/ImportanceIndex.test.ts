import { newImportanceIndex, ImportanceIndex } from '../types/ImportanceIndex';
import { expect, it, describe } from 'vitest';

describe('ImportanceIndex', () => {
  it('should create a new ImportanceIndex value based on the given number value', () => {
    expect(newImportanceIndex(1)).toBe(1);
    expect(newImportanceIndex(2)).toBe(2);
    expect(newImportanceIndex(3)).toBe(3);
    expect(newImportanceIndex(4)).toBe(4);
    expect(newImportanceIndex(5)).toBe(5);
    expect(newImportanceIndex(0)).toBe(0);
  });

  it('should throw an error if the given value is not a valid importance index', () => {
    expect(() => newImportanceIndex(-1)).toThrowError(
      'Number -1 is not a valid importance index'
    );
    expect(() => newImportanceIndex(6)).toThrowError(
      'Number 6 is not a valid importance index'
    );
    expect(() => newImportanceIndex(1.5)).toThrowError(
      'Number 1.5 is not a valid importance index'
    );
  });

  it('should have the correct type for ImportanceIndex', () => {
    const importanceIndex1: ImportanceIndex = newImportanceIndex(1);
    const importanceIndex2: ImportanceIndex = newImportanceIndex(2);
    const importanceIndex3: ImportanceIndex = newImportanceIndex(3);
    const importanceIndex4: ImportanceIndex = newImportanceIndex(4);
    const importanceIndex5: ImportanceIndex = newImportanceIndex(5);
    const importanceIndex6: ImportanceIndex = newImportanceIndex(0);

    expect(importanceIndex1).toBe(1);
    expect(importanceIndex2).toBe(2);
    expect(importanceIndex3).toBe(3);
    expect(importanceIndex4).toBe(4);
    expect(importanceIndex5).toBe(5);
    expect(importanceIndex6).toBe(0);
  });
});
