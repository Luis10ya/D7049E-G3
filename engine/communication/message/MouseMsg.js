import Message from "./Message";

/**
 * @class MouseMsg
 * @extends {Message}
 * 
 */

// Sends message to the player to lock or unlock the mouse movement
export default class MouseMsg extends Message {
    
    lockMouse;

    constructor(lockMouse){
        this.lockMouse = lockMouse;
    }
}