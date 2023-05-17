import Colleague from "../communication/Colleague.js"
import * as THREE from 'three';
import * as Ammo from 'ammo.js'
import ObjInteractionMsg from '../communication/message/ObjInteractMsg.js'
import GameObject3D from "./GameObject3D.js";

/**
 * @class TriggerObject
 * @extends {GameObject3D}
 * 
 */

export default class TriggerObject extends GameObject3D {
    constructor(
        [posX = 0, posY = 0, posZ = 0],
        [rotX = 0, rotY = 0, rotZ = 0],
        mass = 0,
        geometry = new THREE.BoxGeometry(5, 5, 5),
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        castShadow = true,
        recvShadow = true
    )/*(
        pos,
        rot,
        mass,
        geometry,
        material,
        castShadow,
        recvShadow
      )*/ { 
        super([posX, posY, posZ], [rotX, rotY, rotZ], mass, geometry, material, castShadow, recvShadow); 
        this.action;
    
    }

    onTrigger(){
        throw new Error("Method 'onTrigger()' must be implemented.");
    }

    setAction(action){
        this.action = action;
    }



}