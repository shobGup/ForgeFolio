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
      const fabricImg = new FabricImage(image, {
        left: x,
        top: y,
        width: 500,
        height: 400,
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
