import { useContext, useMemo } from "react";
import { BalanceCtx } from "../../static/context";

/**
 * Renders a results bar that sticks to the bottom of the page
 * @returns 
 */
const ResultsBar = () => {

    const balance = useContext(BalanceCtx);
    const balCurrency = useMemo(() => (balance.value || 0).toFixed(2), [balance]);
    const isUnderBalance = useMemo(() => balance.value >= 1000, [balance]);

    return (
        <div className="sticky w-full bottom-2 p-2 bg-messiah-light-blue drop-shadow-dark rounded-xl flex gap-6 justify-around text-center">
            <div>
                <span className="font-bold">
                    Starting Balance:{' '}
                </span>
                <span>
                    ${balCurrency}
                </span>
            </div>
            <div>
                <span className="font-bold">
                    Grand Total:{' '}
                </span>
                <span className={isUnderBalance ? 'text-messiah-green' : 'text-messiah-red'}>
                    ${(1000).toFixed(2)}
                </span>
            </div>
        </div>
    );
};

export default ResultsBar;