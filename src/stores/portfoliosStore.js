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
    
    portfolios: [],

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

    deletePortfolio: (title) => {
        set((state) => ({
            portfolios: state.portfolios.filter((w) => w !== title),
        }));
    },


    getInitialCanvasHeight: () => {
        const currentPortfolio = get().getCurrentPortfolio();
        let height = 0;
        if (currentPortfolio["configurations"].includes('Headshot')) {
            height += 500;
        }

        if (currentPortfolio["configurations"].includes('Contact Information')) {
            height += 100;
        }
        
        height += currentPortfolio["mediaCount"] * 700;
        return height;
    }
}));