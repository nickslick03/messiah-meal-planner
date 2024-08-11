import { useContext } from "react";
import { PresetMealPlan } from "../../static/PresetMealPlans";
import { MealPlanCtx } from "../../static/context";
import Button from "../form_elements/Button";
import formatCurrency from "../../lib/formatCurrency";

interface PresetMealPlanViewProps {
    presetMealPlan: PresetMealPlan;
    onSet: () => void;
}

export const PresetMealPlanView = ({
    presetMealPlan,
    onSet
}: PresetMealPlanViewProps) => {

    const hasDiscount = useContext(MealPlanCtx);

    const weekPrice = formatCurrency(presetMealPlan.weekPrice(hasDiscount.value ?? false));

    return (
        <div>
            <h3 className="text-lg font-bold mb-2">
                {presetMealPlan.name}
            </h3>           
            <div className="flex justify-between">               
                <div className="text-left flex flex-col gap-2">
                    <p className="pr-12">
                        {presetMealPlan.description}   
                    </p>
                    <p>
                        Price for 1 week: <strong>{weekPrice}</strong>
                    </p>
                </div>
                <div className="self-end [&>button]:mb-0">
                    <Button 
                        title='Set'
                        onClick={onSet}
                    />    
                </div> 
            </div>
        </div>
    );
}