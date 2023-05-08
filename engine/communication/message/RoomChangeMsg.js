/**
 * @class RoomChangeMsg
 * @extends {GameEventMsg}
 * 
 */

// Sends infomation of what is the new room
class RoomChangeMsg extends GameEventMsg {

    newCurrentRoom;

    constructor(newCurrentRoom){
        this.newCurrentRoom = newCurrentRoom;
    }
}