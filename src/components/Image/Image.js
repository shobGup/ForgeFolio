import React from 'react';
import './Image.css';
import { useNavigate } from 'react-router-dom';
import { usePortfoliosStore } from '../../stores/portfoliosStore';
import '../../pages/styles/SharePortfolioPopup.css';


const Image = ({ work, type, setWork = null, setNewWork = null, setShowEditPopup = null, deleteWork = null, deletePortfolio = null}) => {
    
    const navigate = useNavigate();
    const { setCurrentPortfolio } = usePortfoliosStore();

    const [visible, setVisible] = React.useState(true);
    
    React.useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setVisible(false), 4000); 
            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <div className="works">
            <div className="image-container">
                <img src={work.imageUrl.startsWith("/images/") ? process.env.PUBLIC_URL + work.imageUrl : work.imageUrl} alt={work.description} />
                <div className="overlay">
                    <div className="icon-box">
                        {type === "work" ? (
                            <>
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/edit_icon.png"} 
                                    alt="Edit Icon" 
                                    className="works-seeall-icon"
                                    onClick = {() => {
                                        setWork(work);
                                        setNewWork(work);
                                        setShowEditPopup(true);
                                        }
                                    }
                                />
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/bin.png"} 
                                    alt="Bin Icon" 
                                    className="works-seeall-icon"
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this work?")) {
                                            deleteWork(work);
                                        }
                                    }
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/edit_icon.png"} 
                                    alt="Edit Icon" 
                                    className="works-seeall-icon"
                                    onClick={() => {
                                        setCurrentPortfolio(work);  // Set the selected portfolio
                                        navigate(`/edit/${encodeURIComponent(work.title)}`);  // Navigate with route param
                                    }}
                                />
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/bin.png"} 
                                    alt="Bin Icon" 
                                    className="works-seeall-icon"
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this Portfolio?")) {
                                            deletePortfolio(work);
                                        }
                                    }
                                    }
                                />
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/share.png"} 
                                    alt="Share Icon" 
                                    className="works-seeall-icon"
                                    onClick={() => { setVisible(true)}}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div>{work.title}</div>
            {type === "portfolio" && (
                <div className="link-container">
                    <a 
                        href={`/portfolio/${work.title}`} 
                        className={`portfolio-link ${work.link <= 7 ? 'expiring-soon' : ''}`}
                    >
                        Link expires in {work.link} days
                    </a>
                </div>
            )}
            {visible && (
                <div className="share-portfolio-popup">
                    Link copied to your clipboard. This link will expire in {work.link} days.
                </div>
            )}
        </div>
    );
};

export default Image;