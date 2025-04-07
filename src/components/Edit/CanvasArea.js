import React, { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';
import { useCanvasStore } from '../../stores/canvasStore';
import { usePortfoliosStore } from '../../stores/portfoliosStore';
import { useWorksStore } from '../../stores/worksStore';
import './styles/CanvasArea.css';

const CanvasArea = () => {
  const canvasRef = useRef(null);
  const placingTextbox = useCanvasStore((state) => state.placingTextbox);
  const placingImage = useCanvasStore((state) => state.placingImage);

  const updatePortfolioImage = () => {
    const canvas = useCanvasStore.getState().canvas;
    if (!canvas) return;

    const newImg = canvas.toDataURL('png');
    const canvasJSON = canvas.toJSON();

    usePortfoliosStore.getState().updatePortfolio('canvas', canvasJSON);
    usePortfoliosStore.getState().updatePortfolio('imageUrl', newImg);
  };

  useEffect(() => {
    const wrapper = document.querySelector('.canvas-wrapper');
    const width = wrapper.clientWidth;
    let height = wrapper.clientHeight;
    height = Math.max(usePortfoliosStore.getState().getInitialCanvasHeight(), height);

    const canvas = new Canvas('portfolio-canvas', {
      width,
      height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
    });

    useCanvasStore.getState().setCanvas(canvas);

    // Set Initial Generation: 
    const currPortfolio = usePortfoliosStore.getState().getCurrentPortfolio();
    const tagWorks = currPortfolio?.tags
        ? useWorksStore.getState().scoreWorksByTags(currPortfolio.tags)
        : [];
    tagWorks.sort((a, b) => {
          if (a.score !== undefined && b.score !== undefined) {
              return b.score - a.score;
          }
          return b.createdDate - a.createdDate;
    });
    let bestWorks = tagWorks.slice(0, currPortfolio['mediaCount'])
    useCanvasStore.getState().setInitialCanvas(
      bestWorks, 
      currPortfolio['configurations'].includes('Headshot'),
      currPortfolio['configurations'].includes('Media Descriptions'),
      currPortfolio['configurations'].includes('Media Creation Date'),
      currPortfolio['configurations'].includes('Resume'),
      currPortfolio['configurations'].includes('Contact Information'),
      currPortfolio['configurations'].includes('Social Links'));

    const handleCanvasChange = () => {
      updatePortfolioImage();
    };

    canvas.on('object:modified', handleCanvasChange);
    canvas.on('object:added', handleCanvasChange);
    canvas.on('object:removed', handleCanvasChange);

    // Handle textbox placement on click
    canvas.on('mouse:down', function (e) {
      const state = useCanvasStore.getState();
      if (state.placingTextbox && e.viewportPoint) {
        const { x, y } = e.viewportPoint;
        state.addTextboxAt(x, y, 20, 200);
      }
      if (state.placingImage && e.viewportPoint) {
        const { x, y } = e.viewportPoint;
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

    /* ------- Drag and Drop for Sidebar -------*/
    const handleDragOver = (e) => {
      e.preventDefault(); // Necessary to allow drop
    };
    
    // Drop handler
    const handleDrop = (e) => {
      e.preventDefault();
      const imageUrl = e.dataTransfer.getData('image-url');
      if (!imageUrl) return;
    
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
    
      useCanvasStore.getState().addImageAt(imageUrl, x, y);
    };
  /* ------------------------------------*/
    
  wrapper.addEventListener('dragover', handleDragOver);
  wrapper.addEventListener('drop', handleDrop);
  
  window.addEventListener('keydown', handleKeyDown);
  
  // Cleanup on unmount
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    wrapper.removeEventListener('dragover', handleDragOver);
    wrapper.removeEventListener('drop', handleDrop);
    canvas.dispose();
  };
  }, []);

  /* Effect to change the cursor and show the user what they are doing */
  useEffect(() => {
    const canvas = useCanvasStore.getState().canvas;
    if (!canvas) return;
  
    if (placingTextbox) {
      canvas.defaultCursor = 'crosshair';
    } else if (placingImage) {
      canvas.defaultCursor = 'copy';
    } else {
      canvas.defaultCursor = 'default';
    }
  }, [placingTextbox, placingImage]);

  return (
    <div className="canvas-wrapper">
      <canvas id="portfolio-canvas" ref={canvasRef}></canvas>
    </div>

  );
};

export default CanvasArea;
