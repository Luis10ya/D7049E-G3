//@author Malte

require('./Room')
require('./GameObject3D')


/**
 * Exits manage the exit from a room
 */
export default class Exit {
    /**
     * @param {Room} room 
     * @param {GameObject3D} portal 
     */
    constructor(room, portal) {
        // initialize given arguments
        this.room = room;
        this.portal = portal;

        // initialize with default values
        this.locked = true;
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
}