import React, {useState, useRef} from 'react';
import Image from '../components/Image/Image.js';
import HomeHeader from '../components/HomeHeader/HomeHeader.js';
import Popup from "../components/Popup/Popup";
import AddWorkPage1 from "../components/AddWork/AddWorkPage1";
import AddWorkPage2 from "../components/AddWork/AddWorkPage2";
import AddPortfolioPage1 from "../components/AddPortfolio/AddPortfolioPage1.js";
import AddPortfolioPage2 from "../components/AddPortfolio/AddPortfolioPage2.js";
import AddPortfolioPage3 from "../components/AddPortfolio/AddPortfolioPage3.js";
import EditWorkPage1 from "../components/EditWork/EditWorkPage1.js";
import EditWorkPage2 from "../components/EditWork/EditWorkPage2.js";
import { useNavigate } from "react-router-dom";
import { useWorksStore } from '../stores/worksStore.js';
import { usePortfoliosStore} from '../stores/portfoliosStore.js';
import './styles/Home.css';
import { useLocation } from 'react-router-dom';
import './styles/SharePortfolioPopup.css';


const Home = () => {
    const location = useLocation();
    const [showPopup, setShowPopup] = React.useState(false);
    React.useEffect(() => {
        if (location?.state?.showPopup) {
            navigate(location.pathname, { replace: true, state: {} });
            setShowPopup(true);
            const timer = setTimeout(() => setShowPopup(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [location?.state]);
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

    const resetAddWorkState = () => {
        setAddWorkPopup(false);
        setFile(null);
        if (ref.current) ref.current.value = "";
        setAddWorkPage(0);
        setWorkTitle("");
        setWorkDate("");
        setWorkDescription("");
        setWorkTags([]);
    };

    // Work Edit
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [work, setWork] = useState(null);
    const [newWork, setNewWork] = useState({
        title: "",
        imageUrl: "",
        createdDate: new Date(),
        description: "",
        tags: [],
    });
    const [editWorkPage, setEditWorkPage] = useState(0);

    const resetEditWorkState = () => {
        setShowEditPopup(false);
        setWork(null);
        setNewWork({
            title: "",
            imageUrl: "",
            createdDate: new Date(),
            description: "",
            tags: [],
        });
        setEditWorkPage(0);
    }

    // Work Delete
    const [refresh, setRefresh] = useState(false);

    const handleDeleteWork = (title) => {
        useWorksStore.getState().deleteWork(title);
        
        setRefresh(prev => !prev);
    };
    
    const handleDeletePortfolio = (title) => {
        usePortfoliosStore.getState().deletePortfolio(title);
        setRefresh(prev => !prev);
    };

    
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
            <div
                className="add-button-container"
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        event.stopPropagation(); 
                    }
                }}
            >
                <input type="file" ref={ref} accept='.png,.jpeg,.jpg' hidden
        />
                <button className="add-button" onClick={() => {
                    resetAddWorkState();
                    ref.current.click();
                    // File Upload
                    ref.current.onchange = (_) => {
                        setFile(ref.current.files[0]);
                        setWorkTitle(ref.current.files[0].name.split(".")[0]);
                        setWorkDate(new Date(ref.current.files[0].lastModified).toISOString().split("T")[0]);
                        setAddWorkPopup(true);
                    };
                    ref.current.blur();
                }}>+</button>
                    <div className="add-button-text">New Work</div>
                </div>
                {useWorksStore.getState().getSortedByDate().slice(0, 2).map((work) => (
                    <Image key={work.title} work={work} type = "work" setWork={setWork} setNewWork={setNewWork} setShowEditPopup={setShowEditPopup} deleteWork={handleDeleteWork}/>
                ))}
                {useWorksStore.getState().getWorksLength() > 2 ? (
                        <div className='see-all-container'>
                            <button className='see-all-button' onClick={() => {navigate("/works")}}>See All {useWorksStore.getState().getWorksLength()}</button>
                        </div>
                    ) : (
                        <div className="see-all-container"></div> 
                    )}
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
                    <Image key={portfolio.title} work={portfolio} type = "portfolio" deletePortfolio={handleDeletePortfolio}/>
                ))}
                {usePortfoliosStore.getState().getPortfoliosLength() > 2 ? (
                        <div className='see-all-container'>
                            <button className='see-all-button' onClick={() => {navigate("/portfolios")}}>See All {usePortfoliosStore.getState().getPortfoliosLength()}</button>
                        </div>
                    ) : (
                        <div className="see-all-container"></div>
                    )}
            </div>



            <Popup trigger={addWorkPopup} closePopup={() => {resetAddWorkState();}}>
                {
                    addWorkPage === 0 ? <AddWorkPage1 file={file} setNextPage={setAddWorkPage} setFile={setFile} workTitle={workTitle} workDate={workDate} workDescription={workDescription} setWorkTitle={setWorkTitle} setWorkDate={setWorkDate} setWorkDescription={setWorkDescription}/> : <AddWorkPage2 file={file} setNextPage={setAddWorkPage} workTitle={workTitle} workDate={workDate} workDescription={workDescription} workTags={workTags} setWorkTags={setWorkTags} setAddWorkPopup={setAddWorkPopup} resetAddWorkState={resetAddWorkState}/>
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



            <Popup trigger={showEditPopup} closePopup={() => resetEditWorkState()}>
               {
                 editWorkPage === 0 ? 
                 <EditWorkPage1 work={work} newWork={newWork} setNewWork={setNewWork} setShowEditPopup={setShowEditPopup} goToPage={setEditWorkPage} />
                 :
                 <EditWorkPage2 work={work} newWork={newWork} setNewWork={setNewWork} setShowEditPopup={setShowEditPopup} goToPage={setEditWorkPage} resetAddWorkState={resetEditWorkState}/>
               }
            </Popup>
            {showPopup && (
                <div className="share-portfolio-popup">
                    Link copied to your clipboard. This link will expire in 30 days.
                </div>
            )}

        </div>
    );
}

export default Home;