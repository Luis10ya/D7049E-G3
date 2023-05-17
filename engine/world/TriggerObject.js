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
        pos,
        rot,
        mass,
        geometry,
        material,
        castShadow,
        recvShadow
      ) { 
        super(pos, rot, mass, geometry, material, castShadow, recvShadow); 
        this.action;
    
    }

    onTrigger(){
        throw new Error("Method 'onTrigger()' must be implemented.");
    }

    setAction(action){
        this.action = action;
    }



}