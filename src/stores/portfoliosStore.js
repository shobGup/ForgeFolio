import { create } from 'zustand';

export const usePortfoliosStore = create((set, get) => ({
    portfolios: [
        { title: 'Dreamworks', imageUrl: '/images/portfolio2.png', createdDate: new Date('03/01/2025'), description: 'A portfolio for dreamworks.', tags: ['art', 'paintings', 'cartoon'], link: 30 },
        { title: 'Cellos at Texas', imageUrl: '/images/portfolio1.png', createdDate: new Date('02/25/2025'), description: 'A portfolio for cellos at texas.', tags: ['audio', 'expressionism'], link: 7 },
        { title: 'Impressionism', imageUrl: '/images/monet_port.png', createdDate: new Date('02/25/2024'), description: 'A portfolio for impressionism.', tags: ['art', 'impressionism'], link: 7 },
    ],

    getPortfoliosLength: () => { 
        return get().portfolios.length;
    },
    
    getSortedByDate: (ascending=false) => {
        return [...get().portfolios].sort((a, b) => {
            return ascending 
                ? a.createdDate - b.createdDate 
                : b.createdDate - a.createdDate;
        });
    },

    getSortedByName: (ascending=true) => {
        return [...get().portfolios].sort((a, b) => {
            return ascending 
                ? a.title.localeCompare(b.title) 
                : b.title.localeCompare(a.title);
        });
    },

    getFilterByTags: (tags) => {
        return get().portfolios.filter(portfolio => 
            tags.every(tag => portfolio.tags.includes(tag))
        );
    },
    
    getFilteredByName: (name) => {
        return get().portfolios.filter(portfolio =>
            portfolio.title.toLowerCase().includes(name.toLowerCase())
        );
    },

    addPortfolio: (newPortfolio) => {
        set((state) => ({
            portfolios: [...state.portfolios, newPortfolio],
        }));
    },    
}));