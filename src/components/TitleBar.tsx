import { getCurrentWindow } from '@tauri-apps/api/window';

const TitleBar = () => {
  const appWindow = getCurrentWindow();

  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-left" data-tauri-drag-region>
        <svg
          className="titlebar-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-3 8h6M9 14h6" />
        </svg>
        <span className="titlebar-title" data-tauri-drag-region>WGP15v2 Manager</span>
        <span className="titlebar-badge" data-tauri-drag-region>v1.0.0</span>
      </div>
      <div className="titlebar-controls">
        <div className="titlebar-button" onClick={() => appWindow.minimize()}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <div className="titlebar-button" onClick={() => appWindow.toggleMaximize()}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </div>
        <div className="titlebar-button close" onClick={() => appWindow.close()}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
