import Overlay from './Overlay';

/** @author: Ted */
/**
 * @class HelpText
 * @extends Overlay
 */
export default class HelpText extends Overlay {

    /**
    * 
    * @param {RGB color} color 
    */
    setFontColor(color) {
        this.fontColor = color;
    }
    
    /**
    * 
    * @param {String} text
    */
    setText(text) {
        this.text = text;
    }

    /**
    * 
    * @param {Number} size
    */
    setFontSize(size) {
        this.fontSize = size;
    }

    /**
    * 
    * @param {String} font
    */
    setFont(font) {
        this.font = font;
    }

}
