import { create } from 'zustand';

export const useWorksStore = create((set, get) => ({
    works: [
        { title: 'Mona Lisa', imageUrl: '/images/mona-lisa.png', createdDate: new Date('09/01/2025'), description: 'A portrait of a woman.', tags: ['art', 'portrait'] },
        { title: 'Red Boats at Argenteuil', imageUrl: '/images/boat.png', createdDate: new Date('03/25/2025'), description: 'Red boats at Argenteuil.', tags: ['art', 'nature', 'realism'] },
        { title: 'Impression Sunrise', imageUrl: '/images/impression-sunrise.png', createdDate: new Date('12/15/2022'), description: 'A beautiful sunset.', tags: ['art', 'nature', 'painting'] },
        { title: 'The Artist\'s Garden at Giverny', imageUrl: '/images/irises-in-monets-garden.png', createdDate: new Date('07/10/2021'), description: 'A garden.', tags: ['art', 'nature', 'flowers', 'garden'] },
        { title: 'Girl with the Pearl Earrings', imageUrl: '/images/girl-with the-pearl-earings.png', createdDate: new Date('08/29/2024'), description: 'Girl with pearl hearings.', tags: ['art', 'portrait', 'human', 'realism'] },        
        { title: 'Scream', imageUrl: '/images/scream.png', createdDate: new Date('03/27/2025'), description: 'Guy screaming.', tags: ['art', 'abstract', 'portrait', 'human'] },        
        { title: 'Starry Night', imageUrl: '/images/starrynight.png', createdDate: new Date('09/02/2025'), description: 'Starry Night.', tags: ['art', 'nature', 'abstract'] },
        { title: 'The Persistence of Memories', imageUrl: '/images/the-persistence-of-memories.jpg', createdDate: new Date('07/16/2024'), description: 'Clocks and stuff.', tags: ['art', 'surrealism', 'abstract', 'nature'] },
        { title: 'The Great Wave', imageUrl: '/images/great-wave.jpg', createdDate: new Date('07/16/2025'), description: 'Big Wave.', tags: ['art', 'nature', 'japanese', 'nature'] },
    ],
    getWorksLength: () => { 
        return get().works.length;
    },
    getSortedByDate: (ascending=false) => {
        return get().works.sort((a, b) => {
            const dateA = a.createdDate;
            const dateB = b.createdDate;
            return ascending ? dateA - dateB : dateB - dateA;
        });
    },

    getSortedByName: (ascending=false) => {
        return get().works.sort((a, b) => {
            return ascending ? a.title - b.title : b.title - a.title;
        });
    },

    getFilterByTags: (tags) => {
       return get().works.filter(work => tags.some(tag => work.tags.includes(tag)))
    },
    
    getFilteredByName: (name) => {
        return get().works
            .filter(work =>
                work.title.toLowerCase().includes(name.toLowerCase())
            )
            .sort((a, b) => b.score - a.score)
    },


    /*
    To add a newWork
    
    Work {
        title: string
        imageUrl: string (Path to image)
        createdDate: Date object
        description: string
        tags: [string]
    }
    */
    addWork: (newWork) => {
        set((state) => ({
            works: [...state.works, newWork],
        }));
    },    
}));
