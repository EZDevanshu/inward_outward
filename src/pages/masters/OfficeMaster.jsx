import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import Sidebar from '../../components/common/Sidebar.jsx';
import { masterData } from '../../data/masterData.js';

const OfficeMaster = () => {
  const [offices, setOffices] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    setOffices(masterData.getOffices());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const updated = masterData.addOffice(name.trim());
    setOffices(updated);
    setName('');
  };

  const handleDelete = (index) => {
    const updated = masterData.deleteOffice(index);
    setOffices(updated);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-main">
          <h1>Office Master</h1>
          <form onSubmit={handleAdd} className="inward-form">
            <div className="form-section">
              <h3>Add Office</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Office Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Add Office</button>
              </div>
            </div>
          </form>

          <div className="recent-list">
            <h3>Offices</h3>
            <ul>
              {offices.map((o, i) => (
                <li key={i}>
                  <span>{o}</span>
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

export default OfficeMaster;
