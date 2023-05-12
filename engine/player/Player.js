//@author: Luis
import * as THREE from 'three';
import Inventory from './Inventory.js';
import GameObject3D from '../world/GameObject3D.js';
import MovementMsg from '../communication/message/MovementMsg.js';
import InventoryMsg from '../communication/message/InventoryMsg.js';
import MouseMsg from '../communication/message/MouseMsg.js';
import InventoryOverlay from '../overlays/InventoryOverlay.js';
import PlayerMediator from '../communication/mediator/PlayerMediator.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
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
    #controls;
    constructor(mass, velocity, velocityTurbo, jumpAcceleration, eyeHeight, renderTarget) {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
        super([0,eyeHeight,0], [0,0,0], mass, geometry);

        let width = window.screen.width;
        let height = window.screen.height;

        this.rep3d = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
        this.rep3d.matrix.makeRotationFromEuler(new THREE.Euler(0,0,0,'XYZ'));
        this.rep3d.matrix.setPosition(0,eyeHeight,0);
        this.rep3d.scale.set((1,1,1));
        this.rep3d.matrixAutoUpdate = false;
        this.#inventory = new Inventory();
        this.#eyeHeight = eyeHeight;
        //this.#inventoryOverlay = new InventoryOverlay(renderTarget);
        this.#velocity = velocity;
        this.#velocityTurbo = velocityTurbo;
        this.#jumpAcceleration = jumpAcceleration;
        this.#isSprinting = false;
        this.#eyeHeight = eyeHeight;
        this.#playerMass = mass;
        this.#controls = new PointerLockControls(this.rep3d, document.body);

        document.addEventListener("click", ()=> {
            this.#controls.lock();
        });
        //this.lockMouse();

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
                this.#sprint(message.keyDown);
            } /*else if (message.keyCode == 32) {
                this.#jump();
            }*/ else {
                this.#step(message.keyCode, message.keyDown);
            }
        } else if (message instanceof InventoryMsg) {
            if (message.remove) {
                this.#removeInventoryItem(this.item);
            } else {
                this.addInventoryItem(this.item);
            }
        } else if (message instanceof MouseMsg) {
            if (message.lockMouse) {
                this.lockMouse();
            } else {
                this.unlockMouse();
            }
        } else return
    }

    #sprint(keyDown) {
        this.#isSprinting = keyDown;
    }

    #step(keyCode) {
        switch (keyCode) {
            case 119:
            case 87:
                if (keyDown && this.#movementForward == 0) {
                    this.#movementForward = 1;
                } else if (!keyDown && this.#movementForward == 1) {
                    this.#movementForward = 0;
                } else {
                    return;
                }
                break;
            case 115:
            case 83:
                if (keyDown && this.#movementBackward == 0) {
                    this.#movementBackward = 1;
                } else if (!keyDown && this.#movementBackward == 1) {
                    this.#movementBackward = 0;
                } else {
                    return;
                }
                break;
            case 100:
            case 68:
                if (keyDown && this.#movementRight == 0) {
                    this.#movementRight = 1;
                } else if (!keyDown && this.#movementRight == 1) {
                    this.#movementRight = 0;
                } else {
                    return;
                }
                break;
            case 97:
            case 65:
                if (keyDown && this.#movementLeft == 0) {
                    this.#movementLeft = 1;
                } else if (!keyDown && this.#movementLeft == 1) {
                    this.#movementLeft = 0;
                } else {
                    return;
                }
                break;
            /*case 32:
                if (keyDown && this.#movementUp == 0) {
                    this.#movementUp = 1;
                } else if (this.rep3d.velocity == 0) {
                    this.#movementUp = 0;
                }*/
        }

        let moveX =  this.#movementRight - this.#movementLeft;
        let moveZ =  this.#movementBackward - this.#movementForward;
        let moveY =  0; //this.#movementUp;

        if (moveX == 0 && moveY == 0 && moveZ == 0) return;

        let movementVelocity = new Ammo.btVector3(moveX, moveY, moveZ);
        if (this.#isSprinting) {
            movementVelocity.x = movementVelocity.x * this.#velocityTurbo.x;
            movementVelocity.z = movementVelocity.z * this.#velocityTurbo.z;
        } else  {
            movementVelocity.x = movementVelocity.x * this.#velocity.x;
            movementVelocity.z = movementVelocity.z * this.#velocity.z;
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

    getObject3D() {
        return this.#controls.getObject();
    }

    getCamera() {
        return this.rep3d;
    }

    getMass() {
        return this.#playerMass + this.#inventory.getMass();
    }
/* 
    lockMouse() {
        this.#controls.lock();
    }

    unlockMouse() {
        this.#controls.unlock();
    } */

    getControls() {
        return this.#controls;
    }

    setPosition(x,z) {
        this.rep3d.setPosition(x,self.#eyeheight,z);
    }
}

//this.initMovement