import { useContext, useState } from 'react';
import { FinanceContext } from '../FinanceContext';

const TransactionList = () => {
  const { transactions, setTransactions, role } = useContext(FinanceContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for the "Add Transaction" form
  const [newTx, setNewTx] = useState({
    date: '', amount: '', category: '', type: 'expense'
  });

  // Filter transactions based on the search term (checks category and date)
  const filteredTransactions = transactions.filter(tx => 
    tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.date.includes(searchTerm)
  );

  // Handle adding a new transaction
  const handleAddTransaction = (e) => {
    e.preventDefault(); // Prevents page reload
    if (!newTx.date || !newTx.amount || !newTx.category) return;

    const transactionToAdd = {
      id: Date.now(), // Create a unique ID
      date: newTx.date,
      amount: parseFloat(newTx.amount), // Ensure amount is a number
      category: newTx.category,
      type: newTx.type
    };

    // Add new transaction to the beginning of the list
    setTransactions([transactionToAdd, ...transactions]);
    
    // Reset the form
    setNewTx({ date: '', amount: '', category: '', type: 'expense' });
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h3>Recent Transactions</h3>
        <input 
          type="text" 
          placeholder="Search by category or date..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* RBAC Logic: Only show this form if the role is 'admin' */}
      {role === 'admin' && (
        <form className="add-transaction-form" onSubmit={handleAddTransaction}>
          <input type="date" required value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} />
          <input type="number" placeholder="Amount ($)" required value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} />
          <input type="text" placeholder="Category (e.g. Food)" required value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} />
          <select value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value})}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button type="submit">Add Transaction</button>
        </form>
      )}

      {/* The Transactions Table */}
      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td>{tx.category}</td>
                  <td>
                    <span className={`badge ${tx.type}`}>{tx.type}</span>
                  </td>
                  <td className={tx.type === 'income' ? 'text-green' : 'text-red'}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-state">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;