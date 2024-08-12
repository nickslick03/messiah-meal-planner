interface Meal {
  id?: string;
  instanceId?: string;
  isCustom?: boolean;
  location: string;
  name: string;
  price: number;
  unavailable?: number[]
}

export default Meal;
