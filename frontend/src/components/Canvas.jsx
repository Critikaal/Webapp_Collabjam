import React, { useEffect, useRef, useState } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const lineWidthRef = useRef(13);
  const colorRef = useRef("blue");
  const ongoingTouchesRef = useRef([]);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // New:
  const [tool, setTool] = useState("pencil"); // pencil | line | bucket | eraser
  const [lineWidth, setLineWidth] = useState(13);
  const savedImageRef = useRef(null); // for line preview
  const lineStartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    function getOffsets() {
      const rect = canvas.getBoundingClientRect();
      return { offsetX: rect.left, offsetY: rect.top };
    }

    // helpers
    function getCursorPosFromMouse(e) {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function getCursorPosFromTouch(touch) {
      const rect = canvas.getBoundingClientRect();
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }

    // Flood fill (bucket) - simple 4-way BFS
    function floodFill(x, y, fillColor) {
      const w = canvas.width;
      const h = canvas.height;
      const ctx = context;
      const img = ctx.getImageData(0, 0, w, h);
      const data = img.data;
      function getIdx(px, py) {
        return (py * w + px) * 4;
      }
      // clamp
      if (x < 0 || x >= w || y < 0 || y >= h) return;
      const startIdx = getIdx(Math.floor(x), Math.floor(y));
      const targetR = data[startIdx];
      const targetG = data[startIdx + 1];
      const targetB = data[startIdx + 2];
      const targetA = data[startIdx + 3];
      // convert fillColor (css) to rgba
      const tmp = document.createElement("canvas");
      tmp.width = tmp.height = 1;
      const tctx = tmp.getContext("2d");
      tctx.fillStyle = fillColor;
      tctx.fillRect(0, 0, 1, 1);
      const fill = tctx.getImageData(0, 0, 1, 1).data;
      const fillR = fill[0],
        fillG = fill[1],
        fillB = fill[2],
        fillA = fill[3];

      if (
        targetR === fillR &&
        targetG === fillG &&
        targetB === fillB &&
        targetA === fillA
      ) {
        return; // already filled
      }

      const stack = [];
      stack.push([Math.floor(x), Math.floor(y)]);
      while (stack.length) {
        const [px, py] = stack.pop();
        if (px < 0 || px >= w || py < 0 || py >= h) continue;
        const idx = getIdx(px, py);
        if (
          data[idx] === targetR &&
          data[idx + 1] === targetG &&
          data[idx + 2] === targetB &&
          data[idx + 3] === targetA
        ) {
          data[idx] = fillR;
          data[idx + 1] = fillG;
          data[idx + 2] = fillB;
          data[idx + 3] = fillA;
          stack.push([px + 1, py]);
          stack.push([px - 1, py]);
          stack.push([px, py + 1]);
          stack.push([px, py - 1]);
        }
      }
      ctx.putImageData(img, 0, 0);
    }

    // Drawing helper uses current select refs and tool
    function drawLineSegment(ctx, x1, y1, x2, y2, color, width) {
      ctx.save();
      if (tool === "eraser") {
        // eraser by clearing stroke area
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
      }
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }

    // Mouse handlers
    function onMouseDown(e) {
      e.preventDefault();
      const pos = getCursorPosFromMouse(e);
      lastPosRef.current = pos;
      isDrawingRef.current = true;

      const width = lineWidthRef.current || 1;
      const color = colorRef.current || "black";

      if (tool === "line") {
        // save snapshot for preview
        savedImageRef.current = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        lineStartRef.current = pos;
      } else if (tool === "bucket") {
        floodFill(pos.x, pos.y, color);
      } else {
        // pencil / eraser start a dot
        drawLineSegment(
          context,
          pos.x,
          pos.y,
          pos.x + 0.1,
          pos.y + 0.1,
          color,
          width
        );
      }
    }

    function onMouseMove(e) {
      if (!isDrawingRef.current) {
        // for line tool we might want preview without holding mouse (optional)
        return;
      }
      const pos = getCursorPosFromMouse(e);
      const width = lineWidthRef.current || 1;
      const color = colorRef.current || "black";

      if (tool === "pencil" || tool === "eraser") {
        drawLineSegment(
          context,
          lastPosRef.current.x,
          lastPosRef.current.y,
          pos.x,
          pos.y,
          color,
          width
        );
        lastPosRef.current = pos;
      } else if (tool === "line") {
        // preview: restore saved image and draw a single line
        if (!savedImageRef.current || !lineStartRef.current) return;
        context.putImageData(savedImageRef.current, 0, 0);
        drawLineSegment(
          context,
          lineStartRef.current.x,
          lineStartRef.current.y,
          pos.x,
          pos.y,
          color,
          width
        );
      } else {
        // other tools ignore move
      }
    }

    function onMouseUp(e) {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      const pos = getCursorPosFromMouse(e);
      const width = lineWidthRef.current || 1;
      const color = colorRef.current || "black";

      if (tool === "line") {
        // commit final line
        if (savedImageRef.current && lineStartRef.current) {
          context.putImageData(savedImageRef.current, 0, 0);
          drawLineSegment(
            context,
            lineStartRef.current.x,
            lineStartRef.current.y,
            pos.x,
            pos.y,
            color,
            width
          );
          savedImageRef.current = null;
          lineStartRef.current = null;
        }
      }
      lastPosRef.current = { x: 0, y: 0 };
    }

    // Touch handlers: adapt to tools (basic)
    function copyTouch(touch) {
      return {
        identifier: touch.identifier,
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
    }

    function ongoingTouchIndexById(idToFind) {
      const ongoing = ongoingTouchesRef.current;
      for (let i = 0; i < ongoing.length; i++) {
        if (ongoing[i].identifier === idToFind) return i;
      }
      return -1;
    }

    function onTouchStart(evt) {
      evt.preventDefault();
      const touches = evt.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        ongoingTouchesRef.current.push(copyTouch(touches[i]));
        const pos = getCursorPosFromTouch(touches[i]);
        // reuse mouse logic per touch (bucket and line special-casing)
        if (tool === "line") {
          savedImageRef.current = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          lineStartRef.current = pos;
          isDrawingRef.current = true;
        } else if (tool === "bucket") {
          const color = colorRef.current || "black";
          floodFill(pos.x, pos.y, color);
        } else {
          lastPosRef.current = pos;
          isDrawingRef.current = true;
          const width = lineWidthRef.current || 1;
          const color = colorRef.current || "black";
          drawLineSegment(
            context,
            pos.x,
            pos.y,
            pos.x + 0.1,
            pos.y + 0.1,
            color,
            width
          );
        }
      }
    }

    function onTouchMove(evt) {
      evt.preventDefault();
      const touches = evt.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const idx = ongoingTouchIndexById(touches[i].identifier);
        const pos = getCursorPosFromTouch(touches[i]);
        if (idx >= 0) {
          if (tool === "pencil" || tool === "eraser") {
            const width = lineWidthRef.current || 1;
            const color = colorRef.current || "black";
            drawLineSegment(
              context,
              lastPosRef.current.x,
              lastPosRef.current.y,
              pos.x,
              pos.y,
              color,
              width
            );
            ongoingTouchesRef.current.splice(idx, 1, copyTouch(touches[i]));
            lastPosRef.current = pos;
          } else if (tool === "line") {
            if (!savedImageRef.current || !lineStartRef.current) continue;
            const width = lineWidthRef.current || 1;
            const color = colorRef.current || "black";
            context.putImageData(savedImageRef.current, 0, 0);
            drawLineSegment(
              context,
              lineStartRef.current.x,
              lineStartRef.current.y,
              pos.x,
              pos.y,
              color,
              width
            );
          }
        }
      }
    }

    function onTouchEnd(evt) {
      evt.preventDefault();
      const touches = evt.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const idx = ongoingTouchIndexById(touches[i].identifier);
        const pos = getCursorPosFromTouch(touches[i]);
        if (idx >= 0) {
          if (tool === "line") {
            if (savedImageRef.current && lineStartRef.current) {
              const width = lineWidthRef.current || 1;
              const color = colorRef.current || "black";
              context.putImageData(savedImageRef.current, 0, 0);
              drawLineSegment(
                context,
                lineStartRef.current.x,
                lineStartRef.current.y,
                pos.x,
                pos.y,
                color,
                width
              );
              savedImageRef.current = null;
              lineStartRef.current = null;
            }
          }
          ongoingTouchesRef.current.splice(idx, 1);
        }
      }
      isDrawingRef.current = false;
    }

    // Attach listeners
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });
    canvas.addEventListener("touchcancel", onTouchEnd, { passive: false });

    // Clean up
    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [tool]); // re-run when tool changes

  function clearArea() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleColorClick(color) {
    colorRef.current = color;
  }

  function changeLineWidth(delta) {
    setLineWidth((prev) => {
      let next = prev + delta;
      if (next < 1) next = 1;
      if (next > 50) next = 50;
      lineWidthRef.current = next;
      return next;
    });
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
            <div
              id="canvas_div"
              className="canvas-frame"
              style={{ overflowX: "auto" }}
            >
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
