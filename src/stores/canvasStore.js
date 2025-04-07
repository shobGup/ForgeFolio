import { create } from 'zustand';
import { FabricImage, Textbox } from 'fabric';

export const useCanvasStore = create((set, get) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),
  setCanvasFromJSON: (canvasJSON) => {
    const canvas = get().canvas;
    if (!canvas) return;
  
    canvas.loadFromJSON(canvasJSON, () => {
      canvas.renderAll();
    });
  },

  viewMode: false, // Add this state
  setViewMode: (val) => set({ viewMode: val }),
  toggleViewMode: () => set((state) => ({ viewMode: !state.viewMode })),

  setInitialCanvas: (
    bestWorks,
    headshot, 
    mediaDescriptions, 
    mediaCreationDate, 
    contactInformation, 
    socialLinks,
  ) => {
    let x = 50;
    let y = 50;
    const canvas = get().canvas;
    
    if (!canvas) return;
    for (let i = 0; i < bestWorks.length; i++) {
      const { imageUrl, description, createdDate, title } = bestWorks[i];

      let image = new Image();
      image.src = imageUrl.startsWith('blob:') ? imageUrl : process.env.PUBLIC_URL + imageUrl;

      let scaledWidth = 0;
      let scaledHeight = 0;
      image.onload = () => {
        const maxWidth = 500;
        const maxHeight = 400;

        let { width, height } = image;

        // scale proportionally if needed
        const widthRatio = maxWidth / width;
        const heightRatio = maxHeight / height;
        const scale = Math.min(1, widthRatio, heightRatio);
        scaledWidth = width * scale;
        scaledHeight = height * scale;

        const fabricImg = new FabricImage(image, {
          left: x,
          top: y,
          scaleX: scale,
          scaleY: scale,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        canvas.add(fabricImg);
        canvas.requestRenderAll();

        get().addTextboxAt(x + 550, y, 36, 700, title);

        if (mediaCreationDate) {
          const formattedDate = createdDate
              ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(createdDate))
              : 'No date';
          get().addTextboxAt(x + 550, y + 50, 16, 200, formattedDate);
        }

        if (mediaDescriptions) {
          get().addTextboxAt(x + 550, y + 100, 20, 500, description);
        };
        
        y += scaledHeight + 100;
      }
      
    }
  },


  placingTextbox: false,
  setPlacingTextbox: (val) => set({ placingTextbox: val }),

  selectedObject: null,
  setSelectedObject: (obj) => set({ selectedObject: obj }),

  placingImage: false,
  setPlacingImage: (val) => set({ placingImage: val }),

  imageUrl: '',
  setImageUrl: (url) => set({ imageUrl: url }),

  resetAllSelection: () => {
    get().setPlacingImage(false);
    get().setImageUrl('');
    get().setSelectedObject(null);
    get().setPlacingTextbox(false);
  },

  addTextboxAt: (x, y, size, width, text='New Text') => {
    const canvas = get().canvas;
    const textbox = new Textbox(text, {
      left: x,
      top: y,
      width: width,
      fontSize: size,
    });
    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.requestRenderAll();

    canvas.requestRenderAll();
    set({ placingTextbox: false, selectedObject: textbox });
  },

  addImageAt: (url, x, y) => {
    const canvas = get().canvas;
  
    const image = new Image();
    image.src = url;
  
    image.onload = () => {
      const maxWidth = 500;
      const maxHeight = 400;
  
      let { width, height } = image;
  
      // scale proportionally if needed
      const widthRatio = maxWidth / width;
      const heightRatio = maxHeight / height;
      const scale = Math.min(1, widthRatio, heightRatio);
  
      const fabricImg = new FabricImage(image, {
        left: x,
        top: y,
        scaleX: scale,
        scaleY: scale,
        selectable: true,
        hasControls: true,
        hasBorders: true,
      });
  
      canvas.add(fabricImg);
      canvas.setActiveObject(fabricImg);
      canvas.requestRenderAll();
  
      set({ placingImage: false, selectedObject: fabricImg, imageUrl: '' });
    };
  },  

  deleteSelected: () => {
    const canvas = get().canvas;
    const active = canvas.getActiveObject();
    if (active) {
      canvas.remove(active);
      canvas.requestRenderAll();
    }
  },  
}));
