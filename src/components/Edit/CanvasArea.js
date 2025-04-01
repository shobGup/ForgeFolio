import React, { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';
import { useCanvasStore } from '../../stores/canvasStore';
import './styles/CanvasArea.css';

const CanvasArea = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrapper = document.querySelector('.canvas-wrapper');
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;

    const canvas = new Canvas('portfolio-canvas', {
      width,
      height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
    });

    useCanvasStore.getState().setCanvas(canvas);

    // Handle textbox placement on click
    canvas.on('mouse:down', function (e) {
      const state = useCanvasStore.getState();
      if (state.placingTextbox && e.pointer) {
        const { x, y } = e.pointer;
        state.addTextboxAt(x, y);
      }
      if (state.placingImage && e.pointer) {
        const { x, y } = e.pointer;
        state.addImageAt(state.imageUrl, x, y);
      }
    });

    // Grow canvas height as needed during drag
    canvas.on('object:moving', (e) => {
      const obj = e.target;
      const objBottom = obj.top + obj.getScaledHeight();
      const buffer = 100;
      const currentHeight = canvas.getHeight();

      if (objBottom + buffer > currentHeight) {
        canvas.setDimensions({
            height: currentHeight + 400
          });          
        canvas.renderAll();
      }
    });

    // ⌨️ Handle Backspace/Delete to remove selected object
    const handleKeyDown = (e) => {
        const canvas = useCanvasStore.getState().canvas;
        if (!canvas) return;
        
        const active = canvas.getActiveObject();
        if (!active) return;
        
        if (
            (e.key === 'Backspace' || e.key === 'Delete') &&
            !(active.isEditing)
        ) {
            e.preventDefault();
            canvas.remove(active);
            canvas.requestRenderAll();
        }
    };
      
  
  window.addEventListener('keydown', handleKeyDown);
  
  // Cleanup on unmount
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    canvas.dispose();
  };
  }, []);

  return (
    <div className="canvas-wrapper">
      <canvas id="portfolio-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default CanvasArea;
