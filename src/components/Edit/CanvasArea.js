import React, { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';
import { useCanvasStore } from '../../stores/canvasStore';
import { usePortfoliosStore } from '../../stores/portfoliosStore';
import { useWorksStore } from '../../stores/worksStore';
import './styles/CanvasArea.css';
import EscHintPopup from './EscHintPopup.js';

const CanvasArea = () => {
  const canvasRef = useRef(null);
  const { 
    setViewMode, 
    viewMode, 
    placingImage, 
    placingTextbox 
  } = useCanvasStore();
  const canvas = useCanvasStore((state) => state.canvas);

  // function to update the portfolio image in home screen
  const updatePortfolioImage = () => {
    const canvas = useCanvasStore.getState().canvas;
    if (!canvas || !canvas.lowerCanvasEl || !canvas.wrapperEl) return;

    const newImg = canvas.toDataURL('png');
    const canvasJSON = canvas.toJSON();

    usePortfoliosStore.getState().updatePortfolio('canvas', canvasJSON);
    usePortfoliosStore.getState().updatePortfolio('imageUrl', newImg);
  };

  /* useEffect to initially create the canvas object */
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

    return () => {
      canvas.dispose();
    };
  }, []);

  /* useEffect to initially generate the portfolio */
  useEffect(() => {
    if (!canvas || !canvas.lowerCanvasEl || !canvas.wrapperEl) return;

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
      currPortfolio['configurations'].includes('Contact Information'),
      currPortfolio['configurations'].includes('Social Links'));
  }, [canvas]);

  /* use effect for all background stuff */
  useEffect(() => {
    if (!canvas || !canvas.lowerCanvasEl || !canvas.wrapperEl) return;

    // Place textbox on click
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

    // Backspace deletes an object
    const handleKeyDown = (e) => {
        const canvas = useCanvasStore.getState().canvas;
        if (!canvas || !canvas.lowerCanvasEl || !canvas.wrapperEl) return;
        
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
      e.preventDefault();
    };
    
    const handleDrop = (e) => {
      const wrapper = document.querySelector('.canvas-wrapper');
      e.preventDefault();
      const imageUrl = e.dataTransfer.getData('image-url');
      if (!imageUrl) return;
      const scrollY = wrapper.scrollTop;
    
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top + scrollY;
    
      useCanvasStore.getState().addImageAt(imageUrl, x, y);
    };
  /* ------------------------------------*/

    // update portfolio image
    const handleCanvasChange = () => {
      updatePortfolioImage();
    };

    canvas.on('object:modified', handleCanvasChange);
    canvas.on('object:added', handleCanvasChange);
    canvas.on('object:removed', handleCanvasChange);

    const wrapper = document.querySelector('.canvas-wrapper');
    wrapper.addEventListener('dragover', handleDragOver);
    wrapper.addEventListener('drop', handleDrop);
    window.addEventListener('keydown', handleKeyDown);
  
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      wrapper.removeEventListener('dragover', handleDragOver);
      wrapper.removeEventListener('drop', handleDrop);
      canvas.off('mouse:down');
      canvas.off('object:moving');
      canvas.off('object:modified', handleCanvasChange);
      canvas.off('object:added', handleCanvasChange);
      canvas.off('object:removed', handleCanvasChange);
    };
  }, [canvas]);

  /* Effect to change the cursor and show the user what they are doing */
  useEffect(() => {
    if (!canvas || !canvas.lowerCanvasEl || !canvas.wrapperEl) return;
  
    if (placingTextbox) {
      canvas.defaultCursor = 'crosshair';
    } else if (placingImage) {
      canvas.defaultCursor = 'copy';
    } else {
      canvas.defaultCursor = 'default';
    }
  }, [placingTextbox, placingImage, canvas]);

  /* Effect to toggle canvas size and scale for viewMode */
  useEffect(() => {
    if (!canvas || !canvas.lowerCanvasEl || !canvas.wrapperEl) return;

    const wrapper = document.querySelector('.canvas-wrapper');
    if (!wrapper) return;

    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;

    if (viewMode) {
      const scaleFactor = width / canvas.getWidth();
      canvas.setZoom(scaleFactor);
      canvas.setWidth(width);
      canvas.setHeight(Math.max(canvas.getHeight(), height));
    } else {
      canvas.setZoom(1);
      canvas.setWidth(width);
    }

    canvas.selection = !viewMode;
    canvas.skipTargetFind = viewMode;

    canvas.forEachObject((obj) => {
      obj.selectable = !viewMode;
      obj.evented = !viewMode;
    });

    canvas.discardActiveObject();
    canvas.renderAll();

    canvas.renderAll();
  }, [viewMode, canvas]);

  /* Lets the escape key exit view mode */
  useEffect(() => {
    const handleExitViewMode = (e) => {
      if (e.key === 'Escape') {
        setViewMode(false);
      }
    };
  
    if (viewMode) {
      window.addEventListener('keydown', handleExitViewMode);
    }
  
    return () => window.removeEventListener('keydown', handleExitViewMode);
  }, [viewMode]);

  return (
    <div className={`canvas-wrapper ${viewMode ? 'view-mode' : ''}`}>
      <canvas id="portfolio-canvas" ref={canvasRef}></canvas>
      {viewMode && <EscHintPopup />} {/* Show only in view mode */}
    </div> 
  );
};

export default CanvasArea;
