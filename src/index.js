import Canvas from "./lib/canvas";

if (typeof window !== 'undefined') {
    var virCanvas = {
        create: Canvas
    };

    window.VirCanvas = virCanvas;
}

export default Canvas;