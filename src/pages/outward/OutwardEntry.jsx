import React from 'react';
import Header from '../../components/common/Header.jsx';
import Sidebar from '../../components/common/Sidebar.jsx';
import OutwardForm from './OutwardForm.jsx';

const OutwardEntry = () => {
  const handleSave = (entry) => {
    console.log('Outward saved:', entry);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-main">
          <h1>Outward Entry</h1>
          <OutwardForm onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default OutwardEntry;
