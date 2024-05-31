import { useContext, useMemo } from 'react';
import SectionContainer from '../containers/SectionContainer';
import DotLeader from '../other/DotLeader';
import { BalanceCtx } from '../../static/context';
import formatCurrency from '../../lib/formatCurrency';

/**
 * Renders the results of the meal planning.
 */
const Results = () => {
  const balance = useContext(BalanceCtx);

  const isUnderBalance = useMemo(() => balance.value >= 1000, [balance]);
  const difference = useMemo(() => {
    const b = balance.value || 0;
    return Math.abs(b - 1000).toFixed(2);
  }, [balance]);

  return (
    <SectionContainer title='Results'>
      <DotLeader
        info={[
          {
            title: 'Starting Balance',
            value: formatCurrency(balance.value || 0),
            resultsStyle: 'text-messiah-green'
          },
          {
            title: 'Weekly Total',
            value: '$100.00',
            resultsStyle: 'text-messiah-red'
          },
          {
            title: 'Grand Total',
            value: '$1000.00',
            resultsStyle: 'text-messiah-red'
          }
        ]}
      />
      <div
        className={`${
          isUnderBalance ? 'text-messiah-green' : 'text-messiah-red'
        } text-xl font-bold mt-4`}
      >
        {isUnderBalance
          ? `You have an extra $${difference}!`
          : `You have overspent by $${difference}.`}
      </div>
    </SectionContainer>
  );
};

export default Results;
