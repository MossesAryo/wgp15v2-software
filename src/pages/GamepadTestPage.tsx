import { useEffect, useRef, useState } from 'react';

interface GamepadState {
  buttons: boolean[];
  axes: number[];
}

const GamepadTestPage = () => {
  const [state, setState] = useState<GamepadState>({ buttons: [], axes: [] });
  const requestRef = useRef<number>();

  const updateGamepadState = () => {
    const gamepads = navigator.getGamepads();
    const gp = gamepads.find(g => g !== null);
    if (gp) {
      setState({
        buttons: gp.buttons.map(b => b.pressed),
        axes: [...gp.axes],
      });
    }
    requestRef.current = requestAnimationFrame(updateGamepadState);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGamepadState);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleVibrate = () => {
    const gamepads = navigator.getGamepads();
    const gp = gamepads.find(g => g !== null);
    if (gp && gp.vibrationActuator) {
      gp.vibrationActuator.playEffect('dual-rumble', {
        startDelay: 0,
        duration: 500,
        weakMagnitude: 1.0,
        strongMagnitude: 1.0,
      });
    }
  };

  return (
    <div className="gamepad-test-page">
      <h1>Gamepad Test</h1>
      
      <div className="gamepad-visual">
        <div className="gamepad-layout">
          {/* Visual representations (simplified via CSS classes) */}
          <div className={`btn-dpad up ${state.buttons[12] ? 'pressed' : ''}`}></div>
          <div className={`btn-dpad down ${state.buttons[13] ? 'pressed' : ''}`}></div>
          <div className={`btn-dpad left ${state.buttons[14] ? 'pressed' : ''}`}></div>
          <div className={`btn-dpad right ${state.buttons[15] ? 'pressed' : ''}`}></div>
          
          <div className={`btn-action y ${state.buttons[3] ? 'pressed' : ''}`}>Y</div>
          <div className={`btn-action x ${state.buttons[2] ? 'pressed' : ''}`}>X</div>
          <div className={`btn-action b ${state.buttons[1] ? 'pressed' : ''}`}>B</div>
          <div className={`btn-action a ${state.buttons[0] ? 'pressed' : ''}`}>A</div>
          
          <div className={`btn-bumper lb ${state.buttons[4] ? 'pressed' : ''}`}>LB</div>
          <div className={`btn-bumper rb ${state.buttons[5] ? 'pressed' : ''}`}>RB</div>
          
          <div className="trigger-bar lt">
            <div className="trigger-fill" style={{ height: `${(state.buttons[6] ? 1 : 0) * 100}%` }}></div>
          </div>
          <div className="trigger-bar rt">
            <div className="trigger-fill" style={{ height: `${(state.buttons[7] ? 1 : 0) * 100}%` }}></div>
          </div>

          <div className={`btn-menu start ${state.buttons[9] ? 'pressed' : ''}`}>Start</div>
          <div className={`btn-menu select ${state.buttons[8] ? 'pressed' : ''}`}>Select</div>
          <div className={`btn-menu home ${state.buttons[16] ? 'pressed' : ''}`}>Home</div>

          <div className={`analog-stick ls ${state.buttons[10] ? 'pressed' : ''}`}>
            <div 
              className="stick-dot" 
              style={{ 
                transform: `translate(${state.axes[0] * 20}px, ${state.axes[1] * 20}px)` 
              }}
            ></div>
          </div>
          <div className={`analog-stick rs ${state.buttons[11] ? 'pressed' : ''}`}>
            <div 
              className="stick-dot" 
              style={{ 
                transform: `translate(${state.axes[2] * 20}px, ${state.axes[3] * 20}px)` 
              }}
            ></div>
          </div>
        </div>
      </div>

      <button className="vibrate-btn" onClick={handleVibrate}>Test Vibration</button>

      <div className="raw-values-panel">
        <h3>Raw Values</h3>
        <div className="values-grid">
          <div className="buttons-values">
            <h4>Buttons</h4>
            <div className="values-list">
              {state.buttons.map((pressed, i) => (
                <span key={i} className={`value-badge ${pressed ? 'active' : ''}`}>
                  B{i}: {pressed ? '1' : '0'}
                </span>
              ))}
            </div>
          </div>
          <div className="axes-values">
            <h4>Axes</h4>
            <div className="values-list">
              {state.axes.map((val, i) => (
                <span key={i} className="value-badge">
                  A{i}: {val.toFixed(2)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamepadTestPage;
