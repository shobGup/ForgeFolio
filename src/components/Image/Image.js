import React from 'react';
import './Image.css';

const Image = ({ work, type }) => {
    return (
        <div className="works">
            <div className="image-container">
                <img src={work.imageUrl.startsWith("/images") ? process.env.PUBLIC_URL + work.imageUrl : work.imageUrl} alt={work.description} />
                <div className="overlay">
                    <div className="icon-box">
                        {type === "work" ? (
                            <>
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/edit_icon.png"} 
                                    alt="Edit Icon" 
                                    className="works-seeall-icon"
                                />
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/bin.png"} 
                                    alt="Bin Icon" 
                                    className="works-seeall-icon"
                                />
                            </>
                        ) : (
                            <>
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/edit_icon.png"} 
                                    alt="Edit Icon" 
                                    className="works-seeall-icon"
                                />
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/bin.png"} 
                                    alt="Bin Icon" 
                                    className="works-seeall-icon"
                                />
                                <img 
                                    src={process.env.PUBLIC_URL + "/images/work_all_symbols/share.png"} 
                                    alt="Share Icon" 
                                    className="works-seeall-icon"
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
        </div>
    );
};

export default Image;