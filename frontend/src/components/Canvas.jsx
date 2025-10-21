import React, { useEffect, useRef, useState } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const selWidthRef = useRef(null);
  const selColorRef = useRef(null);
  const ongoingTouchesRef = useRef([]);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // New:
  const [tool, setTool] = useState("pencil"); // pencil | line | bucket | eraser
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

      const width = parseFloat(selWidthRef.current?.value) || 1;
      const color = selColorRef.current?.value || "black";

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
      const width = parseFloat(selWidthRef.current?.value) || 1;
      const color = selColorRef.current?.value || "black";

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
      const width = parseFloat(selWidthRef.current?.value) || 1;
      const color = selColorRef.current?.value || "black";

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
          const color = selColorRef.current?.value || "black";
          floodFill(pos.x, pos.y, color);
        } else {
          lastPosRef.current = pos;
          isDrawingRef.current = true;
          const width = parseFloat(selWidthRef.current?.value) || 1;
          const color = selColorRef.current?.value || "black";
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
            const width = parseFloat(selWidthRef.current?.value) || 1;
            const color = selColorRef.current?.value || "black";
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
            const width = parseFloat(selWidthRef.current?.value) || 1;
            const color = selColorRef.current?.value || "black";
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
              const width = parseFloat(selWidthRef.current?.value) || 1;
              const color = selColorRef.current?.value || "black";
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

  // optional teams array (left in case you use it later)
  const teams = [
    { name: "Team Instinct", image: "src/assets/img/instinct.png" },
    { name: "Team Valor", image: "src/assets/img/valor.png" },
    { name: "Team Mystic", image: "src/assets/img/mystic.png" },
  ];

  return (
    <>
      <style>
        {`
          #canvas_div { text-align: center; display: block; margin-left: auto; margin-right: auto; }
          canvas { border: 2px solid black; touch-action: none; }
          .toolbar { display:flex; gap:8px; align-items:center; justify-content:center; margin-bottom:8px; }
          .tool-btn { padding:6px 8px; border:1px solid #ccc; background:#fff; cursor:pointer; }
          .tool-btn.active { border-color:#000; font-weight:600; }
        `}
      </style>

      <div id="canvas_div" style={{ overflowX: "auto" }}>
        <div className="toolbar" role="toolbar" aria-label="drawing tools">
          <div>
            <label>Tool: </label>
            <select value={tool} onChange={(e) => setTool(e.target.value)}>
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
