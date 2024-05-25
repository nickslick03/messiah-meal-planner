import { useContext, useMemo, useState } from "react";
import SectionContainer from "../containers/SectionContainer";
import { WEEKDAYS } from "../../static/constants";
import Select from "../form_elements/Select";
import { newImportanceIndex } from "../../types/ImportanceIndex";
import MealTable from "../containers/table/MealTable";
import { IoRemove } from "react-icons/io5";
import DotLeader from "../other/DotLeader";
import { UserSelectedMealsCtx } from "../../static/context";



const DayEditor = () => {

    const UserSelectedMeals = useContext(UserSelectedMealsCtx);

    const [weekday, setWeekday] = useState("Monday");
    const dayMealList = useMemo(
        () => UserSelectedMeals.value[(WEEKDAYS).indexOf(weekday as typeof WEEKDAYS[number])], 
        [UserSelectedMeals, weekday]);

    return (
        <SectionContainer>
            <div>
                <Select 
                    label=""
                    importance={newImportanceIndex(4)}
                    list={WEEKDAYS}
                    value={weekday}
                    setSelected={setWeekday}
                    isTitle={true}/>     
            </div>
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
                buttonTitle='Remove'
                buttonIcon={<IoRemove />}
                buttonOnClick={() => {}}
            />
            <div className="border-t-messiah-blue border-t-4 h-full w-full mb-4"></div>
            <DotLeader info={[
                {
                    title: "Weekly Total",
                    value: "$100.00"
                },
                {
                    title: "Grand Total",
                    value: "$1000.00"
                }
                ]}/>
        </SectionContainer>
    );
};

export default DayEditor;