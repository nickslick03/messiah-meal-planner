interface Meal {
  location: string;
  name: string;
  price: number;
}

const meals: Array<Array<Meal>> = [
  [
    {
      location: '',
      name: '',
      price: 0
    }
  ]
];

export default meals;
