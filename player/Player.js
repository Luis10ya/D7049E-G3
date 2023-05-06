//@author: Luis
import * as THREE from 'three';
import {Inventory} from './Inventory.js';

export class Player extends GameObject3D {
    #rep3D;
    #inventory;
    #velocity;
    #velocityTurbo;
    #jumpVelocity;
    #eyeHeight;
    #playerMass;
    #jumpAcceleration;
    constructor(pos=[posX, posY, posZ], rot=[rotX, rotY, rotZ], scale=[scaleX, scaleY, scaleZ], mass, shape,
                castShadow, recvShadow, collisionMargin, velocity, velocityTurbo, jumpAcceleration, eyeHeight, renderTarget) {
        this.#rep3D = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
        this.#rep3D.matrix.setRotationFromEuler(rot);
        this.#rep3D.matrix.setPosition(pos);
        this.#rep3D.scale.set(scale);
        this.#rep3D.matrixAutoUpdate = false;
        this.#inventory = new Inventory();
        this.#inventoryOverlay = new InventoryOverlay(renderTarget);
        this.#velocity = velocity;
        this.#velocityTurbo = velocityTurbo;
        this.#jumpAcceleration = jumpAcceleration;
        this.#eyeHeight = eyeHeight;
        this.#playerMass = rep3D.body.info.m_mass;
    }

    // If the item already exists in the inventory, adds the item.amount quantity to the amount.
    addInventoryItem(item) {
        this.#inventory.addItem(item);
    }

    // Decreases the number of items as specified in the item amount atribute
    #removeInventoryItem(item) {
        return this.#inventory.removeItem(item);
    }

    action() {
        // TODO
        // if keybord message...
        // get message that alters the FOV, from the menu mediator
        // get message to move (call step/jump)
    }

    #step(axis, distance, sprint) {
        if(keys["w"]) { // forward
            player.position.x -= Math.sin(player.rotation.y) * moveSpeed
            player.position.z -= Math.cos(player.rotation.y) * moveSpeed
        }
        if(keys["s"]) { // backward
            player.position.x += Math.sin(player.rotation.y) * moveSpeed
            player.position.z += Math.cos(player.rotation.y) * moveSpeed
        }
        if(keys["d"]) { // right
            player.position.x += moveSpeed * Math.sin(rotation + Math.PI / 2)
            player.position.z += moveSpeed * Math.cos(rotation + Math.PI / 2)
        }
        if(keys["a"]) { // left
            player.position.x += moveSpeed * Math.sin(rotation - Math.PI / 2)
            player.position.z += moveSpeed * Math.cos(rotation - Math.PI / 2)
        }
        if (!sprint) {
            this.#rep3D.translateOnAxis(axis, THREE.Vector3(0,1,0));
        } else {
            this.#rep3D.translateOnAxis(axis, distance+1); // ? 
        }
        
    }

    #jump() {
        this.#jumpVelocity = this.getMass() * this.#jumpAcceleration;
        this.#rep3D.translateOnAxis(THREE.Vector3(0,1,0), distance*this.#jumpVelocity); // ?
    }

    #updateInventoryOverlay() { // Creates a one-row table with the info of the objects of the inventory
        this.#inventoryOverlay(this.#inventory.getRenderableInventoryElement());
    }

    getCamera() {
        return this.#rep3D;
    }

    getMass() {
        return this.#playerMass + this.#inventory.getMass();
    }
}