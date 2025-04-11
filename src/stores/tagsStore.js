import { create } from 'zustand';
import { useWorksStore } from './worksStore';

export const useTagsStore = create((set, get) => ({
    tags: (() => {
        const works = useWorksStore.getState().works;
        const tagCounts = {};

        works.forEach((work) => {
            work.tags.forEach((tag) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return tagCounts;
    })(),
    
    getUsedSortedByCount: () => { 
        return Object.entries(get().tags)
        .filter(([name, count]) => count > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));
    },  
    
    getUnusedTags: () => {
        return Object.entries(get().tags)
        .filter(([name, count]) => count === 0)
        .map(([name, count]) => ({ name, count }));
    },

    getAllTags: () => {
        return get().tags;
    },

    updateTagCount: (tagName) => {
        set((state) => {
            const currentCount = state.tags[tagName] || 0;
            return {
                tags: {
                    ...state.tags,
                    [tagName]: currentCount + 1,
                },
            };
        });
    },
}));
