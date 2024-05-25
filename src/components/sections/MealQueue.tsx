import { FILLER_MEALS, WEEKDAY_ABBREVIATIONS } from "../../static/constants";
import Input from "../form_elements/Input";
import Button from "../form_elements/Button";
import { useReducer } from "react";
import MealContainer from "../containers/MealContainer";

const MealQueue = (

) => {

    const [selectedDays, selectedDaysDispatch] = useReducer(
        (state: number[], action: { index: number, type: "add" | "remove"}) => {
            switch (action.type) {
                case 'add':
                    return state.concat(action.index);
                case 'remove':
                    return state.filter(num => num !== action.index);
                default:
                    throw new Error(`Action type ${action.type} invalid`);
            }
        }, 
        []);

    return (
        <MealContainer 
            title='Meal Queue'
            meals={FILLER_MEALS}
            addOrRemove="Remove"
            buttonOnClick={(meal) => {console.log(`removed meal ${meal.name} from queue`)}}>
            <div className="mb-4"/>
            <div className="flex justify-center flex-wrap gap-6">
                {WEEKDAY_ABBREVIATIONS.map((day, i) => 
                <Input 
                    label={`${day}.`} 
                    type="checkbox" 
                    value={selectedDays.indexOf(i) !== -1} 
                    setValue={(day) => 
                        selectedDaysDispatch({ 
                            index: i, 
                            type: day ? 'add' : 'remove'
                        })}
                    key={day} />)}    
            </div>
            <div className="flex gap-2 mt-4">
                <Button 
                    title="Add Meals to Selected Days"
                    onClick={() => {}}/>
                <Button 
                    title="Clear Meal Queue"
                    onClick={() => {}}/>
            </div>
        </MealContainer>
    );
};

export default MealQueue;