import { create } from 'zustand';
import { FabricImage, Textbox } from 'fabric';

export const useCanvasStore = create((set, get) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),

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
  

  addTextboxAt: (x, y) => {
    const canvas = get().canvas;
    const textbox = new Textbox('New Text', {
      left: x,
      top: y,
      width: 200,
      fontSize: 20,
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
