import meals from "../static/mealsDatabase";

type mealsIndexType = { [key: string]: number };

export const mealsIndex = meals.reduce<mealsIndexType>((o, m, i) => {
    o[m.id as string] = i;
    return o;
}, {});