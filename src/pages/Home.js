import React from 'react';
import Image from '../components/Image/Image.js';
import HomeHeader from '../components/Home Page/HomeHeader.js';
import './styles/Home.css';


const Home = () => {
    const [allWorks, setAllWorks] = React.useState([
        { title: 'Mona Lisa', imageUrl: '/images/mona-lisa.png', createdDate: '09/01/2025', description: 'A portrait of a woman.', tags: ['art', 'portrait'] },
        { title: 'Red Boats at Argenteuil', imageUrl: '/images/boat.png', createdDate: '03/25/2025', description: 'Red boats at Argenteuil.', tags: ['art', 'nature', 'realism'] },
        { title: 'Impression Sunrise', imageUrl: '/images/impression-sunrise.png', createdDate: '12/15/2022', description: 'A beautiful sunset.', tags: ['art', 'nature', 'painting'] },
        { title: 'The Artist\'s Garden at Giverny', imageUrl: '/images/irises-in-monets-garden.png', createdDate: '07/10/2021', description: 'A garden.', tags: ['art', 'nature', 'flowers', 'garden'] },
    ]);

    const recentWorks = allWorks
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
        .slice(0, 2);
        
    return (
        <div>
            <HomeHeader/>
            <div className="titles">Works</div>
            <div className='images-container'>
                <div className="add-button-container">
                    <button className="add-button">+</button>
                    <div className="add-button-text">New Work</div>
                </div>
                {recentWorks.map((work) => (
                    <Image key={work.title} work={work} />
                ))}
                {allWorks.length > 2 && <button>See All {allWorks.length}</button>}
            </div>
            <div className="titles">Portfolios</div>
            <div className='images-container'>
                <div className="add-button-container">
                    <button className="add-button">+</button>
                    <div className="add-button-text">New Work</div>
                </div>
                {recentWorks.map((work) => (
                    <Image key={work.title} work={work} />
                ))}
                {allWorks.length > 2 && <button>See All {allWorks.length}</button>}
            </div>
        </div>
    );
}

export default Home;