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
                castShadow, recvShadow, colissionMargin, velocity, velocityTurbo, jumpAcceleration, eyeHeight) {
        this.#rep3D = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
        this.#rep3D.matrix.setRotationFromEuler(rot);
        this.#rep3D.matrix.setPosition(pos);
        this.#rep3D.scale.set(scale);
        this.#rep3D.matrixAutoUpdate = false;
        this.#inventory = new Inventory();
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
        this.#inventory.removeItem(item);
    }

    action() {
        // TODO
        // if keybord message...
    }

    #step(axis, distance) {
        this.#rep3D.translateOnAxis(axis, distance);
    }

    #jump() {
        // calculate jump velocity with mass and acceleration
        // change position depending on this
        this.#jumpVelocity = this.getMass() * this.#jumpAcceleration;
        // TODO
    }

    getRenderableInventoryElement() {
        return this.#inventory.getRenderableInventoryElement();
    }

    getCamera() {
        return this.#rep3D;
    }

    getMass() {
        return this.#playerMass + this.#inventory.getMass();
    }
}