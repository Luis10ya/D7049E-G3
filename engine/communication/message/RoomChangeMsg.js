import GameEventMsg from "./GameEventMsg";

/**
 * @class RoomChangeMsg
 * @extends {GameEventMsg}
 * 
 */

// Sends infomation of what is the new room
export default class RoomChangeMsg extends GameEventMsg {

    newCurrentRoom;

    constructor(newCurrentRoom){
        this.newCurrentRoom = newCurrentRoom;
    }
}