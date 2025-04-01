import { create } from 'zustand';

export const usePortfoliosStore = create((set, get) => ({
    portfolios: [
        { title: 'Dreamworks', imageUrl: '/images/portfolio2.png', createdDate: new Date('03/01/2025'), description: 'A portfolio for dreamworks.', tags: ['art', 'paintings', 'cartoon'], link : 30},
        { title: 'Cellos at Texas', imageUrl: '/images/portfolio1.png', createdDate: new Date('02/25/2025'), description: 'A portfolio for cellos at texas.', tags: ['audio', 'expressionism'], link : 7},
        { title: 'Impressionism', imageUrl: '/images/monet_port.png', createdDate: new Date('02/25/2024'), description: 'A portfolio for impressionism.', tags: ['art', 'impressionism'], link : 7},
    ],

    getPortfoliosLength: () => { 
        return get().portfolios.length;
    },
    
    getSortedByDate: (ascending=false) => {
        return get().portfolios.sort((a, b) => {
            const dateA = a.createdDate;
            const dateB = b.createdDate;
            return ascending ? dateA - dateB : dateB - dateA;
        });
    },

    getSortedByName: (ascending=false) => {
        return get().portfolios.sort((a, b) => {
            return ascending ? a.title - b.title : b.title - a.title;
        });
    },

    getFilterByTags: (tags) => {
       return get().portfolios.filter(portfolio => tags.some(tag => portfolio.tags.includes(tag)))
    },
    
    getFilteredByName: (name) => {
        return get().portfolios
            .filter(portfolio =>
                portfolio.title.toLowerCase().includes(name.toLowerCase())
            )
            .sort((a, b) => b.score - a.score)
    },


    /*
    To add a new Portfolio
    
    Portfolio {
        title: string
        createdDate: Date object
        description: string
        tags: [string]
    }
    */
    addPortfoliio: (newPortfolio) => {
        set((state) => ({
            portfolios: [...state.portfolios, newPortfolio],
        }));
    },    
}));
