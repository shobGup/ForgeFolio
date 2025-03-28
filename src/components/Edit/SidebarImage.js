import React from 'react';
import './styles/SidebarImage.css'

const SidebarImage = ({ work }) => {

    const { score } = work;

    function getColorForValue(value) {
        const clamped = Math.max(0, Math.min(100, value));
      
        // Remap the hue to skip that “olive” range — curve the middle a bit
        const hue = 120 * Math.pow(clamped / 100, 1.1); // nonlinear blend (slows the shift near yellow)
      
        const saturation = 60; // less neon
        const lightness = 42;  // brighter for readability
      
        return `hsl(${hue.toFixed(1)}, ${saturation}%, ${lightness}%)`;
      }
      
      
    
    const textColor = getColorForValue(score);

    return (
        <div className="work">
            <img src={process.env.PUBLIC_URL + work.imageUrl} alt={work.description} />
            <div className='work-title' title={work.title}>{work.title}</div>
            <div 
                className='percentage'
                style={{
                    color: textColor
                }}
            >
                {score}% match
            </div>
        </div>
    );
};

export default SidebarImage;