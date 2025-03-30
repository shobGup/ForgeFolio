import { create } from 'zustand';
import { Textbox } from 'fabric';

export const useCanvasStore = create((set, get) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas }),

  placingTextbox: false,
  setPlacingTextbox: (val) => set({ placingTextbox: val }),

  selectedObject: null,
  setSelectedObject: (obj) => set({ selectedObject: obj }),

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

  deleteSelected: () => {
    const canvas = get().canvas;
    const active = canvas.getActiveObject();
    if (active) {
      canvas.remove(active);
      canvas.requestRenderAll();
    }
  },
}));
