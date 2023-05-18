import TriggerObject from "./TriggerObject";
import * as THREE from 'three';
import RoomChangeMsg from "../communication/message/RoomChangeMsg";
import TriggerMediator from "../communication/mediator/TriggerMediator";
import * as Ammo from 'ammo.js';

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
    constructor(
        [posX = 0, posY = 0, posZ = 0],
        [rotX = 0, rotY = 0, rotZ = 0],
        mass = 0,
        geometry = new THREE.BoxGeometry(5, 5, 5),
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        castShadow = true,
        recvShadow = true,
        room,
        [playerX = 0, playerY = 0, playerZ = 0]
    )/*(pos, rot, mass, geometry, material, castShadow, recvShadow, room)*/ {
        super([posX, posY, posZ], [rotX, rotY, rotZ], mass, geometry, material, castShadow, recvShadow);
        this.body.setAngularFactor(new Ammo.btVector3(0, 0, 0));
        
        // initialize given arguments
        this.room = room;

        // initialize with default values
        this.locked = false;
        this.playerX = playerX;
        this.playerY = playerY;
        this.playerZ = playerZ;
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

    updateMotion() {        
        let previousPosition = new THREE.Vector3(
            this.rep3d.position.x,
            this.rep3d.position.y,
            this.rep3d.position.z
        );

        super.updateMotion();

        if (this.rep3d.position.distanceTo(previousPosition) > 0.05) {
            const msg = new RoomChangeMsg(this.room, this.playerX, this.playerY, this.playerZ);
            TriggerMediator.getInstance().notify(msg);
            console.log("Triggered");
        }
    }
}