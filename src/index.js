import Canvas from "./lib/canvas";
import {CanvasGradient, Line, Circle, Arc, Rect, Ellipse, BezierCurve, QuadraticCurve} from "./lib/shapes";

if (typeof window !== 'undefined') {
    var virCanvas = {
        create: Canvas,
        CanvasGradient,
        Line,
        Circle,
        Arc,
        Rect,
        Ellipse,
        BezierCurve,
        QuadraticCurve
    };

    window.VirCanvas = virCanvas;
}

export {
    Canvas as Default,
    Line
};