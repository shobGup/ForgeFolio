import React from 'react';
import './styles/EditSidebar.css';
import SidebarImage from './SidebarImage';


const EditSidebar = ({ }) => {

    const [allWorks, setAllWorks] = React.useState([
        { title: 'Mona Lisa', imageUrl: '/images/mona-lisa.png', description: 'A portrait of a woman.', tags: ['art', 'portrait'], score: 5 },
        { title: 'Red Boats at Argenteuil', imageUrl: '/images/boat.png', description: 'Red boats at Argenteuil.', tags: ['art', 'nature', 'realism'], score: 80},
        { title: 'Impression Sunrise', imageUrl: '/images/impression-sunrise.png', description: 'A beautiful sunset.', tags: ['art', 'nature', 'painting'], score: 84 },
        { title: 'The Artist\'s Garden at Giverny', imageUrl: '/images/irises-in-monets-garden.png', description: 'A garden.', tags: ['art', 'nature', 'flowers', 'garden'], score: 72 },
        { title: 'Girl with the Pearl Earrings', imageUrl: '/images/girl-with the-pearl-earings.png', description: 'Girl with pearl hearings.', tags: ['art', 'portrait', 'human', 'realism'], score: 23 },        
        { title: 'Scream', imageUrl: '/images/scream.png', description: 'Guy screaming.', tags: ['art', 'abstract', 'portrait', 'human'], score: 62 },        
        { title: 'Starry Night', imageUrl: '/images/starrynight.png', description: 'Starry Night.', tags: ['art', 'nature', 'abstract'], score: 43 },
        { title: 'The Persistence of Memories', imageUrl: '/images/the-persistence-of-memories.jpg', description: 'Clocks and stuff.', tags: ['art', 'surrealism', 'abstract', 'nature'], score: 98 },
        { title: 'The Great Wave', imageUrl: '/images/great-wave.jpg', description: 'Big Wave.', tags: ['art', 'nature', 'japanese', 'nature'], score: 77 },

    ]);

    const recentWorks = allWorks
        .sort((a, b) => b.score - a.score)

    return (
        <div className="sidebar">
            <div className="header-box">
                <h3 className="header-box-title">Other Works</h3>
                <div className="header-search">
                    <img src={process.env.PUBLIC_URL + "/images/toolbar_icons/search.svg"} alt="Search Icon" className="search-icon"/>
                    <input className="header-search-input" type="search" placeholder='Search' /> 
                </div>
            </div>
            <div className="works-section">
                {allWorks.map((work) => (
                    <SidebarImage 
                        key={work.title} 
                        work={work} 
                    />
                ))}
            </div>
        </div>
    );
}

export default EditSidebar;