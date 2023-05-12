import KeyboardMsg from './KeyboardMsg'

/**
 * @class ObjInteractMsg
 * @extends {KeyboardMsg}
 * 
 */

// contain what key is pressed and 
// what is interacted with ???
export default class ObjInteractMsg extends KeyboardMsg {

    //interactedObj;
    
    constructor(keyCode){
        super();
        this.keyCode = keyCode;
        // this.interactedObj = interactedObj ?
    }
}