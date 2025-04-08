import { create } from 'zustand';
import { Circle, FabricImage, Textbox } from 'fabric';
import { fabric } from 'fabric';

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

    if (headshot) {
      let headshotImg = new Image();
      headshotImg.src = process.env.PUBLIC_URL + '/images/monet-profile.png';
      
      headshotImg.onload = () => {
        const maxWidth = 500;
        const maxHeight = 400;
    
        let { width, height } = headshotImg;
    
        const widthRatio = maxWidth / width;
        const heightRatio = maxHeight / height;
        const scale = Math.min(1, widthRatio, heightRatio);
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
    
        const fabricImg = new FabricImage(headshotImg, {
          left: 250,
          top: y,
          scaleX: scale,
          scaleY: scale,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });

        const circleClipPath = new Circle({
          radius: (Math.min(fabricImg.width, fabricImg.height) / 2 * scale) * 2.5, // Increase radius by 1.5x
          originX: 'center',
          originY: 'center',
          top: -50,
        });

        fabricImg.clipPath = circleClipPath;
        
        canvas.add(fabricImg);
        let centerY = y + (scaledHeight / 2);

        let userName = 'Oscar-Claude Monet';
        get().addTextboxAt(x + 600, centerY - 120, 36, 400, userName);
    
        let userDescription = 'I’m passionate about capturing the way light and color shape how we see the world. My work focuses on creating immersive, dynamic visuals that bring everyday scenes to life. With a strong understanding of atmosphere and movement, I aim to push artistic boundaries and find new ways to blend creativity with technology.';
        get().addTextboxAt(x + 600, centerY - 70, 20, 500, userDescription);
    
        y += scaledHeight + 100;
    
        get().loadBestWorks(bestWorks, x, y, mediaDescriptions, mediaCreationDate);
        canvas.requestRenderAll();
      };
    } else {
      get().loadBestWorks(bestWorks, x, y, mediaDescriptions, mediaCreationDate);
    }    
  },

  loadBestWorks: async (bestWorks, x, y, mediaDescriptions, mediaCreationDate) => {
    const canvas = useCanvasStore.getState().canvas;
    const addTextboxAt = useCanvasStore.getState().addTextboxAt;
  
    const maxWidth = 500;
    const maxHeight = 400;
  
    for (let i = 0; i < bestWorks.length; i++) {
      const { imageUrl, description, createdDate, title } = bestWorks[i];
  
      const image = await new Promise((resolve) => {
        const img = new Image();
        img.src = imageUrl.startsWith('blob:') ? imageUrl : process.env.PUBLIC_URL + imageUrl;
        img.onload = () => resolve(img);
      });
  
      const { width, height } = image;
  
      const widthRatio = maxWidth / width;
      const heightRatio = maxHeight / height;
      const scale = Math.min(1, widthRatio, heightRatio);
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;
  
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
  
      addTextboxAt(x + 550, y, 36, 700, title);
  
      if (mediaCreationDate) {
        const formattedDate = createdDate
          ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(createdDate))
          : 'No date';
        addTextboxAt(x + 550, y + 50, 16, 200, formattedDate);
      }
  
      if (mediaDescriptions) {
        addTextboxAt(x + 550, y + 100, 20, 500, description);
      }
      get().resetAllSelection()
      canvas.requestRenderAll();
  
      y += scaledHeight + 100;
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
