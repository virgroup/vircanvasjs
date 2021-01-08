import Canvas from "./lib/canvas";
import {CanvasGradient, Line, Circle, Arc, Rect, Ellipse} from "./lib/shapes";

if (typeof window !== 'undefined') {
    var virCanvas = {
        create: Canvas,
        CanvasGradient,
        Line,
        Circle,
        Arc,
        Rect,
        Ellipse
    };

    window.VirCanvas = virCanvas;
}

export {
    Canvas as Default,
    Line
};