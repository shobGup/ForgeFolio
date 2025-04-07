import React from 'react';
import './styles/EditSidebar.css';
import SidebarImage from './SidebarImage';
import { useWorksStore } from '../../stores/worksStore';
import { usePortfoliosStore } from '../../stores/portfoliosStore';

const EditSidebar = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const { works } = useWorksStore();

    const currPortfolio = usePortfoliosStore.getState().getCurrentPortfolio();
    const tagWorks = currPortfolio?.tags
        ? useWorksStore.getState().scoreWorksByTags(currPortfolio.tags)
        : [];

    const filteredWorks = tagWorks
        .filter(work =>
            work.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a.score !== undefined && b.score !== undefined) {
                return b.score - a.score;
            }
            return b.createdDate - a.createdDate;
        });

    return (
        <div className="sidebar">
            <div className="header-box">
                <h3 className="header-box-title">Other Works</h3>
                <div className="header-search">
                    <img src={process.env.PUBLIC_URL + "/images/toolbar_icons/search.svg"} alt="Search Icon" className="search-icon"/>
                    <input 
                        className="header-search-input" 
                        type="search" 
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    /> 
                </div>
            </div>
            <div className="works-section">
                {filteredWorks.length === 0 ? (
                    <div className="no-results">
                        No works found
                    </div>
                ) : (
                    filteredWorks.map((work) => (
                        <SidebarImage 
                            key={work.title} 
                            work={work} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default EditSidebar;
