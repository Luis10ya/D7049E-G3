//@author: Luis
import * as THREE from 'three';
import {InventoryObj} from './InventoryObj.js'

export class Inventory {
    #mass = 0;
    #items;

    constructor() {
        this.#items = new Array();
    }

    addItem(newItem) {
        index = this.#items.findIndex((item) => item.constructor.name == newItem.constructor.name)
        if (index == -1) {
            this.#items.push(newItem);
        } else {
            this.#items[index].amount += newItem.amount;
        }
        this.#mass += newItem.totalMass();
    }

    removeItem(oldItem) {
        index = this.#items.findIndex((item) => item.constructor.name == oldItem.constructor.name)
        if (index == -1) {
            return false;
        } else {
            this.#items[index].amount -= newItem.amount;
            this.#mass -= oldItem.totalMass();
            return true;
        }
    }

    getRenderableInventoryElement() { // Creates a one-row table with the info of the objects of the inventory
        var inventory = document.createElement('table');
        var inventoryContent = document.createElement('tbody');
        var row = document.createElement('tr');
        for (const item of this.#items) {
            var cell = document.createElement('td');
            cell.appendChild(document.createElement(item)); // This is probably wrong, should probably convert the item to something before getting it directly into the cell
            row.appendChild(cell);
        }
        inventoryContent.appendChild(row);
        inventory.appendChild(inventoryContent);
        return inventory;
    }

    getMass() {
        return this.#mass;
    }
}