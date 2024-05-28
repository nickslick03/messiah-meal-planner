import { useContext, useMemo } from "react";
import SectionContainer from "../containers/SectionContainer"
import DotLeader from "../other/DotLeader";
import { BalanceCtx } from "../../static/context";


const Results = () => {

    const balance = useContext(BalanceCtx);

    const isOver = useMemo(() => balance.value >= 1000, [balance]);
    const difference = useMemo(() => {
        const b = balance.value || 0;
        return Math.abs(b - 1000).toFixed(2);
    }, [balance]);

    return (
        <SectionContainer title="Results">
            <DotLeader info={[
                {
                    title: "Weekly Total",
                    value: "$100.00"
                },
                {
                    title: "Grand Total",
                    value: "$1000.00",
                },
                {
                    title: "Starting Balance",
                    value: `$${(balance.value || 0).toFixed(2)}`
                }
            ]}/>
        <div className={`${isOver ? 'text-messiah-green' : 'text-messiah-red'} text-xl font-bold mt-4`}>
            {isOver 
            ? `You have $${difference} left!` 
            : `You have overspent by $${difference}.`}
        </div>
        </SectionContainer>
    )
};

export default Results;