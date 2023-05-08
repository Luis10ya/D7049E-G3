import Message from "./Message";

/**
 * @class KeyboardMsg
 * @extends {Message}
 * 
 */

// Message containing the key code
export default class KeyboardMsg extends Message {

    keyCode;

    constructor(keyCode){
        this.keyCode = keyCode;
    }
}