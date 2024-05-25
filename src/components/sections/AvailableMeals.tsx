import { FILLER_MEALS } from '../../static/constants';
import MealContainer from '../containers/MealContainer';
import CustomMeal from '../other/CustomMeal';

/**
 * Renders the Available Meals section with a table of meals to add and a button
 * to add a custom meal. Displays the add custommeal modal when the button is clicked.
 *
 * @return {JSX.Element} The Available Meals section component.
 */
const AvailableMeals = () => {
  return (
    <MealContainer 
      title='Available Meals'
      addOrRemove='add'
      meals={FILLER_MEALS}
      buttonOnClick={(meal) => console.log(`added meal ${meal.name}`)}>
      <CustomMeal />
    </MealContainer>
  );
};

export default AvailableMeals;
