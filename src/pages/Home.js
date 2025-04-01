import React, {useState, useRef} from 'react';
import Image from '../components/Image/Image.js';
import HomeHeader from '../components/HomeHeader/HomeHeader.js';
import Popup from "../components/Popup/Popup";
import AddWorkPage1 from "../components/AddWork/AddWorkPage1";
import AddWorkPage2 from "../components/AddWork/AddWorkPage2";
import AddPortfolioPage1 from "../components/AddPortfolio/AddPortfolioPage1.js";
import AddPortfolioPage2 from "../components/AddPortfolio/AddPortfolioPage2.js";
import AddPortfolioPage3 from "../components/AddPortfolio/AddPortfolioPage3.js";
import { useNavigate } from "react-router-dom";
import './styles/Home.css';


const Home = () => {
    const [allWorks, setAllWorks] = React.useState([
        { title: 'Mona Lisa', imageUrl: '/images/mona-lisa.png', createdDate: '09/01/2025', description: 'A portrait of a woman.', tags: ['art', 'portrait'] },
        { title: 'Red Boats at Argenteuil', imageUrl: '/images/boat.png', createdDate: '03/25/2025', description: 'Red boats at Argenteuil.', tags: ['art', 'nature', 'realism'] },
        { title: 'Impression Sunrise', imageUrl: '/images/impression-sunrise.png', createdDate: '12/15/2022', description: 'A beautiful sunset.', tags: ['art', 'nature', 'painting'] },
        { title: 'The Artist\'s Garden at Giverny', imageUrl: '/images/irises-in-monets-garden.png', createdDate: '07/10/2021', description: 'A garden.', tags: ['art', 'nature', 'flowers', 'garden'] },
    ]);

    const navigate = useNavigate();
    

    const recentWorks = allWorks
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
        .slice(0, 2);

    const [allPortfolios, setAllPortfolios] = React.useState([
        { title: 'Dreamworks', imageUrl: '/images/portfolio2.png', createdDate: '03/01/2025', description: 'A portfolio for dreamworks.', tags: ['art', 'paintings', 'cartoon'], link : 30},
        { title: 'Cellos at Texas', imageUrl: '/images/portfolio1.png', createdDate: '02/25/2025', description: 'A portfolio for cellos at texas.', tags: ['audio', 'expressionism'], link : 7},
        { title: 'Impressionism', imageUrl: '/images/monet_port.png', createdDate: '02/25/2024', description: 'A portfolio for impressionism.', tags: ['art', 'impressionism'], link : 10},
    ]);

    const recentPortfolios = allPortfolios
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
        .slice(0, 2);
    
    const [addWorkPopup, setAddWorkPopup] = useState(false);
    const [addWorkPage, setAddWorkPage] = useState(0);
    const [addPortfolioPopup, setAddPortfolioPopup] = useState(false);
    const [addPortfolioPage, setAddPortfolioPage] = useState(0);
    
    {/* File Upload */}
    {/* https://www.youtube.com/shorts/AmtAueCqDX4 */}
    const ref = useRef();
    const [file, setFile] = useState(null);

    const handleWorkAll = (e) => {
        e.preventDefault();
        navigate("/works")
    }

    const handlePortAll = (e) => {
        e.preventDefault();
        navigate("/portfolios")
    }
    return (
        <div>
            <HomeHeader/>
            <div className="titles">Works</div>
            <div className='images-container'>
                <div className="add-button-container">
                <input type="file" ref={ref} hidden/> 
                <button className="add-button" onClick={() => {
                    setFile(null);
                    ref.current.click();
                    ref.current.onchange = (_) => {
                        setFile(ref.current.files[0]);
                        setAddWorkPopup(true);
                };}}>+</button>
                    <div className="add-button-text">New Work</div>
                </div>
                {recentWorks.map((work) => (
                    <Image key={work.title} work={work} type = "work" />
                ))}
                <form onSubmit={handleWorkAll}>
                    {allWorks.length > 2 ? (
                        <div className='see-all-container'>
                            <button className='see-all-button'>See All {allWorks.length}</button>
                        </div>
                    ) : (
                        <div className="see-all-container"></div> 
                    )}
                </form>
            </div>
            <div className="titles">Portfolios</div>
            <div className='images-container'>
                <div className="add-button-container">
                <button className="add-button" 
                    onClick={() => {
                        setAddPortfolioPopup(true);
                ;}}>+</button>
                <div className="add-button-text">New Portfolio</div>
                </div>
                {recentPortfolios.map((portfolio) => (
                    <Image key={portfolio.title} work={portfolio} type = "portfolio" />
                ))}
                <form onSubmit={handlePortAll}>
                    {allPortfolios.length > 2 ? (
                        <div className='see-all-container'>
                            <button type="submit" className='see-all-button'>See All {allPortfolios.length}</button>
                        </div>
                    ) : (
                        <div className="see-all-container"></div>
                    )}
                </form>
            </div>
            <Popup trigger={addWorkPopup} closePopup={() => {setAddWorkPopup(false); setFile(null); ref.current.value = null; setAddWorkPage(0);}}>
                {
                    addWorkPage === 0 ? <AddWorkPage1 file={file} setNextPage={setAddWorkPage}/> : <AddWorkPage2 file={file} setNextPage={setAddWorkPage}/>
                }
            </Popup>
            <Popup trigger={addPortfolioPopup} closePopup={() =>{setAddPortfolioPopup(false); setAddPortfolioPage(0)}}>
                {
                    addPortfolioPage === 0 
                        ? <AddPortfolioPage1 setNextPage={setAddPortfolioPage} />
                        : addPortfolioPage === 1 
                            ? <AddPortfolioPage2 setNextPage={setAddPortfolioPage} />
                            : <AddPortfolioPage3 setNextPage={setAddPortfolioPage} />
                }
            </Popup>

        </div>
    );
}

export default Home;