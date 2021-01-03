import Canvas from "./lib/canvas";
import {CanvasGradient, Line, Circle, Arc} from "./lib/shapes";

if (typeof window !== 'undefined') {
    var virCanvas = {
        create: Canvas,
        CanvasGradient,
        Line,
        Circle,
        Arc,
    };

    window.VirCanvas = virCanvas;
}

export {
    Canvas as Default,
    Line
};