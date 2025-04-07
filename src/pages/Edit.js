// Edit.js
import React from 'react';
import EditHeader from '../components/Edit/EditHeader';
import EditToolbar from '../components/Edit/EditToolbar';
import EditSidebar from '../components/Edit/EditSidebar';
import './styles/Edit.css';
import CanvasArea from '../components/Edit/CanvasArea';
import { useCanvasStore } from '../stores/canvasStore.js';
import { useEffect } from 'react';

const Edit = () => {
  const { setViewMode, viewMode } = useCanvasStore();

  /* Makes sure we always start in edit mode */
  useEffect(() => {
    setViewMode(false);
  }, []);

  if (!viewMode) {
    return (
      <div className="outer-container">
        <div className="header">
          <EditHeader 
          />
        </div>
        <div className="toolbar">
          <EditToolbar 
          
          />
        </div>
        <div className="main-content">
          <div className="edit-sidebar">
            <EditSidebar 
              
            />
          </div>
          <div className="some-other-panel">
            <CanvasArea />
          </div>
        </div>
      </div>
    );
  }

  if (viewMode) {
    return (
      <div className="outer-container view-mode">
        <div className={`some-other-panel`}>
            <CanvasArea />
        </div>
      </div>
    )
  }
};

export default Edit;
