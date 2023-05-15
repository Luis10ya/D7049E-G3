//@author Malte

import TriggerObject from "./TriggerObject";

/**
 * Exits manage the exit from a room
 * 
 * @class TriggerObject
 * @extends {TriggerObject}
 * 
 */
export default class Exit extends TriggerObject{
    /**
     * @param {Room} room
     */
    constructor(pos, rot, mass, geometry, material, castShadow, recvShadow, room) {
        super(pos, rot, mass, geometry, material, castShadow, recvShadow);

        // initialize given arguments
        this.room = room;

        // initialize with default values
        this.locked = false;
    }

    /**
     * 
     * @returns {Room} the room to which the Exit leads
     */
    getRoom() {
        return this.room;
    }

    /**
     * 
     * @returns {boolean} current status of the lock
     */
    isLocked() {
        return this.locked;
    }

    /**
     * Unlocks the exit if it is locked and locks it if it is unlocked
     */
    toggleLock() {
        this.locked = !this.locked;
        return this.locked;
    }

    onTrigger(){
        throw new Error("Method 'onTrigger()' must be implemented.");
    }
}