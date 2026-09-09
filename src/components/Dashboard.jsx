import React from 'react';

function Dashboard({ transactions, onDelete }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = income - expenses;

  return (
    <div className="dashboard">
      <h1>Libro de Cuentas</h1>
      
      <div className="summary-cards">
        <div className="card income-card">
          <h3>Ingresos</h3>
          <p className="amount">${income.toFixed(2)}</p>
        </div>
        <div className="card expense-card">
          <h3>Gastos</h3>
          <p className="amount">${expenses.toFixed(2)}</p>
        </div>
        <div className="card balance-card">
          <h3>Balance</h3>
          <p className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="transactions-section">
        <h2>Movimientos Recientes</h2>
        {transactions.length === 0 ? (
          <p className="empty-state">No hay movimientos registrados</p>
        ) : (
          <div className="transactions-list">
            {transactions.map(t => (
              <div key={t.id} className={`transaction-item ${t.type}`}>
                <div className="transaction-info">
                  <p className="transaction-category">{t.category}</p>
                  <p className="transaction-description">{t.description}</p>
                </div>
                <div className="transaction-amount">
                  <span className={`amount ${t.type}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount}
                  </span>
                  <button 
                    className="delete-btn"
                    onClick={() => onDelete(t.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;