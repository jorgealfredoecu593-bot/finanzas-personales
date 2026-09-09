import React from 'react';

function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>💰 Finanzas</h2>
      </div>
      <div className="nav-menu">
        <button
          className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-link ${currentPage === 'add-transaction' ? 'active' : ''}`}
          onClick={() => setCurrentPage('add-transaction')}
        >
          ➕ Nuevo Movimiento
        </button>
      </div>
    </nav>
  );
}

export default Navigation;