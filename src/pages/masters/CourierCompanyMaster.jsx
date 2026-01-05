import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import Sidebar from '../../components/common/Sidebar.jsx';
import { masterData } from '../../data/masterData.js';

const CourierCompanyMaster = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    setList(masterData.getCouriers());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const updated = masterData.addCourier(name.trim());
    setList(updated);
    setName('');
  };

  const handleDelete = (index) => {
    const updated = masterData.deleteCourier(index);
    setList(updated);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-main">
          <h1>Courier Company Master</h1>
          <form onSubmit={handleAdd} className="inward-form">
            <div className="form-section">
              <h3>Add Courier Company</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Courier Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Add Courier</button>
              </div>
            </div>
          </form>

          <div className="recent-list">
            <h3>Couriers</h3>
            <ul>
              {list.map((c, i) => (
                <li key={i}>
                  <span>{c}</span>
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

export default CourierCompanyMaster;
