import { createContext, useState, useEffect } from 'react';
import { initialTransactions } from './mockData';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // 1. Check local storage FIRST. If empty, use initialTransactions.
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('finance_transactions');
    return savedData ? JSON.parse(savedData) : initialTransactions;
  });
  
  const [role, setRole] = useState('viewer');

  // 2. Use useEffect to save data to local storage EVERY time 'transactions' changes
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  return (
    <FinanceContext.Provider value={{ transactions, setTransactions, role, setRole }}>
      {children}
    </FinanceContext.Provider>
  );
};