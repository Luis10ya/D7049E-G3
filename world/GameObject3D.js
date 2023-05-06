import { Colleague } from "../communication/Colleague.js"
import * as THREE from 'three';
import { Ammo } from 'ammojs3';

/**
 * @class GameObject3D
 * @extends {Colleague}
 * 
 */

class GameObject3D extends Colleague {

  #rep3d;
  #body;
  #transform;

  // Constructor for game Object3D
  // Setups the dimensions and whatnot for the intended objects.

  /**
   * Constructor for the GameObject3D
   * @param {Array} pos
   * @param {Array} rot
   * @param {integer} mass
   * @param {string} shape //toDo: This is wrong, it should be some sort of object format / link to this. So a string for now. Was: THREE:Shape
   * @param {boolean} castShadow
   * @param {boolean} recvShadow
   */
  constructor(
    [posX = 0, posY = 0, posZ = 0],
    [rotX = 0, rotY = 0, rotZ = 0],
    mass = 0,
    shape = null,
    castShadow = true,
    recvShadow = true,
  ) {
    let rotation = THREE.Euler(rotX, rotY, rotZ);
    let rotation_quaternion = new THREE.Quaternion()
    rotation_quaternion.setFromEuler(rotation)

    //Initialize Graphic Represenation
    this.#rep3d = new THREE.Object3D(); //ToDo: Load the shape from the constructor
    let translation = new THREE.Vector3(posX, posY, posZ);
    let translationistance = translation.length();
    let translationDirection = translation.normalize();
    this.#rep3d.translateOnAxis(translationDirection, translationistance);
    this.#rep3d.castShadow = castShadow;
    this.#rep3d.recvShadow = recvShadow;


    //Initialize Physics Representation
    this.#transform = new Ammo.btTransform();
    this.#transform.setIdentity();
    this.#transform.setOrigin(new Ammo.btVector3(posX, posY, posZ));
    this.#transform.setRotation(new Ammo.btQuaternion(
      rotation_quaternion.x,
      rotation_quaternion.y,
      rotation_quaternion.z,
      rotation_quaternion.w));
    let defaultMotionState = new Ammo.btDefaultMotionState(this.#transform);

    let structColShape = new Ammo.btConvexHullShape(); //Make the shape the same as the Three Mesh
    let localInertia = new Ammo.btVector3(0, 0, 0);

    let RBody_Info = new Ammo.btRigidBodyConstructionInfo(mass, defaultMotionState, structColShape, localInertia);
    this.#body = new Ammo.btRigidBody(RBody_Info);

    this.#rep3d.userData.physicsBody = this.#body;
  }

  /**
   * setProperties for the material the created objects should have. Right now it makes the material red.
   * @param {THREE.Material} material
   */
  setMaterialProperties(material) {
    this.#rep3d.material = material;
  }

  /**
   * 
   * @returns {THREE.Object3D} The 3D representation of the gameobject
   */
  getObject3d() {
    return this.#rep3d;
  }

  /**
   * 
   * @returns {Ammo.btRigidBody} The rigid body for the physics calculation in the game
   */
  getRigidBody() {
    return this.#body;
  }

  /**
   * This method is called to synchronize the visual representation of game objects with their 
   * position calculated by the physics engine.
   */
  updateMotion() {
    let motionState = this.#body.getMotionState();
    if (motionState) {
      motionState.getWorldTransform(this.#transform);
      let newPos = this.#transform.getOrigin();
      let newRotationQuaternion = this.#transform.getRotation();
      this.#rep3d.position.set(newPos.x(), newPos.y(), newPos.z());
      this.#rep3d.quaternion.set(
        newRotationQuaternion.x(),
        newRotationQuaternion.y(),
        newRotationQuaternion.z(),
        newRotationQuaternion.w()
      );
    }
  }
}