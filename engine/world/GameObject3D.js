import Colleague from "../communication/Colleague.js"
import * as THREE from 'three';
import { Ammo } from 'ammojs3/dist/ammo.js'
import ObjInteractionMsg from '../communication/message/ObjInteractMsg.js'

/**
 * @class GameObject3D
 * @extends {Colleague}
 * 
 */

export default class GameObject3D extends Colleague {

  rep3d;
  #body;
  #transform;

  // Constructor for game Object3D
  // Setups the dimensions and whatnot for the intended objects.

  /**
   * Constructor for the GameObject3D
   * @param {Array} pos
   * @param {Array} rot Rotation of the object
   * @param {integer} mass
   * @param {THREE.BufferGeometry} geometry
   * @param {boole}
   * @param {boolean} recvShadow
   */
  constructor(
    [posX = 0, posY = 0, posZ = 0],
    [rotX = 0, rotY = 0, rotZ = 0],
    mass = 0,
    geometry = null,
    material = new THREE.MeshStandardMaterial({ color: 0xff0000 }),
    castShadow = true,
    recvShadow = true,
  ) {

    super();
  
    let rotation = new THREE.Euler(rotX, rotY, rotZ);
    let rotation_quaternion = new THREE.Quaternion();
    rotation_quaternion.setFromEuler(rotation);
  
    // Create the THREE.Mesh using the given geometry and material
    this.rep3d = new THREE.Mesh(geometry, material);
    let translation = new THREE.Vector3(posX, posY, posZ);
    let translationDistance = translation.length();
    let translationDirection = translation.normalize();
    this.rep3d.translateOnAxis(translationDirection, translationDistance);
    this.rep3d.castShadow = castShadow;
    this.rep3d.receiveShadow = recvShadow;
  
    // Initialize Physics Representation
    console.log(Ammo.toString());
    this.#transform = new Ammo.btTransform();
    this.#transform.setIdentity();
    this.#transform.setOrigin(new Ammo.btVector3(posX, posY, posZ));
    this.#transform.setRotation(new Ammo.btQuaternion(
      rotation_quaternion.x,
      rotation_quaternion.y,
      rotation_quaternion.z,
      rotation_quaternion.w));
    let defaultMotionState = new Ammo.btDefaultMotionState(this.#transform);
  
    // Create an Ammo shape based on the given geometry
    let structColShape = this.createAmmoShape(geometry);
    let localInertia = new Ammo.btVector3(0, 0, 0);
  
    let RBody_Info = new Ammo.btRigidBodyConstructionInfo(mass, defaultMotionState, structColShape, localInertia);
    this.#body = new Ammo.btRigidBody(RBody_Info);
  
    this.rep3d.userData.physicsBody = this.#body;
  }

  action(message) {
    if (message instanceof ObjInteractionMsg) {
      this.#interaction();
    }
  }

  #interaction() {
      if (this.constructor == InventoryObj) {
        throw new Error("Interaction not implemented for base class.");
    }
  }

  /**
   * 
   * @param {THREE.BufferGeometry} geometry 
   * @returns 
   */
  createAmmoShape(geometry) {
    const shape = new Ammo.btConvexHullShape();
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const vertex = new Ammo.btVector3(vertices[i], vertices[i + 1], vertices[i + 2]);
      shape.addPoint(vertex, true);
    }
    return shape;
  }
  
  /**
   * setProperties for the material the created objects should have. Right now it makes the material red.
   * @param {THREE.Material} material
   */
  setMaterialProperties(material) {
    this.rep3d.material = material;
  }

  /**
   * 
   * @returns {THREE.Object3D} The 3D representation of the gameobject
   */
  getObject3d() {
    return this.rep3d;
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
      this.rep3d.position.set(newPos.x(), newPos.y(), newPos.z());
      this.rep3d.quaternion.set(
        newRotationQuaternion.x(),
        newRotationQuaternion.y(),
        newRotationQuaternion.z(),
        newRotationQuaternion.w()
      );
    }
  }
}