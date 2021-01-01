import Canvas from "./lib/canvas";
import {Line} from "./lib/shapes";

if (typeof window !== 'undefined') {
    var virCanvas = {
        create: Canvas,
        Line: Line
    };

    window.VirCanvas = virCanvas;
}

export {
    Canvas as Default,
    Line
};