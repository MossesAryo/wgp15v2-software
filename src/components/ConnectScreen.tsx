import { useEffect, useState } from 'react';

interface ConnectScreenProps {
  isConnected: boolean;
  onConnect: () => void;
}

const ConnectScreen = ({ isConnected, onConnect }: ConnectScreenProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    let interval: number;
    if (!isConnected) {
      interval = window.setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        onConnect();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConnected, onConnect]);

  return (
    <div className="connect-screen">
      <div className="connect-content">
        <div className={`gamepad-animation-container ${isConnected ? 'connected' : ''}`}>
          <div className="pulse-ring"></div>
          <svg
            className="gamepad-svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="6" width="20" height="12" rx="6" ry="6" />
            <path d="M12 12v.01" />
            <path d="M16 12v.01" />
            <path d="M8 12v.01" />
            <path d="M6 12h.01" />
            <path d="M10 12h.01" />
            <path d="M14 12h.01" />
            <path d="M18 12h.01" />
          </svg>
        </div>
        <h1 className="connect-title">{isConnected ? 'EOS Pro V2 Connected!' : 'Connect Your Controller'}</h1>
        <p className="connect-subtitle">
          {isConnected ? 'Preparing dashboard...' : 'Please connect your EOS Pro V2 gamepad to get started'}
        </p>
        <div className="connect-status">
          {isConnected ? (
            <div className="success-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          ) : (
            <div className="searching-indicator">
              <div className="spinner"></div>
              <span>Searching for devices{dots}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectScreen;
