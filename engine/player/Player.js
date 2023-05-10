//@author: Luis
import * as THREE from 'three';
import Inventory from './Inventory.js';
import GameObject3D from '../world/GameObject3D.js';
import MovementMsg from '../communication/message/MovementMsg.js';
import InventoryMsg from '../communication/message/InventoryMsg.js';
import InventoryOverlay from '../overlays/InventoryOverlay.js';
import PlayerMediator from '../communication/mediator/PlayerMediator.js';
import * as Ammo from 'ammo.js';

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
    #movementForward = 0;
    #movementBackward = 0;
    #movementRight = 0;
    #movementLeft = 0;
    constructor(mass, velocity, velocityTurbo, jumpAcceleration, eyeHeight, renderTarget) {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
        super([0,eyeHeight,0], [0,0,0], mass, geometry);

        let width = window.screen.width;
        let height = window.screen.height;

        this.rep3d = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
        this.rep3d.matrix.makeRotationFromEuler([0,0,0]);
        this.rep3d.matrix.setPosition((0,0,0));
        this.rep3d.scale.set((1,1,1));
        this.rep3d.matrixAutoUpdate = false;
        this.#inventory = new Inventory();
        //this.#inventoryOverlay = new InventoryOverlay(renderTarget);
        this.#velocity = velocity;
        this.#velocityTurbo = velocityTurbo;
        this.#jumpAcceleration = jumpAcceleration;
        this.#isSprinting = false;
        this.#eyeHeight = eyeHeight;
        this.#playerMass = mass; //Maybe like this?

        PlayerMediator.getInstance().register(this);
    }

    // If the item already exists in the inventory, adds the item.amount quantity to the amount.
    addInventoryItem(item) {
        this.#inventory.addItem(item);
    }

    // Decreases the number of items as specified in the item amount atribute
    #removeInventoryItem(item) {
        return this.#inventory.removeItem(item);
    }

    action(message) {
        if (message instanceof MovementMsg) {
            if (message.keyCode == 14) {
                this.#sprint();
            } else if (message.keyCode == 32) {
                this.#jump();
            } else {
                this.#step(message.keyCode);
            }
        } else if (message instanceof InventoryMsg) {
            if (message.remove) {
                this.#removeInventoryItem(this.item);
            } else {
                this.addInventoryItem(this.item);
            }
        } else return
    }

    #sprint() {
        if (this.#isSprinting) {
            this.#isSprinting = false;
        } else {
            this.#isSprinting = true;
        }
    }

    #step(keyPressed) {
        switch (keyPressed) {
            case "w":
                this.#movementForward = 1; 
                break;
            case "s":
                this.#movementBackward = 1;
                break;
            case "d":
                this.#movementRight = 1;
                break;
            case "a":
                this.#movementLeft = 1;
                break;
        }

        let moveX =  this.#movementRight - this.#movementLeft;
        let moveZ =  this.#movementBackward - this.#movementForward;
        let moveY =  0;

        if (moveX == 0 && moveY == 0 && moveZ == 0) return;

        let movementVelocity = new Ammo.btVector3(moveX, moveY, moveZ);
        if (this.#isSprinting) {
            movementVelocity.op_mul(this.#velocityTurbo);
        } else  {
            movementVelocity.op_mul(this.#velocity);
        }
        
        this.initMovement(movementVelocity);
    }

    #jump() {
        /*this.#jumpVelocity = this.getMass() * this.#jumpAcceleration;
        this.rep3d.translateOnAxis(THREE.Vector3(0,1,0), distance*this.#jumpVelocity); // ?*/
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