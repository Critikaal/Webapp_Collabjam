"use client";

import React, { useEffect, useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const selWidthRef = useRef<HTMLSelectElement | null>(null);
  const selColorRef = useRef<HTMLSelectElement | null>(null);
  const ongoingTouchesRef = useRef<Array<{ identifier: number; clientX: number; clientY: number }>>([]);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas as HTMLCanvasElement;
    const context = canvasEl.getContext('2d')!;

    let offsetX = 0;
    let offsetY = 0;

    function copyTouch(t: Touch) {
      return { identifier: t.identifier, clientX: t.clientX, clientY: t.clientY };
    }

    function ongoingTouchIndexById(idToFind: number) {
      const touches = ongoingTouchesRef.current;
      for (let i = 0; i < touches.length; i++) {
        if (touches[i].identifier === idToFind) return i;
      }
      return -1;
    }

    function drawLine(x1: number, y1: number, x2: number, y2: number) {
      const color = selColorRef.current?.value || 'black';
      const lineW = Number(selWidthRef.current?.value || 3);
      context.beginPath();
      context.strokeStyle = color;
      context.lineWidth = lineW;
      context.lineJoin = 'round';
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    }

    // Touch handlers
    function handleStart(evt: TouchEvent) {
      evt.preventDefault();
      offsetX = canvasEl.getBoundingClientRect().left;
      offsetY = canvasEl.getBoundingClientRect().top;
      const touches = evt.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        ongoingTouchesRef.current.push(copyTouch(touches[i]));
      }
    }

    function handleMove(evt: TouchEvent) {
      evt.preventDefault();
      const touches = evt.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) {
          const prev = ongoingTouchesRef.current[idx];
          const x1 = prev.clientX - offsetX;
          const y1 = prev.clientY - offsetY;
          const x2 = touches[i].clientX - offsetX;
          const y2 = touches[i].clientY - offsetY;
          drawLine(x1, y1, x2, y2);
          ongoingTouchesRef.current.splice(idx, 1, copyTouch(touches[i]));
        }
      }
    }

    function handleEnd(evt: TouchEvent) {
      evt.preventDefault();
      const touches = evt.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) ongoingTouchesRef.current.splice(idx, 1);
      }
    }

    function handleCancel(evt: TouchEvent) {
      evt.preventDefault();
      const touches = evt.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) ongoingTouchesRef.current.splice(idx, 1);
      }
    }

    // Mouse handlers
    function handleMouseDown(e: MouseEvent) {
      const rect = canvasEl.getBoundingClientRect();
      lastPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      isDrawingRef.current = true;
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isDrawingRef.current) return;
      const rect = canvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawLine(lastPosRef.current.x, lastPosRef.current.y, x, y);
      lastPosRef.current = { x, y };
    }

    function handleMouseUp() {
      isDrawingRef.current = false;
    }

    // Attach listeners
    canvasEl.addEventListener('touchstart', handleStart, { passive: false });
    canvasEl.addEventListener('touchmove', handleMove, { passive: false });
    canvasEl.addEventListener('touchend', handleEnd, { passive: false });
    canvasEl.addEventListener('touchcancel', handleCancel, { passive: false });
    canvasEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvasEl.removeEventListener('touchstart', handleStart);
      canvasEl.removeEventListener('touchmove', handleMove);
      canvasEl.removeEventListener('touchend', handleEnd);
      canvasEl.removeEventListener('touchcancel', handleCancel);
      canvasEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  function clearArea() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // reset touch/mouse state
    ongoingTouchesRef.current = [];
    isDrawingRef.current = false;
    lastPosRef.current = { x: 0, y: 0 };
  }

  return (
    <div id="canvas_div" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', overflowX: 'auto' }}>
      <div className="toolbar" role="toolbar" aria-label="drawing tools" style={{ marginBottom: 8 }}>
        <button type="button" onClick={clearArea}>Clear Area</button>
        <button type="button" onClick={() => saveImage()}>Save PNG</button>
        <button type="button" onClick={() => copyToClipboard()}>Copy</button>
        <button type="button" onClick={() => uploadCanvas()}>Upload</button>
        <span style={{ marginLeft: 12 }}>Line width: </span>
        <select id="selWidth" ref={selWidthRef} defaultValue="13" style={{ marginLeft: 6 }}>
          <option value="11">11</option>
          <option value="13">13</option>
          <option value="15">15</option>
        </select>
        <span style={{ marginLeft: 12 }}>Color: </span>
        <select id="selColor" ref={selColorRef} defaultValue="blue" style={{ marginLeft: 6 }}>
          <option value="black">black</option>
          <option value="blue">blue</option>
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="yellow">yellow</option>
          <option value="gray">gray</option>
        </select>
      </div>

      <div className="canvas-container">
        <canvas id="canvas" ref={canvasRef} width={900} height={360} style={{ border: '2px solid black' }} />
      </div>
    </div>
  );
}

// Downloads the canvas as a PNG file
async function saveImage() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  if (!canvas) {
    alert('Canvas not available');
    return;
  }

  // toBlob is async-friendly
  canvas.toBlob((blob) => {
    if (!blob) {
      alert('Failed to create image');
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, 'image/png');
}

// Copy canvas image to clipboard (supported in modern browsers)
async function copyToClipboard() {
  try {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (!canvas) throw new Error('Canvas not found');
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
    if (!blob) throw new Error('Could not create image blob');
    // @ts-ignore - ClipboardItem may not exist in older TS libs
    await (navigator.clipboard as any).write([new ClipboardItem({ 'image/png': blob })]);
    alert('Image copied to clipboard');
  } catch (err) {
    console.error(err);
    alert('Copy to clipboard failed: ' + (err as Error).message);
  }
}

// Upload canvas PNG to server endpoint. Requires a server route to accept the POST.
async function uploadCanvas() {
  try {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (!canvas) throw new Error('Canvas not found');
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
    if (!blob) throw new Error('Could not create image blob');

    const fd = new FormData();
    fd.append('file', blob, 'canvas.png');

    const resp = await fetch('/api/upload', {
      method: 'POST',
      body: fd,
    });

    if (!resp.ok) throw new Error('Upload failed: ' + resp.statusText);
    const data = await resp.json().catch(() => ({}));
    alert('Upload successful');
    console.log('Upload response', data);
  } catch (err) {
    console.error(err);
    alert('Upload failed: ' + (err as Error).message);
  }
}