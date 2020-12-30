import VirCanvas from "./lib/vir_canvas";

if (typeof window !== 'undefined') {
    window.VirCanvas = VirCanvas;
}

export default VirCanvas;