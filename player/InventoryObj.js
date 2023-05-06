//@author: Luis
import * as THREE from 'three';

export class InventoryObj {
    name;
    amount;
    image;
    mass;
    constructor() {
        if (this.constructor == InventoryObj) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    getRenderableInventoryObjectElement() { // Creates a one-row table with the info of the objects of the inventory
        var inventoryObject = document.createElement('');
        return inventoryObject;
    }

    totalMass() {
        return this.mass * this.amount;
    }
}