import { IoRemove } from "react-icons/io5";
import SectionContainer from "../containers/SectionContainer"
import MealTable from "../containers/table/MealTable";
import { WEEKDAY_ABBREVIATIONS } from "../../static/constants";
import Input from "../form_elements/Input";
import Button from "../form_elements/Button";
import { useEffect, useReducer } from "react";

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

    useEffect(() => console.log(selectedDays));

    return (
        <SectionContainer title={"Meal Queue"}>
            <MealTable
                // Temporary AI-generated data, will be replaced with real data later on...apparently
                // my extension really likes fries:)
                data={[
                {
                    location: 'Home',
                    name: 'Cheeseburger and Fries',
                    price: 12.99
                },
                {
                    location: 'Work',
                    name: 'Hamburger and Fries',
                    price: 10.99
                },
                {
                    location: 'School',
                    name: 'Pizza and Fries',
                    price: 11.99
                },
                {
                    location: 'Home',
                    name: 'Salad and Fries',
                    price: 9.99
                },
                {
                    location: 'Work',
                    name: 'Pasta and Fries',
                    price: 12.99
                }
                ]}
                buttonTitle='Add'
                buttonIcon={<IoRemove />}
                buttonOnClick={() => {}}
            />
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
        </SectionContainer>
        
        
    );
};

export default MealQueue;