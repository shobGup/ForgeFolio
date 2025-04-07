import { create } from 'zustand';
import { Canvas } from 'fabric';

export const usePortfoliosStore = create((set, get) => ({
    currentPorfolio: null, 
    setCurrentPortfolio: (portfolio) => {
        set({currentPortfolio : portfolio});
    },
    
    getCurrentPortfolio: () => {
        return get().currentPortfolio;
    },  

    setCurrentPortfolioName: (name) => {
        const currentPortfolio = get().getCurrentPortfolio();
        set((state) => {
            currentPortfolio['title'] = name;
        })
    },

    getCurrentPortfolioName: () => {
        const currentPortfolio = get().getCurrentPortfolio()
        return currentPortfolio['title']
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
            portfolios[index] = {
                ...portfolioToUpdate,
                [key]: newValue,
            };
            get().setCurrentPortfolio(portfolios[index])
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

    getInitialCanvasHeight: () => {
        const currentPortfolio = get().getCurrentPortfolio();
        let height = 0;
        if (currentPortfolio["configurations"].includes('Headshot')) {
            height += 0;
        }

        if (currentPortfolio["configurations"].includes('Media Descriptions')) {
            height += 0;
        }

        if (currentPortfolio["configurations"].includes('Media Creation Date')) {
            height += 0;
        }

        if (currentPortfolio["configurations"].includes('Resume')) {
            height += 0;
        }

        if (currentPortfolio["configurations"].includes('Contact Information')) {
            height += 0;
        }

        if (currentPortfolio["configurations"].includes('Social Links')) {
            height += 0;
        }
        
        height += currentPortfolio["mediaCount"] * 500;
        return height;
    }
}));