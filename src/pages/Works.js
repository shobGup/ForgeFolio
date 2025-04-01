import React from 'react';
import {useState} from 'react';
import Image from '../components/Image/Image.js';
import SeeAllHeader from '../components/SeeAll/SeeAllHeader.js';
import './styles/Works.css';
import { useWorksStore } from '../stores/worksStore.js';

const Works = () => {
    const [sortState, setSortState] = useState("default");
    const worksStore = useWorksStore.getState();

    const sortedWorks = () => {
        if (sortState === "name") {
            return worksStore.getSortedByName();
        } else if (sortState === "date") {
            return worksStore.getSortedByDate();
        } else {
            return worksStore.getSortedByDate();
        }
    };

    const [works, setWorks] = useState(worksStore.getSortedByDate());



    return (
        <div>
            <SeeAllHeader sortState={sortState} setSortState={setSortState} setWorks={setWorks} />           
            <div className="images-grid">
                {works.map((work) => (
                    <Image key={work.title} work={work} type="work" />
                ))}
            </div>
        </div>
    );
}

export default Works;