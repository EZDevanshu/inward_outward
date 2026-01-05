// src/pages/dashboard/Dashboard.jsx
import React from 'react';
import Header from '../../components/common/Header.jsx';
import Sidebar from '../../components/common/Sidebar.jsx';
import { inwardData } from '../../data/inwardData.js';
import { outwardData } from '../../data/outwardData.js';
import { masterData } from '../../data/masterData.js';

const Dashboard = () => {
  // Get today's date in YYYY-MM-DD format for filtering
  const today = new Date().toISOString().split('T')[0];

  // Calculate simple statistics from mock data
  // TODO: Replace this with API call: fetch('/api/dashboard/stats')
  const totalInward = inwardData.length;
  const totalOutward = outwardData.length;
  const todayInward = inwardData.filter(item => item.date === today).length;
  const todayOutward = outwardData.filter(item => item.date === today).length;
  const totalOffices = masterData.offices ? masterData.offices.length : 0;
  const totalCouriers = masterData.couriers ? masterData.couriers.length : 0;

  // Get recent 5 records for tables
  const recentInwards = inwardData.slice(0, 5);
  const recentOutwards = outwardData.slice(0, 5);

  return (
    <div className="dashboard-app">
      <Header />
      
      <div className="dashboard-main">
        <Sidebar />
        
        <main className="dashboard-content">
          {/* Summary Statistics Cards */}
          <section className="stats-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{totalInward}</div>
                <div className="stat-label">Total Inward</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">{totalOutward}</div>
                <div className="stat-label">Total Outward</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">{todayInward}</div>
                <div className="stat-label">Today's Inward</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-number">{todayOutward}</div>
                <div className="stat-label">Today's Outward</div>
              </div>
            </div>
          </section>

          {/* Quick Action Buttons */}
          <section className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button 
                className="action-btn primary"
                onClick={() => handleQuickAction('inward')}
              >
                ➕ Add Inward Entry
              </button>
              <button 
                className="action-btn primary"
                onClick={() => handleQuickAction('outward')}
              >
                ➕ Add Outward Entry
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => handleQuickAction('combined')}
              >
                📋 Combined Entry
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => handleQuickAction('masters')}
              >
                🏢 Office Master
              </button>
            </div>
          </section>

          {/* Recent Records Tables */}
          <section className="tables-section">
            {/* Recent Inwards Table */}
            <div className="table-container">
              <h2>Recent Inwards (5)</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Inward No</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>Mode</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInwards.map((item, index) => (
                    <tr key={index}>
                      <td>{item.inwardNo}</td>
                      <td>{item.date}</td>
                      <td>{item.from}</td>
                      <td>
                        <span className={`mode-tag ${item.mode.toLowerCase()}`}>
                          {item.mode}
                        </span>
                      </td>
                      <td>{item.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Outwards Table */}
            <div className="table-container">
              <h2>Recent Outwards (5)</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Outward No</th>
                    <th>Date</th>
                    <th>To</th>
                    <th>Mode</th>
                    <th>Courier</th>
                    <th>Tracking No</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOutwards.map((item, index) => (
                    <tr key={index}>
                      <td>{item.outwardNo}</td>
                      <td>{item.date}</td>
                      <td>{item.to}</td>
                      <td>
                        <span className={`mode-tag ${item.mode.toLowerCase()}`}>
                          {item.mode}
                        </span>
                      </td>
                      <td>{item.courier}</td>
                      <td>{item.trackingNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
