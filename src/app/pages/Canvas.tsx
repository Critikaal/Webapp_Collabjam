"use client";

import React, { useRef, useEffect, useState } from "react";

type Tool = "pencil" | "line" | "bucket" | "eraser";
type Point = { x: number; y: number };

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [tool, setTool] = useState<Tool>("pencil");
  const [lineWidth, setLineWidth] = useState<number>(8);
  const [strokeColor, setStrokeColor] = useState<string>("blue");

  // simple drawing state
  const isDrawingRef = useRef<boolean>(false);
  const lastPosRef = useRef<Point>({ x: 0, y: 0 });
  const lineStartRef = useRef<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const getPos = (evt: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("clientX" in evt) {
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
      } else {
        const t = evt.touches[0] ?? evt.changedTouches[0];
        return { x: t.clientX - rect.left, y: t.clientY - rect.top };
      }
    };

    const onDown = (evt: MouseEvent | TouchEvent) => {
      evt.preventDefault();
      const p = getPos(evt);
      isDrawingRef.current = true;
      lastPosRef.current = p;
      if (tool === "line") {
        lineStartRef.current = p;
      } else if (tool === "pencil" || tool === "eraser") {
        ctx.strokeStyle = tool === "eraser" ? "white" : strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + 0.01, p.y + 0.01);
        ctx.stroke();
      }
    };

    const onMove = (evt: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      const p = getPos(evt);
      if (tool === "pencil" || tool === "eraser") {
        ctx.strokeStyle = tool === "eraser" ? "white" : strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      lastPosRef.current = p;
    };

    const onUp = (evt: MouseEvent | TouchEvent) => {
      evt.preventDefault();
      if (tool === "line" && lineStartRef.current) {
        const p = getPos(evt);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(lineStartRef.current.x, lineStartRef.current.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        lineStartRef.current = null;
      }
      isDrawingRef.current = false;
    };

    // mouse
    canvas.addEventListener("mousedown", onDown as any);
    canvas.addEventListener("mousemove", onMove as any);
    window.addEventListener("mouseup", onUp as any);

    // touch
    canvas.addEventListener("touchstart", onDown as any, { passive: false });
    canvas.addEventListener("touchmove", onMove as any, { passive: false });
    canvas.addEventListener("touchend", onUp as any, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", onDown as any);
      canvas.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("mouseup", onUp as any);

      canvas.removeEventListener("touchstart", onDown as any);
      canvas.removeEventListener("touchmove", onMove as any);
      canvas.removeEventListener("touchend", onUp as any);
    };
  }, [tool, lineWidth, strokeColor]);

  function changeLineWidth(delta: number) {
    setLineWidth((w) => Math.max(1, Math.min(50, w + delta)));
  }

  function handleColorClick(color: string) {
    setStrokeColor(color);
  }

  function clearArea() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <>
      <div className="idea-page">
        <h1 className="idea-title">{`{idénavn}`}</h1>

        <div className="idea-layout">
          {/* LEFT TOOLS PANEL */}
          <div className="tools-panel">
            <p className="tools-label">Tools:</p>

            <div className="toolbar" role="toolbar" aria-label="drawing tools">
              <button
                type="button"
                className={`tool-btn ${tool === "pencil" ? "active" : ""}`}
                onClick={() => setTool("pencil")}
                data-tooltip="Pencil"
              >
                ✏️
              </button>

              <button
                type="button"
                className={`tool-btn ${tool === "line" ? "active" : ""}`}
                onClick={() => setTool("line")}
                data-tooltip="Line"
              >
                ／
              </button>

              <button
                type="button"
                className={`tool-btn ${tool === "bucket" ? "active" : ""}`}
                onClick={() => setTool("bucket")}
                data-tooltip="Fill"
              >
                🪣
              </button>

              <button
                type="button"
                className={`tool-btn ${tool === "eraser" ? "active" : ""}`}
                onClick={() => setTool("eraser")}
                data-tooltip="Eraser"
              >
                ⌫
              </button>
            </div>

            <div className="tool-controls">
              <div className="line-width-control">
                <label htmlFor="lineWidth">Line width:</label>
                <div className="line-width-inner">
                  <button type="button" onClick={() => changeLineWidth(-1)}>
                    -
                  </button>
                  <span id="lineWidth">{lineWidth}</span>
                  <button type="button" onClick={() => changeLineWidth(1)}>
                    +
                  </button>
                </div>
              </div>

              <button type="button" onClick={clearArea}>
                Clear Area
              </button>
            </div>
          </div>

          {/* CENTER CANVAS */}
          <div className="canvas-column">
            <div id="canvas_div" className="canvas-frame" style={{ overflowX: "auto" }}>
              <canvas id="canvas" ref={canvasRef} width={900} height={360} />
            </div>

            <div className="color-row">
              <button
                type="button"
                className="color-swatch color-black"
                onClick={() => handleColorClick("black")}
              />
              <button
                type="button"
                className="color-swatch color-blue"
                onClick={() => handleColorClick("blue")}
              />
              <button
                type="button"
                className="color-swatch color-red"
                onClick={() => handleColorClick("red")}
              />
              <button
                type="button"
                className="color-swatch color-green"
                onClick={() => handleColorClick("green")}
              />
              <button
                type="button"
                className="color-swatch color-yellow"
                onClick={() => handleColorClick("yellow")}
              />
              <button
                type="button"
                className="color-swatch color-gray"
                onClick={() => handleColorClick("gray")}
              />
              <button
                type="button"
                className="color-swatch color-white"
                onClick={() => handleColorClick("white")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}