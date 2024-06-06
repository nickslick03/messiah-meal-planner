import meals from '../static/mealsDatabase';

type mealsIndexType = { [key: string]: number };

/**
 * A dictionary that maps each meal ID to its index in the meals array.
 * @type {mealsIndexType}
 */
export const mealsIndex = meals.reduce<mealsIndexType>((o, m, i) => {
  o[m.id as string] = i;
  return o;
}, {});
