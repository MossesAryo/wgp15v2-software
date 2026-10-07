import { useEffect, useState, useRef } from 'react';

const GyroscopePage = () => {
  const [gyroData, setGyroData] = useState({ pitch: 0, roll: 0, yaw: 0 });
  const [sensitivity, setSensitivity] = useState(50);
  const requestRef = useRef<number>();
  const graphCanvasRef = useRef<HTMLCanvasElement>(null);
  const dataHistory = useRef<{ p: number; r: number; y: number }[]>([]);

  const updateGyro = () => {
    const t = Date.now() / 1000;
    // Simulate gyro data if none exists on axes 2-5
    const pitch = Math.sin(t) * 90;
    const roll = Math.cos(t * 1.5) * 90;
    const yaw = Math.sin(t * 0.5) * 180;

    const currentData = { pitch, roll, yaw };
    setGyroData(currentData);

    dataHistory.current.push(currentData);
    if (dataHistory.current.length > 100) {
      dataHistory.current.shift();
    }
    drawGraph();

    requestRef.current = requestAnimationFrame(updateGyro);
  };

  const drawGraph = () => {
    const canvas = graphCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;
    const points = dataHistory.current;

    const drawLine = (key: 'p' | 'r' | 'y', color: string, scale: number) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      points.forEach((pt, i) => {
        const x = (i / 100) * width;
        const y = height / 2 - (pt[key] / scale) * (height / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    drawLine('p', 'red', 180);
    drawLine('r', 'green', 180);
    drawLine('y', 'blue', 180);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGyro);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="gyroscope-page">
      <h1>Gyroscope</h1>
      
      <div className="gyro-visuals">
        <div className="gyro-3d-container">
          <div 
            className="controller-3d-box"
            style={{
              transform: `rotateX(${gyroData.pitch}deg) rotateY(${gyroData.yaw}deg) rotateZ(${gyroData.roll}deg)`
            }}
          >
            <div className="box-face front">Front</div>
            <div className="box-face back">Back</div>
            <div className="box-face top">Top</div>
            <div className="box-face bottom">Bottom</div>
            <div className="box-face left">Left</div>
            <div className="box-face right">Right</div>
          </div>
        </div>
        
        <div className="gauges-container">
          <div className="gauge">
            <h3>Pitch</h3>
            <div className="gauge-value">{gyroData.pitch.toFixed(1)}°</div>
          </div>
          <div className="gauge">
            <h3>Roll</h3>
            <div className="gauge-value">{gyroData.roll.toFixed(1)}°</div>
          </div>
          <div className="gauge">
            <h3>Yaw</h3>
            <div className="gauge-value">{gyroData.yaw.toFixed(1)}°</div>
          </div>
        </div>
      </div>

      <div className="gyro-controls">
        <button className="btn-calibrate" onClick={() => setGyroData({ pitch: 0, roll: 0, yaw: 0 })}>
          Calibrate (Zero)
        </button>
        <div className="sensitivity-control">
          <label>Sensitivity</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sensitivity} 
            onChange={(e) => setSensitivity(Number(e.target.value))} 
          />
          <span>{sensitivity}%</span>
        </div>
      </div>

      <div className="gyro-graph">
        <h3>Real-time Data</h3>
        <canvas ref={graphCanvasRef} width="600" height="150" className="graph-canvas"></canvas>
      </div>

      <div className="raw-sensor-data">
        <h3>Raw Data Panel</h3>
        <div className="sensor-values">
          <span>Pitch: {gyroData.pitch.toFixed(4)}</span>
          <span>Roll: {gyroData.roll.toFixed(4)}</span>
          <span>Yaw: {gyroData.yaw.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
};

export default GyroscopePage;
