/**
 * @class FullscreenMenu
 * @extends {Overlay}
 * 
 */

require('./Overlay');

import Overlay from './Overlay';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export default class FullscreenMenu extends Overlay{
    constructor(renderTarget) {
        super(renderTarget);
        const exitButton = document.createElement('button');
        exitButton.addEventListener("click",() => this.exitMenu());
        this.addElement(exitButton)
        //Unlock mouse by sending message to the game world or the player
    }

    addElement(element) {
        this.overlayDiv.appendChild(element);
    }

    removeElement(id) {
        const element = document.getElementById(id);
        element.remove();
    }

    getTree() {
        return this.renderTarget.innerHTML;
    }

    exitMenu() {
        this.setVisibility(hidden);
        //Lock mouse by sending message to the game world or the player, notify menu mediator
    }
}