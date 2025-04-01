import React from 'react';
import Image from '../components/Image/Image.js';
import SeeAllHeader from '../components/SeeAll/SeeAllHeader.js';
import { usePortfoliosStore } from '../stores/portfoliosStore.js';
import './styles/Portfolios.css';

const Portfolios = () => {
    const [allPorts, setAllPorts] = React.useState([
        { title: 'Dreamworks', imageUrl: '/images/portfolio2.png', createdDate: '03/01/2025', description: 'A portfolio for dreamworks.', tags: ['art', 'paintings', 'cartoon'], link : 30},
        { title: 'Cellos at Texas', imageUrl: '/images/portfolio1.png', createdDate: '02/25/2025', description: 'A portfolio for cellos at texas.', tags: ['audio', 'expressionism'], link : 7},
        { title: 'Impressionism', imageUrl: '/images/monet_port.png', createdDate: '02/25/2024', description: 'A portfolio for impressionism.', tags: ['art', 'impressionism'], link : 10},

    ]);

    const recentPortfolios = usePortfoliosStore.getState().getSortedByDate()
        
    return (
        <div>
            <SeeAllHeader/>
            <div className="images-grid-port ">
                {recentPortfolios.map((work) => (
                    <Image key={work.title} work={work} type = "portfolio" />
                ))}
            </div>
        </div>
    );
}

export default Portfolios;