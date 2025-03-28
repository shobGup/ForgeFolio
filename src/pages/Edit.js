// Edit.js
import React from 'react';
import EditHeader from '../components/Edit/EditHeader';
import EditToolbar from '../components/Edit/EditToolbar';
import EditSidebar from '../components/Edit/EditSidebar';
import './styles/Edit.css';

const Edit = () => {
  return (
    <div className="outer-container">
      <div className="header">
        <EditHeader 
          portfolioName={"Shobhit's Portfolio"}
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
          {/* Main page content */}
        </div>
      </div>
    </div>
  );
};

export default Edit;
