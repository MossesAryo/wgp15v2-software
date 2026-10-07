import { useState, useEffect } from 'react';
import TitleBar from './components/TitleBar';
import ConnectScreen from './components/ConnectScreen';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import GamepadTestPage from './pages/GamepadTestPage';
import GyroscopePage from './pages/GyroscopePage';
import DllManagerPage from './pages/DllManagerPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

export type Page = 'dashboard' | 'gamepad-test' | 'gyroscope' | 'dll-manager' | 'settings';

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  useEffect(() => {
    const handleGamepadConnected = (e: GamepadEvent) => {
      console.log('Gamepad connected', e.gamepad);
      setIsConnected(true);
    };

    const handleGamepadDisconnected = (e: GamepadEvent) => {
      console.log('Gamepad disconnected', e.gamepad);
      setIsConnected(false);
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // Check if gamepad is already connected
    const gamepads = navigator.getGamepads();
    if (gamepads.some((g) => g !== null)) {
      setIsConnected(true);
    }

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage isConnected={isConnected} />;
      case 'gamepad-test':
        return <GamepadTestPage />;
      case 'gyroscope':
        return <GyroscopePage />;
      case 'dll-manager':
        return <DllManagerPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage isConnected={isConnected} />;
    }
  };

  return (
    <>
      <TitleBar />
      {isFirstLaunch ? (
        <ConnectScreen
          isConnected={isConnected}
          onConnect={() => setIsFirstLaunch(false)}
        />
      ) : (
        <div className="app-container">
          <Sidebar
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            isConnected={isConnected}
          />
          <main className="main-content">{renderPage()}</main>
        </div>
      )}
    </>
  );
}

export default App;
