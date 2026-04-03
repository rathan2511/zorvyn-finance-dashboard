import { useContext } from 'react';
import { FinanceContext } from '../FinanceContext';

const SummaryCards = () => {
  // Grab the transactions array from context
  const { transactions } = useContext(FinanceContext);

  // Calculate totals using JavaScript array methods (filter and reduce)
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="summary-container">
      <div className="card balance-card">
        <h3>Total Balance</h3>
        <h2>${balance.toLocaleString()}</h2>
      </div>
      <div className="card income-card">
        <h3>Total Income</h3>
        <h2 className="text-green">+ ${totalIncome.toLocaleString()}</h2>
      </div>
      <div className="card expense-card">
        <h3>Total Expenses</h3>
        <h2 className="text-red">- ${totalExpense.toLocaleString()}</h2>
      </div>
    </div>
  );
};

export default SummaryCards;