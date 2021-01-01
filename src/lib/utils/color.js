import colorString from "color-string";

/**
 * 
 * @param {String} color
 * @return {String, Boolean}
 * 
 * @description return color if color is valid, else false 
 */
export function isColorString(color){
    color = colorString.get(color);

    return color ? color.value : false;
}