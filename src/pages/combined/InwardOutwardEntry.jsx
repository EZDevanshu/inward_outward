import React from 'react';
import Header from '../../components/common/Header.jsx';
import Sidebar from '../../components/common/Sidebar.jsx';

const InwardOutwardEntry = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="page-main">
          <h1>Combined Inward & Outward Entry</h1>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default InwardOutwardEntry;
