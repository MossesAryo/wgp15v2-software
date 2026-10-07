import { useState } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    autoConnect: true,
    startMinimized: false,
    checkUpdates: true,
    vibrationIntensity: 80,
    deadzone: 10,
    gyroSensitivity: 50,
    autoLoadDlls: true,
    dllSearchPath: 'C:/Program Files/EOS/DLLs',
    debugLogging: false,
  });

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-section">
        <h2>General</h2>
        <div className="setting-item">
          <label>Auto-connect on startup</label>
          <input 
            type="checkbox" 
            checked={settings.autoConnect} 
            onChange={(e) => handleChange('autoConnect', e.target.checked)} 
          />
        </div>
        <div className="setting-item">
          <label>Start minimized</label>
          <input 
            type="checkbox" 
            checked={settings.startMinimized} 
            onChange={(e) => handleChange('startMinimized', e.target.checked)} 
          />
        </div>
        <div className="setting-item">
          <label>Check for updates</label>
          <input 
            type="checkbox" 
            checked={settings.checkUpdates} 
            onChange={(e) => handleChange('checkUpdates', e.target.checked)} 
          />
        </div>
      </div>

      <div className="settings-section">
        <h2>Controller</h2>
        <div className="setting-item">
          <label>Vibration Intensity ({settings.vibrationIntensity}%)</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={settings.vibrationIntensity} 
            onChange={(e) => handleChange('vibrationIntensity', Number(e.target.value))} 
          />
        </div>
        <div className="setting-item">
          <label>Deadzone ({settings.deadzone}%)</label>
          <input 
            type="range" 
            min="0" 
            max="30" 
            value={settings.deadzone} 
            onChange={(e) => handleChange('deadzone', Number(e.target.value))} 
          />
        </div>
        <div className="setting-item">
          <label>Gyro Sensitivity ({settings.gyroSensitivity}%)</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={settings.gyroSensitivity} 
            onChange={(e) => handleChange('gyroSensitivity', Number(e.target.value))} 
          />
        </div>
      </div>

      <div className="settings-section">
        <h2>DLL</h2>
        <div className="setting-item">
          <label>Auto-load DLLs</label>
          <input 
            type="checkbox" 
            checked={settings.autoLoadDlls} 
            onChange={(e) => handleChange('autoLoadDlls', e.target.checked)} 
          />
        </div>
        <div className="setting-item">
          <label>DLL Search Path</label>
          <div className="path-input-group">
            <input 
              type="text" 
              value={settings.dllSearchPath} 
              onChange={(e) => handleChange('dllSearchPath', e.target.value)} 
            />
            <button className="btn-secondary">Browse</button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2>Advanced</h2>
        <div className="setting-item">
          <label>Enable debug logging</label>
          <input 
            type="checkbox" 
            checked={settings.debugLogging} 
            onChange={(e) => handleChange('debugLogging', e.target.checked)} 
          />
        </div>
        <div className="settings-actions">
          <button className="btn-secondary">Reset to Defaults</button>
          <button className="btn-secondary">Export Config</button>
          <button className="btn-secondary">Import Config</button>
        </div>
      </div>

      <div className="settings-section about-section">
        <h2>About</h2>
        <p>App Version: v1.0.0</p>
        <p>Tauri Version: 2.0.0</p>
        <p>Build Date: 2026-10-07</p>
        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub Repository</a>
      </div>

      <div className="settings-footer">
        <button className="btn-primary">Save & Apply</button>
      </div>
    </div>
  );
};

export default SettingsPage;
