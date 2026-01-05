import React from 'react';
import Header from '../../components/common/Header.jsx';
import Sidebar from '../../components/common/Sidebar.jsx';
import InwardForm from './InwardFormBasic.jsx';
import { inwardData } from '../../data/inwardData.js';

const InwardEntry = () => {
  const handleSave = (entry) => {
    // Save entry logic here
    console.log('Saved:', entry);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-main">
          <h1>Inward Entry</h1>
          <InwardForm onSave={handleSave} />
          <div className="recent-list">
            Recent: {inwardData.slice(0, 3).map(e => e.inwardNo).join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InwardEntry;
