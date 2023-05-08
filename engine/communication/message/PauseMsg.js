/**
 * @class PauseMsg
 * @extends {KeyboardMsg}
 * 
 */

// contain what key is pressed and 
// if game should pause or not
class PauseMsg extends KeyboardMsg {

    //pause ?
    
    constructor(keyCode){
        this.keyCode = keyCode;
        // this.pause = pause ?
    }
}