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

    getRenderableInventoryObjectElement() {
        const inventoryObject = document.createElement('div');
        const invObjectImage = document.createElement('img');
        invObjectImage.src = this.image;
        inventoryObject.appendChild(invObjectImage);
        const invObjectName = document.createTextNode(this.name);
        inventoryObject.appendChild(invObjectName);
        return inventoryObject;
    }

    totalMass() {
        return this.mass * this.amount;
    }
}