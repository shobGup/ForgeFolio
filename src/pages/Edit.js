// Edit.js
import React from 'react';
import EditHeader from '../components/Edit/EditHeader';
import EditToolbar from '../components/Edit/EditToolbar';
import EditSidebar from '../components/Edit/EditSidebar';
import './styles/Edit.css';
import CanvasArea from '../components/Edit/CanvasArea';
import { useCanvasStore } from '../stores/canvasStore.js';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePortfoliosStore } from '../stores/portfoliosStore';


const Edit = () => {
  const { title } = useParams();
  const { portfolios, setCurrentPortfolio } = usePortfoliosStore();
  const { setViewMode, viewMode } = useCanvasStore();

  useEffect(() => {
    const portfolio = portfolios.find(p => p.title === decodeURIComponent(title));
    if (portfolio) {
      setCurrentPortfolio(portfolio);
    }
    // setViewMode(false);
  }, [title, portfolios]);


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
