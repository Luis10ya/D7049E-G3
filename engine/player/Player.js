//@author: Luis
import * as THREE from 'three';
import Inventory from './Inventory.js';
import GameObject3D from '../world/GameObject3D.js';

export class Player extends GameObject3D {
    #inventory;
    #velocity;
    #velocityTurbo;
    #jumpVelocity;
    #eyeHeight;
    #playerMass;
    #jumpAcceleration;
    #isSprinting;
    #inventoryOverlay;
    constructor(velocity, velocityTurbo, jumpAcceleration, eyeHeight, renderTarget) {
        this.rep3d = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
        this.rep3d.matrix.setRotationFromEuler((0,0,0));
        this.rep3d.matrix.setPosition((0,0,0));
        this.rep3d.scale.set((1,1,1));
        this.rep3d.matrixAutoUpdate = false;
        this.#inventory = new Inventory();
        this.#inventoryOverlay = new InventoryOverlay(renderTarget);
        this.#velocity = velocity;
        this.#velocityTurbo = velocityTurbo;
        this.#jumpAcceleration = jumpAcceleration;
        this.#isSprinting = false;
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
        // if keybord message == "wasd", "SHIFT", or "SPACE", proceed, else do nothing 
        // get message that alters the FOV, from the menu mediator
        // get message to move (call step/jump)
        // if keyPressed = shift {go to srpint}
        // else if keyPressed = space {go to jump}
        // else {go to step}
    }

    #sprint() {
        if (this.#isSprinting) {
            this.#isSprinting = false;
        } else {
            this.#isSprinting = true;
        }
    }

    #step(keyPressed, distance) {
        vel = 0;
        if (this.#isSprinting) {
            vel = this.#velocityTurbo;
        } else {
            vel = this.#velocity;
        }

        switch (keyPressed) {
            case "w":
                movement.x = 
                this.rep3d.position.x -= Math.sin(this.rep3d.rotation.y) * vel;
                this.rep3d.position.z -= -Math.cos(this.rep3d.rotation.y) * vel;
                break;
            case "s":
                this.rep3d.position.x += Math.sin(this.rep3d.rotation.y) * vel;
                this.rep3d.position.z += -Math.cos(this.rep3d.rotation.y) * vel;
                break;
            case "d":
                this.rep3d.position.x += vel * Math.sin(this.rep3d.rotation.y + Math.PI / 2);
                this.rep3d.position.z += vel * -Math.cos(this.rep3d.rotation.y + Math.PI / 2);
                break;
            case "a":
                this.rep3d.position.x += vel * Math.sin(this.rep3d.rotation.y - Math.PI / 2);
                this.rep3d.position.z += vel * -Math.cos(this.rep3d.rotation.y - Math.PI / 2);
        }        
    }

    #jump() {
        this.#jumpVelocity = this.getMass() * this.#jumpAcceleration;
        this.rep3d.translateOnAxis(THREE.Vector3(0,1,0), distance*this.#jumpVelocity); // ?
    }

    #updateInventoryOverlay() { // Creates a one-row table with the info of the objects of the inventory
        this.#inventoryOverlay.update(this.#inventory.getRenderableInventoryElement());
    }

    getCamera() {
        return this.rep3d;
    }

    getMass() {
        return this.#playerMass + this.#inventory.getMass();
    }

}

//this.initMovement