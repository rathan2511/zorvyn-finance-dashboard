import { useContext } from 'react';
import { FinanceContext } from '../FinanceContext';

const Insights = () => {
  const { transactions } = useContext(FinanceContext);

  // 1. Get only expenses
  const expenses = transactions.filter(t => t.type === 'expense');

  // 2. Find Highest Spending Category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // Convert object to array, sort by amount descending, and grab the first one
  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  const highestCategory = sortedCategories.length > 0 ? sortedCategories[0] : null;

  // 3. Find the single largest expense
  const largestExpense = expenses.length > 0 
    ? expenses.reduce((max, curr) => curr.amount > max.amount ? curr : max, expenses[0]) 
    : null;

  return (
    <div className="insights-container">
      <h3>Financial Insights</h3>
      <div className="insights-grid">
        <div className="insight-card">
          <p className="insight-label">Highest Spending Category</p>
          {highestCategory ? (
            <h4 className="text-red">{highestCategory[0]} (${highestCategory[1].toLocaleString()})</h4>
          ) : (
            <h4>No data</h4>
          )}
        </div>
        
        <div className="insight-card">
          <p className="insight-label">Largest Single Expense</p>
          {largestExpense ? (
            <h4>{largestExpense.category} on {largestExpense.date} <span className="text-red">(${largestExpense.amount.toLocaleString()})</span></h4>
          ) : (
            <h4>No data</h4>
          )}
        </div>

        <div className="insight-card">
          <p className="insight-label">Total Transactions Tracked</p>
          <h4>{transactions.length}</h4>
        </div>
      </div>
    </div>
  );
};

export default Insights;