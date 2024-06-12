import mapUserMeals from '../lib/mapUserMeals';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { v4 as uuid } from 'uuid';
import { Weekday } from '../types/userSelectedMealsObject';

// Mocking the uuid function to return predictable values
vi.mock('uuid', () => ({
  v4: vi.fn()
}));

const selectedDays = [0, 1, 2, 3, 4, 5, 6];
const userSelectedMeals = {
  value: {
    Monday: [
      { id: '1', instanceId: '1' },
      { id: '2', instanceId: '2' }
    ],
    Tuesday: [
      { id: '3', instanceId: '3' },
      { id: '4', instanceId: '4' }
    ],
    Wednesday: [
      { id: '5', instanceId: '5' },
      { id: '6', instanceId: '6' }
    ],
    Thursday: [
      { id: '7', instanceId: '7' },
      { id: '8', instanceId: '8' }
    ],
    Friday: [
      { id: '9', instanceId: '9' },
      { id: '10', instanceId: '10' }
    ],
    Saturday: [
      { id: '11', instanceId: '11' },
      { id: '12', instanceId: '12' }
    ],
    Sunday: [
      { id: '13', instanceId: '13' },
      { id: '14', instanceId: '14' }
    ]
  }
};
const mealQueue = {
  value: [
    {
      id: '15'
    },
    {
      id: '16'
    }
  ]
};

describe('mapUserMeals', () => {
  beforeEach(() => {
    // Reset the mocked uuid function before each test
    vi.mocked(uuid).mockReset();
  });

  it('should return an object with 7 keys', () => {
    expect(Object.keys(mapUserMeals((day) => [day, []])).length).toBe(7);
  });

  it('should return an object with the correct keys and values', () => {
    // Mocking the uuid function to return specific values in sequence
    vi.mocked(uuid)
      .mockReturnValueOnce('mock-uuid-1')
      .mockReturnValueOnce('mock-uuid-2')
      .mockReturnValueOnce('mock-uuid-3')
      .mockReturnValueOnce('mock-uuid-4')
      .mockReturnValueOnce('mock-uuid-5')
      .mockReturnValueOnce('mock-uuid-6')
      .mockReturnValueOnce('mock-uuid-7')
      .mockReturnValueOnce('mock-uuid-8')
      .mockReturnValueOnce('mock-uuid-9')
      .mockReturnValueOnce('mock-uuid-10')
      .mockReturnValueOnce('mock-uuid-11')
      .mockReturnValueOnce('mock-uuid-12')
      .mockReturnValueOnce('mock-uuid-13')
      .mockReturnValueOnce('mock-uuid-14');

    const result = mapUserMeals((day: Weekday, index: number) =>
      selectedDays.includes(index)
        ? [
            day,
            userSelectedMeals.value[day].concat(
              mealQueue.value.map((m) => ({ ...m, instanceId: uuid() }))
            )
          ]
        : [day, userSelectedMeals.value[day]]
    );

    expect(result).toStrictEqual({
      Sunday: [
        { id: '13', instanceId: '13' },
        { id: '14', instanceId: '14' },
        { id: '15', instanceId: 'mock-uuid-1' },
        { id: '16', instanceId: 'mock-uuid-2' }
      ],
      Monday: [
        { id: '1', instanceId: '1' },
        { id: '2', instanceId: '2' },
        { id: '15', instanceId: 'mock-uuid-3' },
        { id: '16', instanceId: 'mock-uuid-4' }
      ],
      Tuesday: [
        { id: '3', instanceId: '3' },
        { id: '4', instanceId: '4' },
        { id: '15', instanceId: 'mock-uuid-5' },
        { id: '16', instanceId: 'mock-uuid-6' }
      ],
      Wednesday: [
        { id: '5', instanceId: '5' },
        { id: '6', instanceId: '6' },
        { id: '15', instanceId: 'mock-uuid-7' },
        { id: '16', instanceId: 'mock-uuid-8' }
      ],
      Thursday: [
        { id: '7', instanceId: '7' },
        { id: '8', instanceId: '8' },
        { id: '15', instanceId: 'mock-uuid-9' },
        { id: '16', instanceId: 'mock-uuid-10' }
      ],
      Friday: [
        { id: '9', instanceId: '9' },
        { id: '10', instanceId: '10' },
        { id: '15', instanceId: 'mock-uuid-11' },
        { id: '16', instanceId: 'mock-uuid-12' }
      ],
      Saturday: [
        { id: '11', instanceId: '11' },
        { id: '12', instanceId: '12' },
        { id: '15', instanceId: 'mock-uuid-13' },
        { id: '16', instanceId: 'mock-uuid-14' }
      ]
    });

    // Further debugging output if needed
    expect(result).toHaveProperty('Monday');
    expect(result.Monday).toHaveLength(4);
  });
});
