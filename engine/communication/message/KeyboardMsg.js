import Message from "./Message";

/**
 * @class KeyboardMsg
 * @extends {Message}
 * 
 */

// Message containing the key code
export default class KeyboardMsg extends Message {

    keyCode;
    keyDown;

    constructor(keyCode, keyDown){
        super();
        this.keyCode = keyCode;
        this.keyDown = keyDown;
    }
}