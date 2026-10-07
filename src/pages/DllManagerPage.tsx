import { useState } from 'react';

interface DLLInfo {
  id: string;
  name: string;
  path: string;
  status: 'Loaded' | 'Unloaded' | 'Error';
  size: string;
}

const DllManagerPage = () => {
  const [dlls, setDlls] = useState<DLLInfo[]>([
    { id: '1', name: 'XInput1_4.dll', path: 'C:/Windows/System32/XInput1_4.dll', status: 'Loaded', size: '124 KB' },
    { id: '2', name: 'HIDGamepad.dll', path: 'C:/Program Files/EOS/HIDGamepad.dll', status: 'Loaded', size: '45 KB' },
    { id: '3', name: 'GyroMapper.dll', path: 'C:/Program Files/EOS/GyroMapper.dll', status: 'Unloaded', size: '89 KB' },
    { id: '4', name: 'VibrationDriver.dll', path: 'C:/Program Files/EOS/VibrationDriver.dll', status: 'Loaded', size: '56 KB' },
    { id: '5', name: 'CustomProfile.dll', path: 'C:/Users/User/CustomProfile.dll', status: 'Error', size: '12 KB' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDlls = dlls.filter(dll => dll.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleLoad = (id: string) => {
    setDlls(dlls.map(dll => {
      if (dll.id === id) {
        return {
          ...dll,
          status: dll.status === 'Loaded' ? 'Unloaded' : 'Loaded'
        };
      }
      return dll;
    }));
  };

  const removeDll = (id: string) => {
    setDlls(dlls.filter(dll => dll.id !== id));
  };

  return (
    <div className="dll-manager-page">
      <div className="dll-header">
        <h1>DLL Manager</h1>
        <div className="dll-header-actions">
          <button className="btn-primary">Add DLL</button>
          <button className="btn-secondary">Load All</button>
          <button className="btn-secondary">Unloaded All</button>
          <button className="btn-secondary">Refresh</button>
        </div>
      </div>

      <div className="dll-search">
        <input 
          type="text" 
          placeholder="Search DLLs..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="dll-table-container">
        <table className="dll-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Path</th>
              <th>Status</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDlls.map(dll => (
              <tr key={dll.id}>
                <td>
                  <div className="dll-name-cell">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    {dll.name}
                  </div>
                </td>
                <td className="dll-path-cell" title={dll.path}>
                  {dll.path.length > 30 ? '...' + dll.path.substring(dll.path.length - 30) : dll.path}
                </td>
                <td>
                  <span className={`status-badge ${dll.status.toLowerCase()}`}>
                    {dll.status}
                  </span>
                </td>
                <td>{dll.size}</td>
                <td>
                  <div className="dll-actions">
                    <button className="btn-action" onClick={() => toggleLoad(dll.id)}>
                      {dll.status === 'Loaded' ? 'Unload' : 'Load'}
                    </button>
                    <button className="btn-action btn-danger" onClick={() => removeDll(dll.id)}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dll-drop-zone">
        <p>Drop DLL files here</p>
      </div>
    </div>
  );
};

export default DllManagerPage;
