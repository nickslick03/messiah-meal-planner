interface Meal {
  id?: string;
  instanceId?: string;
  isCustom?: boolean;
  location: string;
  name: string;
  price: number;
}

export default Meal;
