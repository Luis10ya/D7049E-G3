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

    getRenderableInventoryElement() {
        var inventory = new Element(
            //TODO
        );
        return Element;
    }

    getMass() {
        return this.#mass;
    }
}