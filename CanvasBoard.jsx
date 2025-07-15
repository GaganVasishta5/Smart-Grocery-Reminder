// src/components/CanvasBoard.jsx
import { useRef, useEffect, useState } from "react";

function CanvasBoard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#333";
  }, []);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h5 className="card-title"> Grocery Sketch Pad (Canvas)</h5>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{
            border: "1px solid #ccc",
            width: "100%",
            height: "300px",
            borderRadius: "5px",
            cursor: "crosshair"
          }}
        />
        <button className="btn btn-sm btn-danger mt-3" onClick={clearCanvas}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
}

export default CanvasBoard;
