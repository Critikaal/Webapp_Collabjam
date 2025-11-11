import React, { useState } from 'react';

export default function Canvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const selWidthRef = React.useRef<HTMLSelectElement | null>(null);
  const selColorRef = React.useRef<HTMLSelectElement | null>(null);
  const ongoingTouchesRef = React.useRef<
    Array<{ identifier: number; clientX: number; clientY: number }>
  >([]);
  const isDrawingRef = React.useRef<boolean>(false);
  const lastPosRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [tool, setTool] = React.useState<"pencil" | "line" | "bucket" | "eraser">(
    "pencil"
  );
  const savedImageRef = React.useRef<ImageData | null>(null);
  const lineStartRef = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // ...rest of the effect handler unchanged...
    // (keep the same functions and event hookup you already have)
  }, [tool]);

  function clearArea() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // ...return JSX unchanged...
  return (
    <>
      <style>{/* ...styles... */}</style>
      <div id="canvas_div" style={{ overflowX: "auto" }}>
        <div className="toolbar" role="toolbar" aria-label="drawing tools">
          <div>
            <label>Tool: </label>
            <select
              value={tool}
              onChange={(e) =>
                setTool(e.target.value as "pencil" | "line" | "bucket" | "eraser")
              }
            >
              <option value="pencil">Pencil</option>
              <option value="line">Line</option>
              <option value="bucket">Bucket</option>
              <option value="eraser">Eraser</option>
            </select>
          </div>

          <div>
            <label>Line width:</label>
            <select id="selWidth" ref={selWidthRef} defaultValue="13">
              <option value="3">3</option>
              <option value="8">8</option>
              <option value="13">13</option>
              <option value="20">20</option>
            </select>
          </div>

          <div>
            <label>Color:</label>
            <select id="selColor" ref={selColorRef} defaultValue="blue">
              <option value="black">black</option>
              <option value="blue">blue</option>
              <option value="red">red</option>
              <option value="green">green</option>
              <option value="yellow">yellow</option>
              <option value="gray">gray</option>
              <option value="white">white</option>
            </select>
          </div>

          <div>
            <button type="button" onClick={clearArea}>
              Clear Area
            </button>
          </div>
        </div>

        <canvas id="canvas" ref={canvasRef} width={900} height={360} />
        <div style={{ marginTop: 8 }} />
      </div>
    </>
  );
}