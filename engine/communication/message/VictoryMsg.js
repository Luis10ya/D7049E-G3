import GameEventMsg from "./GameEventMsg";

/**
 * @class VictoryMsg
 * @extends {GameEventMsg}
 * 
 */

// informs that vincondition has been met
export default class VictoryMsg extends GameEventMsg {

    touchGrass = "You Won!";
    
    constructor(touchGrass){
        super();
        this.touchGrass = touchGrass;
    }
}