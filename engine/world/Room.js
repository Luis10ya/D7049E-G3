import Colleague from "../communication/Colleague.js";
import Exit from "./Exit.js";
import GameObject3D from "./GameObject3D.js";
import * as THREE from 'three';
import * as Ammo from 'ammo.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

export default class Room extends Colleague {

    #name;
    #lights;
    #scene;
    #generalLight;
    #exits;
    #hasGround;
    #isVisited;
    #physicsWorld;
    #gameObject3Dlist;

    constructor(name) {
        super();

        this.#name = name;
        this.#lights = [];
        this.#scene = new THREE.Scene();
        this.#generalLight = new THREE.AmbientLight(0x404040);
        this.#exits = [];
        this.#hasGround = false;
        this.#scene.add(this.#generalLight);
        this.#isVisited = false;
        this.#gameObject3Dlist = [];

        //initialize Ammo stuff
        var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        var dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
        var overlappingPairCache = new Ammo.btDbvtBroadphase();
        var solver = new Ammo.btSequentialImpulseConstraintSolver();

        this.#physicsWorld = new Ammo.btDiscreteDynamicsWorld(
            dispatcher, overlappingPairCache, solver, collisionConfiguration);
        this.#physicsWorld.setGravity(new Ammo.btVector3(0,-10,0));
    }

    getName() {
        return this.#name;
    }

    getScene() {
        return this.#scene;
    }

    setColorOfGeneralLight(color) {
        this.#generalLight.color = color;
    }

    setIntensityOfGeneralLight(intensity) {
        this.#generalLight.intensity = intensity;
    }

    /**
     * 
     * @param {TJS Object3D} light 
     */
    addLight(light) {
        let lightExistsInScene = this.#isObjectInScene(light);
        if(!lightExistsInScene){
            this.#lights.push(light);
            this.#scene.add(light);
        }
    }

    /**
     * 
     * @param {TJS Object3D} light 
     * 
     */
    removeLight(light) {
        let posInLights = this.indexOfLight(light);
        if(posInLights == -1){
            return false;
        }
        this.#lights.splice(posInLights, 1);
        this.#scene.remove(light);
        return true; 
    }

    /**
     * 
     * @param {TJS Object3D} light 
     * @returns Index of lightObject in lighths array
     */
    indexOfLight(light) {
        const isLight = (element) => element === light;
        return this.#lights.findIndex(isLight);
    }

    /**
     * 
     * @param {Exit} exit 
     */
    addExit(exit) {
        if(this.indexOfExit(exit) == -1){
            this.#exits.push(exit);
            this.#scene.add(exit.getObject3D());
            this.#physicsWorld.addRigidBody(exit.getRigidBody());
            this.#gameObject3Dlist.push(exit);
        }
    }

    /**
     * 
     * @param {Exit} exit 
     * @returns Index of exitObject in exits array
     */
    indexOfExit(exit) {
        const isExit = (element) => element === exit;
        return this.#exits.findIndex(isExit);
    }

    /**
     * 
     * @param {Exit or integer} exit 
     *
     */
    removeExit(exit) {
        var posInExits = -1;
        if (typeof exit === 'number') {
            posInExits = exit;
            if (posInExits >= this.#exits.length || posInExits < 0) {
                return false;
            }
        } else if (exit === 'Exit') {
            posInExits = this.indexOfExit(exit);
            if(posInExits == -1){
                return false;
            }
        }
        let exitObject = this.#exits[posInExits];
        this.removeObject3D(exitObject);
        let ridigBody = exitObject.getRigidBody();
        this.#exits.splice(posInExits, 1);
        this.#gameObject3Dlist.splice(indexOfGameObject3D(exitObject), 1);
        this.#scene.remove(exitObject.getObject3D());
        this.#physicsWorld.removeRigidBody(ridigBody);
        Ammo.destroy(ridigBody);
        return true;
    }

    /**
     * 
     * @param {GameObject3D} object 
     */
    addObject3D(...objects) {
        for (let i = 0; i < objects.length; i++) {
          let object = objects[i];
          let objectExistsInScene = this.#isObjectInScene(object);
          if (!objectExistsInScene) {
            this.#scene.add(object.getObject3D());
            this.#physicsWorld.addRigidBody(object.getRigidBody());
            this.#gameObject3Dlist.push(object);
          }
        }
      }

    /**
     * 
     * @param {GameObject3D} object 
     * 
     */
    removeObject3D(object) {
        let objectExistsInScene = this.#isObjectInScene(object);
        if(!objectExistsInScene){
            return false;
        }
        this.#scene.remove(object.getObject3D());
        this.#gameObject3Dlist.splice(indexOfGameObject3D(object), 1);
        let ridigBody = object.getRigidBody();
        this.#physicsWorld.removeRigidBody(ridigBody);
        Ammo.destroy(ridigBody);
        return true;
    }

    indexOfGameObject3D(object) {
        const isObject = (element) => element === object;
        return this.#gameObject3Dlist.findIndex(isObject);
    }

    #isObjectInScene(object) {
        let objectExistsInScene = false;
        this.#scene.children.forEach(child => {
            if (child === object) {
                objectExistsInScene = true;
            }
        });
        return objectExistsInScene;
    }

    /**
     * 
     * @param {GameObject3D} groundShape 
     */
    createGround(groundShape) {
        let objectExistsInScene = this.#isObjectInScene(groundShape);
        if(!this.#hasGround && !objectExistsInScene){
            this.#hasGround = true;
            this.#scene.add(groundShape.getObject3D());
            this.#physicsWorld.addRigidBody(groundShape.getRigidBody());
            this.#gameObject3Dlist.push(groundShape);
        }
    }

    /**
     * 
     * @returns array of Room objects
     */
    getNeighbours() {
        let neighbours = [];
        this.#exits.forEach(exit => {
            neighbours.push(exit.getRoom());
        });
        return neighbours;
    }

    /**
     * 
     * @param {TJS Object3D} backgroundObject 
     */
    addBackground(backgroundObject) {
        this.addObject3D(backgroundObject);
    }

    /**
     * 
     * @param {TJS Object3D} backgroundObject 
     * 
     */
    removeBackground(backgroundObject) {
        return this.removeObject3D(backgroundObject);
    }

    isVisited() {
        return this.#isVisited;
    }

    visit() {
        this.#isVisited = true;
    }

    /**
     * 
     * @param {Number} timeDelta 
     */
    updateGameObjects(timeDelta){
        this.#physicsWorld.stepSimulation( timeDelta, 10 );
        this.#gameObject3Dlist.forEach(object => {
            object.updateMotion();
        });
    }

    /**
     * Sets the gravitational constant in the game world (default is 10)
     * @param {Number} gravity 
     */
    setGravity(gravity) {
        this.#physicsWorld.setGravity(new Ammo.btVector3(0, -1*gravity,0));
    }

    getGameObject3DList() {
        return this.#gameObject3Dlist;
    }

    /**
     * 
     * @returns {Ammo.btDiscreteDynamicsWorld}
     */
    getPhysicsWorld(){
        return this.#physicsWorld;
    }

    /**
     * Static method to create a room with static elements in it.
     * @param {string} roomName 
     * @param {string} pathToGLTF 
     */
    static createFromGLTFScene(roomName, pathToGLTF) {
        const loader = new GLTFLoader();
        const room = new Room(roomName);

        loader.load(pathToGLTF, (gltf) => {
            gltf.scene.traverse((node) => {
                if (node.isMesh) {
                    const geometry = node.geometry;
                    const positionArray = node.position.toArray();
                    const rotationArray = node.rotation.toArray();
                    const gameObject = new GameObject3D(positionArray, rotationArray, 0, geometry);
                    room.addObject3D(gameObject);
                }
            });
        });
        //room.setIntensityOfGeneralLight(1);
        return room;
    }

    
}