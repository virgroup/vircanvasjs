import Canvas from "./lib/canvas";
import {Line, Circle} from "./lib/shapes";

if (typeof window !== 'undefined') {
    var virCanvas = {
        create: Canvas,
        Line: Line,
        Circle: Circle,
    };

    window.VirCanvas = virCanvas;
}

export {
    Canvas as Default,
    Line
};