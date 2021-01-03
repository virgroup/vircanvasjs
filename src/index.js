import Canvas from "./lib/canvas";
import {Line, Circle, Arc} from "./lib/shapes";

if (typeof window !== 'undefined') {
    var virCanvas = {
        create: Canvas,
        Line: Line,
        Circle: Circle,
        Arc: Arc,
    };

    window.VirCanvas = virCanvas;
}

export {
    Canvas as Default,
    Line
};