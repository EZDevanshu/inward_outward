import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import Sidebar from '../../components/common/Sidebar.jsx';
import { masterData } from '../../data/masterData.js';

const ModeMaster = () => {
  const [modes, setModes] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    setModes(masterData.getModes());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const updated = masterData.addMode(name.trim());
    setModes(updated);
    setName('');
  };

  const handleDelete = (index) => {
    const updated = masterData.deleteMode(index);
    setModes(updated);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-main">
          <h1>Mode Master</h1>
          <form onSubmit={handleAdd} className="inward-form">
            <div className="form-section">
              <h3>Add Mode</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Mode Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Add Mode</button>
              </div>
            </div>
          </form>

          <div className="recent-list">
            <h3>Modes</h3>
            <ul>
              {modes.map((m, i) => (
                <li key={i}>
                  <span>{m}</span>
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

export default ModeMaster;
