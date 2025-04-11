import { create } from 'zustand';

export const useWorksStore = create((set, get) => ({
    works: [
        { title: 'After Supper', imageUrl: '/images/experiment-photos/AfterSupper.jpg', createdDate: new Date('04/10/2025'), description: 'This painting is about what remains. A finished meal, a few crumbs, a half-empty glass — quiet evidence of presence, of passing time. The composition is restrained, but the story is full: nourishment, pause, and the beauty of the ordinary.', tags: ['Painting', 'Realism', 'Still-life', 'Oil', 'Rustic'], score: 5 },
        { title: 'Baroque Dream', imageUrl: '/images/experiment-photos/BaroqueDream.jpg', createdDate: new Date('04/10/2025'), description: 'This work merges fashion and narrative, placing a modern figure in a baroque setting. Her gown becomes a painted canvas—an imagined seascape drifting across her body—blurring the line between memory, escape, and dream.', tags: ['Fashion Illustration', 'Baroque', 'Lavish', 'Regal', 'Elegant', 'Surrealism'], score: 80 },
        { title: 'Crimson Grace', imageUrl: '/images/experiment-photos/CrimsonGrace.jpg', createdDate: new Date('04/10/2025'), description: 'This portrait honors strength with grace. I aimed to capture not just likeness, but presence — the quiet confidence, the trace of a knowing smile. The texture of the garment echoes the complexity of the sitter, rich with folds, shadows, and stories untold.', tags: ['Oil', 'Realism', 'Neoclassical', 'Portrait', 'Painting'], score: 84 },
        { title: 'Echo Yawn', imageUrl: '/images/experiment-photos/EchoYawn_04.jpg', createdDate: new Date('04/10/2025'), description: 'This piece plays with scale and synchronicity — capturing a shared moment of instinct and emotion between parent and child. The yawns echo through the quiet forest, exaggerated to the edge of humor, yet grounded in tenderness. It’s a study in wild intimacy and exaggerated form.', tags: ['Surrealism', 'Humorous', 'Animal'], score: 72 },
        { title: 'Electric Gaze', imageUrl: '/images/experiment-photos/ElectricGaze_final_final.jpg', createdDate: new Date('04/10/2025'), description: 'This portrait is all attitude and atmosphere. I wanted the glasses to feel like a second lens—reflecting a world of color and distortion. The subject remains still, composed, but the brushstrokes pulse with energy, hinting at the chaos just beneath the surface.', tags: ['Pop Art', 'Portrait', 'Expressionism', 'Mixed Media', 'Vibrant', 'Bold'], score: 23 },        
        { title: 'Evening Glow', imageUrl: '/images/experiment-photos/EveningGlow_02.jpg', createdDate: new Date('04/10/2025'), description: 'This piece captures a fleeting moment between two figures in the rain, wrapped in the warmth of city lights. The vivid palette reflects the emotion of the evening — passion, mystery, and calm — all mirrored in the wet pavement. It’s a study in atmosphere and memory.', tags: ['Impressionism', 'Painting', 'Vibrant', 'Impasto'], score: 62 },        
        { title: 'Field Notes', imageUrl: '/images/experiment-photos/FieldNotes_07_final.jpeg', createdDate: new Date('04/10/2025'), description: 'This work is an emotional sketch — a visual improvisation where color, shape, and texture collide. The red grounds the piece in urgency, while the scattered symbols and strokes suggest fragmented thought, memory, and movement. It’s about rhythm more than reason.', tags: ['Collage', 'Abstract', 'Experimental', 'Modern'], score: 43 },
        { title: 'Folded Motion', imageUrl: '/images/experiment-photos/FoldedMotion.jpeg', createdDate: new Date('04/10/2024'), description: 'This piece explores tension and balance through form. The folds and curves press against one another, sharp yet fluid — like movement frozen mid-transition. The primary colors cut through the darkness, representing conflict, energy, and harmony in constant negotiation.', tags: ['Abstract', 'Geometric', 'Experimental', 'Modern'], score: 98 },
        { title: 'Hushed Light', imageUrl: '/images/experiment-photos/HushedLight_05.jpg', createdDate: new Date('04/10/2025'), description: 'This piece explores light as both color and emotion. I layered soft pastels and bold palette knife textures to evoke a sky in transition — a quiet conversation between earth, water, and the last blush of sun. It’s about stillness, surrender, and the vastness of quiet beauty.', tags: ['Nature', 'Peaceful', 'Impressionism', 'Landscape', 'Soft', 'Painting'], score: 77 },
        { title: 'March Of Steel', imageUrl: '/images/experiment-photos/MarchOfSteel.jpg', createdDate: new Date('04/10/2025'), description: 'This work is an orchestration of chaos — a panoramic portrayal of discipline, tension, and spectacle. I sought to capture the immense scale of battle not only in numbers, but in mood: the stoic faces, the rhythm of horses, the fog-draped mountains watching silently above it all.', tags: ['Painting', 'Historic', 'Realism', 'War'], score: 77 },
        { title: 'Market Scene', imageUrl: '/images/experiment-photos/MarketScene_done.jpeg', createdDate: new Date('04/10/2025'), description: 'This work captures a moment of rustic abundance — part domestic labor, part quiet theater. The gesture, the glance, the array of textures and forms speak to a rhythm of life grounded in survival and shared stories. It’s as much about intimacy as it is about meat and trade.', tags: ['Realism', 'Rustic', 'Oil', 'Baroque'], score: 77 },
        { title: 'Memory Overlay', imageUrl: '/images/experiment-photos/MemoryOverlay_08.jpeg', createdDate: new Date('04/10/2025'), description: 'This collage is built from fragments—of text, memory, and identity. The partially obscured face speaks to presence within noise, to selfhood shaped by stories, headlines, and scribbled thoughts. Light falls across it like a moment of clarity, fleeting and incomplete.', tags: ['Collage', 'Mixed Media', 'Portrait', 'Pop Art'], score: 77 },
        { title: 'Patchwork Self', imageUrl: '/images/experiment-photos/PatchworkSelf.jpg', createdDate: new Date('04/10/2025'), description: 'This silhouette is constructed from remnants — fragments of color, text, and texture — each one a small record of time, culture, and memory. The figure is anonymous yet deeply personal, formed entirely by what surrounds and fills it. The drips below suggest the self is always in motion, leaking history.', tags: ['Collage', 'Mixed Media', 'Silhouette', 'Pop Art', 'Surrealism'], score: 77 },
        { title: 'Pixel Persona', imageUrl: '/images/experiment-photos/PixelPersona.jpg', createdDate: new Date('04/10/2025'), description: 'This piece explores perception and presence through the lens of visual technology. Using halftone dots — a nod to early print media — I reframe the portrait as a field of data. The face appears, disappears, and re-emerges depending on distance, reminding us how identity can shift with perspective.', tags: ['Photography', 'Pop Art', 'Halftone', 'Minimalism'], score: 77 },
        { title: 'Quiet Companion', imageUrl: '/images/experiment-photos/QuietCompanion_done_final.jpg', createdDate: new Date('04/10/2025'), description: 'This painting is about stillness — the moment between movement and memory. The sleeping dog becomes part of the arrangement, as natural and present as the clay pot or the bundle of sticks. It\'s a meditation on warmth, shelter, and the unspoken poetry of the everyday.', tags: ['Animal', 'Oil', 'Realism', 'Still-life', 'Baroque'], score: 77 },
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
