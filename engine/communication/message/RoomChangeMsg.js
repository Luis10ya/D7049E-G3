import GameEventMsg from "./GameEventMsg";

/**
 * @class RoomChangeMsg
 * @extends {GameEventMsg}
 * 
 */

// Sends infomation of what is the new room
export default class RoomChangeMsg extends GameEventMsg {

    newCurrentRoom;

    constructor(newCurrentRoom, playerX = 0, playerY = 0, playerZ = 0){
        super();
        this.newCurrentRoom = newCurrentRoom;
        this.playerX = playerX;
        this.playerY = playerY;
        this.playerZ = playerZ;
    }
}