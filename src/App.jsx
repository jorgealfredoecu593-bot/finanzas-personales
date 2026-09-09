import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import Navigation from './components/Navigation';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="app-main">
        {currentPage === 'dashboard' && (
          <Dashboard transactions={transactions} onDelete={deleteTransaction} />
        )}
        {currentPage === 'add-transaction' && (
          <TransactionForm onAdd={addTransaction} onPageChange={setCurrentPage} />
        )}
      </main>
    </div>
  );
}

export default App;