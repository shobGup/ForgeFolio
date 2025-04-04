import { create } from 'zustand';

export const usePortfoliosStore = create((set, get) => ({
    currentPorfolio: null, 
    setCurrentPortfolio: (portfolio) => {
        set({currentPortfolio : portfolio});
    },
    
    getCurrentPortfolio: () => {
        return get().currentPortfolio;
    },  

    portfolios: [
        { 
            title: 'Dreamworks', 
            imageUrl: '/images/portfolio2.png', 
            createdDate: new Date('03/01/2025'), 
            description: 'A portfolio for dreamworks.', 
            tags: ['art', 'paintings', 'cartoon'], 
            canvas: null,
            mediaCount: 5,
            link: 30,
            configurations: ['Headshot', 'Media Descriptions', 'Contact Information']
        },
        { 
            title: 'Cellos at Texas', 
            imageUrl: '/images/portfolio1.png', 
            createdDate: new Date('02/25/2025'), 
            description: 'A portfolio for cellos at texas.', 
            tags: ['audio', 'expressionism'], 
            canvas: null,
            mediaCount: 3,
            link: 7,
            configurations: ['Media Descriptions', 'Social Links'] 
        },
        { 
            title: 'Impressionism', 
            imageUrl: '/images/monet_port.png', 
            createdDate: new Date('02/25/2024'), 
            description: 'A portfolio for impressionism.', 
            tags: ['art', 'impressionism'], 
            canvas: null,
            mediaCount: 7,
            link: 7,
            configurations: []
        },
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
            tags.every(searchTag =>
                portfolio.tags.some(portfolioTag =>
                    portfolioTag.toLowerCase().includes(searchTag.toLowerCase())
                )
            )
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

    updatePortfolio: (key, newValue) => {
        set((state) => {
            const portfolios = [...state.portfolios];
            const portfolioToUpdate = get().getCurrentPortfolio();
            const index = portfolios.findIndex(portfolio => portfolio.title === portfolioToUpdate.title);
            console.log(index);
            portfolios[index] = {
                ...portfolioToUpdate,
                [key]: newValue,
            };
            console.log(portfolios);
    
            return { portfolios };
        });
    },

    deletePortfolio: () => {
        set((state) => {
            const portfolios = [...state.portfolios];
            const portfolioToUpdate = get().getCurrentPortfolio();
            const index = portfolios.findIndex(portfolio => portfolio.title === portfolioToUpdate.title);
    
            portfolios.splice(index, index);
    
            return { portfolios };
        });
    },
}));