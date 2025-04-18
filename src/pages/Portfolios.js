import React, { useState, useEffect } from 'react';
import Image from '../components/Image/Image.js';
import SeeAllHeader from '../components/SeeAll/SeeAllHeader.js';
import { usePortfoliosStore } from '../stores/portfoliosStore.js';
import './styles/Portfolios.css';

const Portfolios = () => {
    const [sortState, setSortState] = useState("date");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    
    const {
        portfolios,
        getSortedByDate,
        getSortedByName,
        getFilterByTags,
        getFilteredByName,
    } = usePortfoliosStore();


    const getFilteredAndSortedPortfolios = () => {
        let filteredPortfolios = [...portfolios];
    
        if (selectedTags.length > 0) {
            filteredPortfolios = getFilterByTags(selectedTags);
        }
    
        const nameSearch = searchQuery.replace(/#([^#]*)/g, '').trim();
        if (nameSearch) {
            filteredPortfolios = getFilteredByName(nameSearch).filter(portfolio =>
                filteredPortfolios.some(fp => fp.title === portfolio.title)
            );
        }        
        switch (sortState) {
            case "name":
                return getSortedByName(true).filter(portfolio => 
                    filteredPortfolios.some(fp => fp.title === portfolio.title)
                );
            case "date":
            default:
                return getSortedByDate().filter(portfolio => 
                    filteredPortfolios.some(fp => fp.title === portfolio.title)
                );
        }
    };
    
    const [refresh, setRefresh] = useState(false);

    const handleDeletePortfolio = (title) => {
        usePortfoliosStore.getState().deletePortfolio(title);
        setRefresh(prev => !prev);
    };

    const [displayedPortfolios, setDisplayedPortfolios] = useState(getSortedByDate());
    
    useEffect(() => {
        setDisplayedPortfolios(getFilteredAndSortedPortfolios());
    }, [sortState, searchQuery, selectedTags, portfolios]);

    return (
        <div>
            <SeeAllHeader 
                sortState={sortState}
                setSortState={setSortState}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedTags={setSelectedTags}
            />
            <div className="images-grid-port">
                {displayedPortfolios.map((portfolio) => (
                    <Image key={portfolio.title} work={portfolio} type="portfolio" deletePortfolio={handleDeletePortfolio}/>
                ))}
            </div>
        </div>
    );
};

export default Portfolios;