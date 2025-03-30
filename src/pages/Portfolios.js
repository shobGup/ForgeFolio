import React from 'react';
import Image from '../components/Image/Image.js';
import SeeAllHeader from '../components/SeeAll/SeeAllHeader.js';
import './styles/Portfolios.css';


const Portfolios = () => {
    const [allPorts, setAllPorts] = React.useState([
        { title: 'Mona Lisa', imageUrl: '/images/mona-lisa.png', createdDate: '09/01/2025', description: 'A portrait of a woman.', tags: ['art', 'portrait'] },
        { title: 'Red Boats at Argenteuil', imageUrl: '/images/boat.png', createdDate: '03/25/2025', description: 'Red boats at Argenteuil.', tags: ['art', 'nature', 'realism'] },
        /**  { title: 'Impression Sunrise', imageUrl: '/images/impression-sunrise.png', createdDate: '12/15/2022', description: 'A beautiful sunset.', tags: ['art', 'nature', 'painting'] },
        { title: 'The Artist\'s Garden at Giverny', imageUrl: '/images/irises-in-monets-garden.png', createdDate: '07/10/2021', description: 'A garden.', tags: ['art', 'nature', 'flowers', 'garden'] },
        { title: 'Girl with the Pearl Earrings', imageUrl: '/images/girl-with the-pearl-earings.png', createdDate: '08/29/2024', description: 'Girl with pearl hearings.', tags: ['art', 'portrait', 'human', 'realism'] },        
        { title: 'Scream', imageUrl: '/images/scream.png', createdDate: '03/27/2025', description: 'Guy screaming.', tags: ['art', 'abstract', 'portrait', 'human'] },        
        { title: 'Starry Night', imageUrl: '/images/starrynight.png', createdDate: '09/02/2025', description: 'Starry Night.', tags: ['art', 'nature', 'abstract'] },
        { title: 'The Persistence of Memories', imageUrl: '/images/the-persistence-of-memories.jpg', createdDate: '07/16/2024', description: 'Clocks and stuff.', tags: ['art', 'surrealism', 'abstract', 'nature'] },
        { title: 'The Great Wave', imageUrl: '/images/great-wave.jpg', createdDate: '07/16/2025', description: 'Big Wave.', tags: ['art', 'nature', 'japanese', 'nature'] },
        **/
    ]);

    const recentPortfolios = allPorts
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
        
    return (
        <div>
            <SeeAllHeader/>
            <div className="images-grid">
                {recentPortfolios.map((port) => (
                    <Image key={port.title} port={port} />
                ))}
            </div>
        </div>
    );
}

export default Portfolios;