import { useContext, useMemo, useState } from "react";
import { FILLER_MEALS, WEEKDAYS } from "../../static/constants";
import Select from "../form_elements/Select";
import { newImportanceIndex } from "../../types/ImportanceIndex";
import DotLeader from "../other/DotLeader";
import { UserSelectedMealsCtx } from "../../static/context";
import Divider from "../other/Divider";
import MealContainer from "../containers/MealContainer";



const DayEditor = () => {

    const UserSelectedMeals = useContext(UserSelectedMealsCtx);

    const [weekday, setWeekday] = useState("Monday");
    const dayMealList = useMemo(
        () => UserSelectedMeals.value[(WEEKDAYS).indexOf(weekday as typeof WEEKDAYS[number])], 
        [UserSelectedMeals, weekday]);

    return (
        <MealContainer
            title={
                <div>
                    <Select 
                        label=""
                        importance={newImportanceIndex(4)}
                        list={WEEKDAYS}
                        value={weekday}
                        setSelected={setWeekday}
                        isTitle={true}/> 
                </div>
            }
            addOrRemove="remove"
            meals={FILLER_MEALS}
            buttonOnClick={(meal) => console.log(`removed ${meal.name} from ${weekday}`)}>
            <Divider />
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
        </MealContainer>
    );
};

export default DayEditor;