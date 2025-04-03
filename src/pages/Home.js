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
import { useWorksStore } from '../stores/worksStore.js';
import { usePortfoliosStore} from '../stores/portfoliosStore.js';
import './styles/Home.css';


const Home = () => {
    const navigate = useNavigate();
    
    const [addWorkPopup, setAddWorkPopup] = useState(false);
    const [addWorkPage, setAddWorkPage] = useState(0);
    const [addPortfolioPopup, setAddPortfolioPopup] = useState(false);
    const [addPortfolioPage, setAddPortfolioPage] = useState(0);
    
    // File Upload
    // https://www.youtube.com/shorts/AmtAueCqDX4
    const ref = useRef();
    const [file, setFile] = useState(null);

    // Work Upload
    const [workTitle, setWorkTitle] = useState("");
    const [workDate, setWorkDate] = useState("");
    const [workDescription, setWorkDescription] = useState("");
    const [workTags, setWorkTags] = useState([]);

    const handleWorkAll = (e) => {
        e.preventDefault();
        navigate("/works")
    }

    const handlePortAll = (e) => {
        e.preventDefault();
        navigate("/portfolios")
    }
    
    const [newPortfolio, setNewPortfolio] = useState({
        title: "",
        imageUrl: "",
        createdDate: new Date(),
        description: "",
        tags: [],
        canvas: null,
        mediaCount: 0,
        link: 30,
        configurations: [],
    });
    
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
                    // File Upload
                    ref.current.onchange = (_) => {
                        setFile(ref.current.files[0]);
                        setWorkTitle(ref.current.files[0].name);
                        setWorkDate(new Date(ref.current.files[0].lastModified).toISOString().split("T")[0]);
                        setAddWorkPopup(true);
                };}}>+</button>
                    <div className="add-button-text">New Work</div>
                </div>
                {useWorksStore.getState().getSortedByDate().slice(0, 2).map((work) => (
                    <Image key={work.title} work={work} type = "work" />
                ))}
                <form onSubmit={handleWorkAll}>
                    {useWorksStore.getState().getWorksLength() > 2 ? (
                        <div className='see-all-container'>
                            <button className='see-all-button'>See All {useWorksStore.getState().getWorksLength()}</button>
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
                {usePortfoliosStore.getState().getSortedByDate().slice(0, 2).map((portfolio) => (
                    <Image key={portfolio.title} work={portfolio} type = "portfolio" />
                ))}
                <form onSubmit={handlePortAll}>
                    {usePortfoliosStore.getState().getPortfoliosLength() > 2 ? (
                        <div className='see-all-container'>
                            <button type="submit" className='see-all-button'>See All {usePortfoliosStore.getState().getPortfoliosLength()}</button>
                        </div>
                    ) : (
                        <div className="see-all-container"></div>
                    )}
                </form>
            </div>
            <Popup trigger={addWorkPopup} closePopup={() => {setAddWorkPopup(false); setFile(null); ref.current.value = ""; setAddWorkPage(0); setWorkDate(""); setWorkDescription(""); setWorkTitle(""); setWorkTags([]);}}>
                {
                    addWorkPage === 0 ? <AddWorkPage1 file={file} setNextPage={setAddWorkPage} setFile={setFile} workTitle={workTitle} workDate={workDate} workDescription={workDescription} setWorkTitle={setWorkTitle} setWorkDate={setWorkDate} setWorkDescription={setWorkDescription}/> : <AddWorkPage2 file={file} setNextPage={setAddWorkPage} workTitle={workTitle} workDate={workDate} workDescription={workDescription} workTags={workTags} setWorkTags={setWorkTags} setAddWorkPopup={setAddWorkPopup}/>
                }
            </Popup>
            <Popup 
                trigger={addPortfolioPopup}
                closePopup={() =>{
                    setAddPortfolioPopup(false); 
                    setAddPortfolioPage(0);
                    setNewPortfolio({
                        title: "",
                        imageUrl: "",
                        createdDate: new Date(),
                        description: "",
                        tags: [],
                        canvas: null,
                        mediaCount: 0,
                        link: 30,
                        configurations: [],
                    })
            }}>
                {addPortfolioPage === 0 
                        ? <AddPortfolioPage1 
                            setNextPage={setAddPortfolioPage}
                            newPortfolio={newPortfolio}
                            setNewPortfolio={setNewPortfolio}/>
                        : addPortfolioPage === 1 
                            ? <AddPortfolioPage2 
                                setNextPage={setAddPortfolioPage}
                                newPortfolio={newPortfolio}
                                setNewPortfolio={setNewPortfolio} />
                            : <AddPortfolioPage3 
                                setNextPage={setAddPortfolioPage}
                                newPortfolio={newPortfolio}
                                setNewPortfolio={setNewPortfolio}/>
                }
            </Popup>

        </div>
    );
}

export default Home;