import React from 'react';

interface DashboardPageProps {
  isConnected: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ isConnected }) => {
  return (
    <div className="dashboard-page">
      <h1 className="welcome-header">Welcome, EOS Pro V2 User</h1>
      
      <div className="stats-cards-row">
        <div className="stats-card">
          <div className="stats-title">Connection Status</div>
          <div className="stats-value">
            <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-title">Battery Level</div>
          <div className="stats-value">
            <div className="battery-bar-container">
              <div className="battery-bar green" style={{ width: '85%' }}></div>
            </div>
            <span>85%</span>
          </div>
        </div>
        <div className="stats-card">
          <div className="stats-title">Firmware Version</div>
          <div className="stats-value">v2.4.1</div>
        </div>
        <div className="stats-card">
          <div className="stats-title">Input Latency</div>
          <div className="stats-value">2ms</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="controller-info-card card">
          <h2>Controller Info</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">EOS Pro V2</span>
            </div>
            <div className="info-item">
              <span className="label">Type:</span>
              <span className="value">XInput Compatible</span>
            </div>
            <div className="info-item">
              <span className="label">Vendor ID:</span>
              <span className="value">0x1234</span>
            </div>
            <div className="info-item">
              <span className="label">Axes Count:</span>
              <span className="value">6</span>
            </div>
            <div className="info-item">
              <span className="label">Button Count:</span>
              <span className="value">16</span>
            </div>
          </div>
        </div>

        <div className="quick-actions-card card">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn">Test Buttons</button>
            <button className="action-btn">Calibrate Gyro</button>
            <button className="action-btn">Manage DLLs</button>
            <button className="action-btn">Check Updates</button>
          </div>
        </div>

        <div className="recent-activity-card card">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>
              <span className="time">10:45 AM</span>
              <span className="event">Controller connected</span>
            </li>
            <li>
              <span className="time">10:42 AM</span>
              <span className="event">Controller disconnected</span>
            </li>
            <li>
              <span className="time">09:15 AM</span>
              <span className="event">Firmware checked for updates</span>
            </li>
            <li>
              <span className="time">Yesterday</span>
              <span className="event">Gyroscope calibrated</span>
            </li>
            <li>
              <span className="time">Yesterday</span>
              <span className="event">DLL 'XInput1_4.dll' loaded</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
