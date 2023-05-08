/**
 * @class VictoryMsg
 * @extends {GameEventMsg}
 * 
 */

// informs that vincondition has been met
class ObjInteractMsg extends GameEventMsg {

    touchGrass = "You Won!";
    
    constructor(touchGrass){
        this.touchGrass = touchGrass;
    }
}