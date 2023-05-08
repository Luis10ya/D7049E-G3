/**
 * @class MenuMsg
 * @extends {Message}
 * 
 */

// contains visibility information regarding the menu
// Toogle the menu on and off
class MenuMsg extends Message {

    hide = true;

    constructor(hide){
        this.hide=hide;
    }
}