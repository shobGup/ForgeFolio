import React from 'react';
import './styles/SidebarImage.css'

const SidebarImage = ({ work }) => {

    const { score } = work;

    {/* Used ChatGPT for the following function */}
    function getColorForValue(value) {
        const clamped = Math.max(0, Math.min(100, value));
      
        const hue = 120 * Math.pow(clamped / 100, 1.1); // nonlinear blend (slows the shift near yellow)
      
        const saturation = 60;
        const lightness = 42;
      
        return `hsl(${hue.toFixed(1)}, ${saturation}%, ${lightness}%)`;
      }
      
      
    
    const textColor = getColorForValue(score);

    return (
        <div className="work">
            <img 
                src={process.env.PUBLIC_URL + work.imageUrl} 
                alt={work.description} 
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData('image-url', process.env.PUBLIC_URL + work.imageUrl);
                }}
            />
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