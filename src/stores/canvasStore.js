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

  setInitialCanvas: async (
    bestWorks,
    headshot, 
    mediaDescriptions, 
    mediaCreationDate, 
    contactInformation, 
    socialLinks,
  ) => {
    let x = 50;
    let y = 50;

    if (!get().canvas) return;
    if (socialLinks) {
      get().getOptionalSocialLinks();
    }
    if (headshot) {
      y = await get().getOptionalHeadshot(x, y)
    }
    y = await get().loadBestWorks(bestWorks, x, y, mediaDescriptions, mediaCreationDate);
    if (contactInformation) {
      await get().getOptionalContactInformation(x, y);
    }
  },

  getOptionalSocialLinks: () => {

    const canvas = get().canvas;

    const icons = [
        { src: '/images/social-icons/instagram-icon.png', name: 'Instagram', hyperlink: 'https://www.instagram.com/claude._.monet/?hl=en' },
        { src: '/images/social-icons/facebook-icon.png', name: 'Facebook', hyperlink: 'https://www.facebook.com/ClaudeMonet9' },
        { src: '/images/social-icons/linkedin-icon.png', name: 'LinkedIn', hyperlink: 'https://www.linkedin.com/in/claude-monet-044371224/' },
    ];

    const iconSize = 30; 
    const iconSpacing = 10; 
    let x = 1300;

    icons.forEach((icon, index) => {
        const img = new Image();
        img.src = process.env.PUBLIC_URL + icon.src;

        img.onload = () => {
            const fabricImg = new FabricImage(img, {
                left: x + index * (iconSize + iconSpacing),
                top: 20,
                scaleX: iconSize / img.width, 
                scaleY: iconSize / img.height,
                selectable: true, 
                hasControls: true,
                hasBorders: true,
                hyperlink: { url: icon.hyperlink },
            });

            canvas.add(fabricImg);
            canvas.requestRenderAll();
        };
    });

    canvas.on('mouse:down', (e) => {
      const target = e.target;
      if (target && target.hyperlink && target.hyperlink.url) {
          window.open(target.hyperlink.url);
      }
    });
  },

  getOptionalHeadshot: (x, y) => {
    return new Promise((resolve) => {
  
      const canvas = get().canvas;
      const headshotImg = new Image();
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
        canvas.requestRenderAll();

        let centerY = y + (scaledHeight / 2);

        let userName = 'Oscar-Claude Monet';
        get().addTextboxAt(x + 600, centerY - 120, 36, 400, userName);
    
        let userDescription = 'I’m passionate about capturing the way light and color shape how we see the world. My work focuses on creating immersive, dynamic visuals that bring everyday scenes to life. With a strong understanding of atmosphere and movement, I aim to push artistic boundaries and find new ways to blend creativity with technology.';
        get().addTextboxAt(x + 600, centerY - 70, 20, 500, userDescription);
      
        const newY = y + scaledHeight + 100;
        resolve(newY);
      };
    });
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
  
      get().addTextboxAt(x + 550, y, 36, 700, title);
  
      if (mediaCreationDate) {
        const formattedDate = createdDate
          ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(createdDate))
          : 'No date';
        get().addTextboxAt(x + 550, y + 50, 16, 200, formattedDate);
      }
  
      if (mediaDescriptions) {
        get().addTextboxAt(x + 550, y + 100, 20, 500, description);
      }
      get().resetAllSelection()
      canvas.requestRenderAll();
  
      y += scaledHeight + 100;
    }
    return y;
  },  

  getOptionalContactInformation: (x, y) => {
    get().addTextboxAt(x, y, 30, 500, 'Contact');

    const contactInfo = "Email: monet@gmain.com \nPhone: +1 (123) 456-7890";

    get().addTextboxAt(x, y + 40, 20, 500, contactInfo);
  },

  placingTextbox: false,
  setPlacingTextbox: (val) => set({ placingTextbox: val }),

  selectedObject: null,
  setSelectedObject: (obj) => set({ selectedObject: obj }),

  placingImage: false,
  setPlacingImage: (val) => set({ placingImage: val }),

  imageUrl: '',
  setImageUrl: (url) => set({ imageUrl: url }),

  canvasRenderAll: () => {
    get().canvas?.requestRenderAll();
  },

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

  setCanvas: (canvas) => {
    canvas.on('selection:cleared', () => {
      set({ selectedObject: null });
    });
    canvas.on('selection:created', (e) => {
      set({ selectedObject: e.selected[0] || null });
    });
    canvas.on('selection:updated', (e) => {
      set({ selectedObject: e.selected[0] || null });
    });
    set({ canvas });
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

  applyViewModeToCanvas: (viewMode) => {
    const canvas = get().canvas;
    if (!canvas) return;
  
    const wrapper = document.querySelector('.canvas-wrapper');
    if (!wrapper) return;
  
    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;
  
    if (viewMode) {
      const scaleFactor = width / canvas.getWidth();
      canvas.setZoom(scaleFactor);
      canvas.setWidth(width);
      canvas.setHeight(Math.max(canvas.getHeight(), height));
    } else {
      canvas.setZoom(1);
      canvas.setWidth(width);
    }
  
    canvas.selection = !viewMode;
    canvas.skipTargetFind = viewMode;
  
    canvas.forEachObject((obj) => {
      obj.selectable = !viewMode;
      obj.evented = !viewMode;
    });
  
    canvas.discardActiveObject();
    canvas.renderAll();
  }
  
  
}));
