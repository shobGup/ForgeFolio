import { create } from 'zustand';

export const useTagsStore = create((set, get) => ({
    tags : {
        'Painting': 4,
        'Digital Art': 3,
        'Photography': 2,
        'Nature': 2,
        'Sculpture': 1,
        'Mixed Media': 1,
        'Collage': 5,
        'Ink Drawing': 2,
        'Sketches': 6,
        'Portrait': 3,
        'Landscape': 3,
        'Abstract': 4,
        'Surrealism': 2,
        'Expressionism': 3,
        'Pop Art': 2,
        'Minimalism': 1,
        'Realism': 2,
        'Impressionism': 3,
        'Modern Art': 2,
        'Cubism': 1,
        'Calligraphy': 2,
        'Charcoal Drawing': 1,
        'Zines': 1,
        'Fashion Illustration': 2,
        'Tattoo Design': 1,
        'Vector Art': 1,
        'Pixel Art': 2,
        '3D Modeling': 1,
        'Mural': 1,
        'Street Art': 2,
        'Graffiti': 2,
        'Stop Motion': 1,
        'Art Installation': 1,
        'Performance Art': 1,
        'Ceramics': 1,
        'Glass Art': 1,
        'Woodworking': 1,
        'Metalwork': 1,
        'Textile Art': 1,
        'Graffiti Lettering': 1,
        'Cartoon': 0,
        'Illustration': 0,
        'Concept Art': 0,
        'Fan Art': 0,
        'Stencil Art': 0,
        'Animation': 0,
        'Oil Painting': 0,
        'Watercolor': 0,
        'Gouache': 0,
        'Line Art': 0,
        'Poster Design': 0,
        'Album Art': 0,
        'Cover Art': 0,
        'Sumi-e': 0,
        'Pointillism': 0,
        'Futurism': 0,
        'Op Art': 0,
        'Neo-Expressionism': 0,
        'Doodle Art': 0,
        'Children’s Book Art': 0,
        'Mosaic': 0,
        'Stencil Graffiti': 0,
        'Art Deco': 0,
        'Art Nouveau': 0,
        'Hyperrealism': 0,
        'Symbolism': 0,
        'Cyberpunk Art': 0,
        'Steampunk Art': 0,
        'Fantasy Art': 0,
        'Sci-Fi Art': 0,
        'Book Illustration': 0,
        'Comic Art': 0,
        'Game Concept Art': 0,
        'Prop Design': 0,
        'Matte Painting': 0,
        'Architectural Sketching': 0,
        'Urban Sketching': 0,
        'Environmental Art': 0,
        'Life Drawing': 0,
        'Figure Drawing': 0
    },

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

    addNewTag: (newTag) => {
        set((state) => ({
            tags: { ...state.tags, [newTag]: 1 },
        }));
    },
}));
