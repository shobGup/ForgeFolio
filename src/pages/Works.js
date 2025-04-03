import { useState, useEffect } from 'react';
import Image from '../components/Image/Image.js';
import SeeAllHeader from '../components/SeeAll/SeeAllHeader.js';
import './styles/Works.css';
import { useWorksStore } from '../stores/worksStore.js';

const Works = () => {
    const [sortState, setSortState] = useState("date");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    
    const {
        works,
        getSortedByDate,
        getSortedByName,
        getFilterByTags,
        getFilteredByName,
        getWorksLength
    } = useWorksStore();

    const getFilteredAndSortedWorks = () => {
        let filteredWorks = [...works];
        
        if (selectedTags.length > 0) {
            filteredWorks = getFilterByTags(selectedTags);
        }
        
        const nameSearch = searchQuery.replace(/#\w+/g, '').trim();
        if (nameSearch) {
            filteredWorks = getFilteredByName(nameSearch).filter(work => 
                filteredWorks.some(fw => fw.title === work.title)
            );
        }
        
        switch (sortState) {
            case "name":
                return getSortedByName(true).filter(work => 
                    filteredWorks.some(fw => fw.title === work.title)
                );
            case "tags":
                return [...filteredWorks].sort((a, b) => 
                    (a.tags[0] || '').localeCompare(b.tags[0] || '')
                );
            case "date":
            default:
                return getSortedByDate().filter(work => 
                    filteredWorks.some(fw => fw.title === work.title)
                );
        }
    };
    
    const [displayedWorks, setDisplayedWorks] = useState(getSortedByDate());
    
    useEffect(() => {
        setDisplayedWorks(getFilteredAndSortedWorks());
    }, [sortState, searchQuery, selectedTags, works]);

    return (
        <div>
            <SeeAllHeader 
                sortState={sortState}
                setSortState={setSortState}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedTags={setSelectedTags}
                totalWorks={getWorksLength()}
            />
            
            <div className="images-grid">
                {displayedWorks.map((work) => (
                    <Image key={work.title} work={work} type="work" />
                ))}
            </div>
        </div>
    );
};
export default Works;