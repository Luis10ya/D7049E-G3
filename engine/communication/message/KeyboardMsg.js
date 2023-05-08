/**
 * @class KeyboardMsg
 * @extends {Message}
 * 
 */

// Message containing the key code
class KeyboardMsg extends Message {

    keyCode;

    constructor(keyCode){
        this.keyCode = keyCode;
    }
}