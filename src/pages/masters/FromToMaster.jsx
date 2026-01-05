import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import Sidebar from '../../components/common/Sidebar.jsx';
import { masterData } from '../../data/masterData.js';

const FromToMaster = () => {
  const [list, setList] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    setList(masterData.getFromTo());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;
    const obj = { from: from.trim(), to: to.trim() };
    const updated = masterData.addFromTo(obj);
    setList(updated);
    setFrom('');
    setTo('');
  };

  const handleDelete = (index) => {
    const updated = masterData.deleteFromTo(index);
    setList(updated);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-main">
          <h1>From / To Master</h1>
          <form onSubmit={handleAdd} className="inward-form">
            <div className="form-section">
              <h3>Add From/To</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>From</label>
                  <input value={from} onChange={e => setFrom(e.target.value)} />
                </div>
                <div className="form-group full-width">
                  <label>To</label>
                  <input value={to} onChange={e => setTo(e.target.value)} />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Add</button>
              </div>
            </div>
          </form>

          <div className="recent-list">
            <h3>From/To List</h3>
            <ul>
              {list.map((ft, i) => (
                <li key={i}>
                  <span>{ft.from} → {ft.to}</span>
                  <button 
                    type="button" 
                    onClick={() => handleDelete(i)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromToMaster;
