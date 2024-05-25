import { useState } from "react";
import { GiMeal } from "react-icons/gi";
import Button from "../form_elements/Button";
import CustomMealAddModal from "../modals/CustomMealAddModal";

const CustomMeal = () => {

    // State variable to determine whether or not the custom meal modal should be open
    const [isAddingCustomMeal, setIsAddingCustomMeal] = useState(false);
    
    return (
        <>
            <Button
                title='Custom Meal'
                icon={<GiMeal />}
                onClick={() => setIsAddingCustomMeal(true)} />
                <CustomMealAddModal
                    onConfirm={(location, name, price) => {
                        console.log(location);
                        console.log(name);
                        console.log(price);
                        setIsAddingCustomMeal(false);
                    } }
                    onCancel={() => setIsAddingCustomMeal(false)}
                    visible={isAddingCustomMeal} />
            </>
    );
};

export default CustomMeal;