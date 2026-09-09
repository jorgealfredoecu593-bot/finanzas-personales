import React, { useState } from 'react';

const CATEGORIES = {
  income: ['Salario', 'Freelance', 'Inversiones', 'Otros'],
  expense: ['Alimentación', 'Transporte', 'Servicios', 'Entretenimiento', 'Salud', 'Otros']
};

function TransactionForm({ onAdd, onPageChange }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: 'Alimentación',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'type') {
        updated.category = CATEGORIES[value][0];
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Por favor ingresa una cantidad válida');
      return;
    }
    onAdd(formData);
    setFormData({
      type: 'expense',
      category: 'Alimentación',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    onPageChange('dashboard');
  };

  return (
    <div className="transaction-form">
      <h1>Registrar Movimiento</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <select 
            id="type"
            name="type" 
            value={formData.type} 
            onChange={handleChange}
          >
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select 
            id="category"
            name="category" 
            value={formData.category} 
            onChange={handleChange}
          >
            {CATEGORIES[formData.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Cantidad</label>
          <input 
            id="amount"
            type="number" 
            name="amount" 
            value={formData.amount} 
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <input 
            id="description"
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            placeholder="Opcional"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Fecha</label>
          <input 
            id="date"
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => onPageChange('dashboard')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;