import { Colleague } from "../communication/Colleague.js"
import * as THREE from 'three';
import Ammo, * as AMMO from 'ammojs3';

/**
 * @class GameObject3D
 * @extends {Colleague}
 * 
 */

class GameObject3D extends Colleague {
    // Constructor for game Object3D
    // Setups the dimensions and whatnot for the intended objects.

    /**
     * Constructor for the GameObject3D
     * @param {THREE.Vector3} pos
     * @param {THREE.Vector3} rot
     * @param {THREE.Vector3} scale
     * @param {integer} mass
     * @param {THREE.shape} shape
     * @param {boolean} castShadow
     * @param {boolean} recvShadow
     * @param {integer} collisionMargin
     */
    constructor(
      [posX = 0, posY = 0, posZ = 0],
      [rotX = 0, rotY = 0, rotZ = 0],
      [scaleX = 1, scaleY = 1, scaleZ = 1],
      mass = 0,
      shape = null,
      castShadow = true,
      recvShadow = true,
      collisionMargin = 0) 
      {
      this.rep3D = THREE.Object3D;
      this.body = AMMO.btRigidbody;
  
      this.position = new THREE.Vector3(posX, posY, posZ);
      this.rotation = new THREE.Euler(rotX, rotY, rotZ);
      this.scale = new THREE.Vector3(scaleX, scaleY, scaleZ);
      this.mass = mass;
      this.shape = shape;
      this.castShadow = castShadow;
      this.recvShadow = recvShadow;
      this.collisionMargin = collisionMargin;
    }
  
    /**
     * setProperties for the material the created objects should have. Right now it makes the material red.
     * @param {THREE.Material} material
     */
    setMaterialProperties(material) {
        material.color.set(0xff0000);
    }

    // // How I want the material thing to work, however the thing above is more simple to start with
    // setMaterialProperties(material, color, opacity, map, emission) {
    //     material.color.set(color);
    //     material.opacity.set(opacity);
    //     material.map.set(map);
    //     material.emission.set(emission);
    // }
}