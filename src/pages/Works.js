import { useState, useEffect } from 'react';
import Image from '../components/Image/Image.js';
import SeeAllHeader from '../components/SeeAll/SeeAllHeader.js';
import Popup from '../components/Popup/Popup.js';
import EditWorkPage1 from '../components/EditWork/EditWorkPage1.js';
import EditWorkPage2 from '../components/EditWork/EditWorkPage2.js';
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
    
        const nameSearch = searchQuery.replace(/#([^#]*)/g, '').trim();
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
            case "date":
            default:
                return getSortedByDate().filter(work => 
                    filteredWorks.some(fw => fw.title === work.title)
                );
        }
    };
    
    const [displayedWorks, setDisplayedWorks] = useState(getSortedByDate());

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

    const [refresh, setRefresh] = useState(false);

    const handleDeleteWork = (title) => {
        useWorksStore.getState().deleteWork(title);
        setRefresh(prev => !prev);
    };

    
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
                    <Image key={work.title} work={work} type = "work" setWork={setWork} setNewWork={setNewWork} setShowEditPopup={setShowEditPopup} deleteWork={handleDeleteWork}/>
                ))}
            </div>


            <Popup trigger={showEditPopup} closePopup={() => resetEditWorkState()}>
               {
                 editWorkPage === 0 ? 
                 <EditWorkPage1 work={work} newWork={newWork} setNewWork={setNewWork} setShowEditPopup={setShowEditPopup} goToPage={setEditWorkPage} />
                 :
                 <EditWorkPage2 work={work} newWork={newWork} setNewWork={setNewWork} setShowEditPopup={setShowEditPopup} goToPage={setEditWorkPage} resetAddWorkState={resetEditWorkState}/>
               }
            </Popup>
        </div>
    );
};
export default Works;