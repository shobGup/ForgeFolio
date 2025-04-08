import { create } from 'zustand';

export const useWorksStore = create((set, get) => ({
    works: [
        { title: 'Mona Lisa', imageUrl: '/images/mona-lisa.png', createdDate: new Date('01/01/2025'), description: 'A portrait of a woman.', tags: ['art', 'portrait'], score: 5 },
        { title: 'Red Boats at Argenteuil', imageUrl: '/images/boat.png', createdDate: new Date('01/25/2025'), description: 'Red boats at Argenteuil.', tags: ['art', 'nature', 'realism'], score: 80 },
        { title: 'Impression Sunrise', imageUrl: '/images/impression-sunrise.png', createdDate: new Date('12/15/2022'), description: 'A beautiful sunset.', tags: ['art', 'nature', 'painting'], score: 84 },
        { title: 'The Artist\'s Garden at Giverny', imageUrl: '/images/irises-in-monets-garden.png', createdDate: new Date('07/10/2021'), description: 'A garden.', tags: ['art', 'nature', 'flowers', 'garden'], score: 72 },
        { title: 'Girl with the Pearl Earrings', imageUrl: '/images/girl-with the-pearl-earings.png', createdDate: new Date('08/29/2024'), description: 'Girl with pearl hearings.', tags: ['art', 'portrait', 'human', 'realism'], score: 23 },        
        { title: 'Scream', imageUrl: '/images/scream.png', createdDate: new Date('01/27/2025'), description: 'Guy screaming.', tags: ['art', 'abstract', 'portrait', 'human'], score: 62 },        
        { title: 'Starry Night', imageUrl: '/images/starrynight.png', createdDate: new Date('01/02/2025'), description: 'Starry Night.', tags: ['art', 'nature', 'abstract'], score: 43 },
        { title: 'The Persistence of Memories', imageUrl: '/images/the-persistence-of-memories.jpg', createdDate: new Date('07/16/2024'), description: 'Clocks and stuff.', tags: ['art', 'surrealism', 'abstract', 'nature'], score: 98 },
        { title: 'The Great Wave', imageUrl: '/images/great-wave.jpg', createdDate: new Date('01/16/2025'), description: 'Big Wave.', tags: ['art', 'nature', 'japanese', 'nature'], score: 77 },
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

    getSortedByName: (ascending=true) => {
        return [...get().works].sort((a, b) => {
            return ascending 
                ? a.title.localeCompare(b.title) 
                : b.title.localeCompare(a.title);
        });
    },

    getFilterByTags: (tags) => {
        return get().works.filter(work =>
            tags.every(searchTag =>
                work.tags.some(workTag =>
                    workTag.toLowerCase().includes(searchTag.toLowerCase())
                )
            )
        );
    },
    
    
    getFilteredByName: (name) => {
        return get().works
            .filter(work =>
                work.title.toLowerCase().includes(name.toLowerCase())
            )
            .sort((a, b) => b.score - a.score)
    },

    deleteWork: (work) => {
        set((state) => ({
            works: state.works.filter((w) => w !== work),
        }));
    },

    editWork: (oldWork, newWork) => {
        set((state) => ({
            works: state.works.map((w) => (w === oldWork ? newWork : w)),
        }));
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

    scoreWorksByTags: (portfolioTags) => {
        portfolioTags = portfolioTags.map(tag => tag.toLowerCase());
    
        const works = get().works;
        const dates = works.map(work => new Date(work.createdDate).getTime());
        const minDate = Math.min(...dates);
        const maxDate = Math.max(...dates);
        const dateRange = maxDate - minDate || 1;
    
        return works.map(work => {
            const workTags = work.tags.map(tag => tag.toLowerCase());
            const tagMatches = workTags.filter(tag => portfolioTags.includes(tag));
            const tagScore = (tagMatches.length / portfolioTags.length) * 100;
    
            const recencyRaw = new Date(work.createdDate).getTime();
            const recencyScore = ((recencyRaw - minDate) / dateRange) * 100;
    
            const score = Math.round(tagScore * 0.9 + recencyScore * 0.1);
            return { ...work, score };
        });
    },      
}));
