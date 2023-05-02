// @author: Ted
import { Colleague } from "../communication/Colleague.js"
import * as THREE from 'three';
import Ammo, * as AMMO from 'ammojs3';

class GameObject3D extends Colleague {
    // Constructor for game Object3D
    // Setups the dimensions and whatnot for the intended objects¨
    // It take the position, rotation and scale in vector4 form, the objects mass, its shape,
    // whether it is able to cast or recieve shadows respectebely and lastly its hitbox, every thing needed for an 3DObject.
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
  
    // As of the creating of this comment, it makes the color of the object red. In theory.
    setMaterialProperties(material) {
        material.color.set(0xff0000);
    }

    // // How I want the material thing to work, however the thing above is more simple to start with
    // setMaterialProperties(material, color, opacity, texture, emission) {
    //     material.color.set(color);
    //     material.opacity.set(opacity);
    //     material.texture.set(texture);
    //     material.emission.set(emission);
    // }
}