import { Player } from '../player/Player';
import Overlay from './Overlay';
import PlayerMediator from "./engine/communication/mediator/PlayerMediator";
import MouseMsg from "./engine/communication/message/MouseMsg";

/**
 * @class FullscreenMenu
 * @extends {Overlay}
 * 
 */
export default class FullscreenMenu extends Overlay{

    #playerMediatorInstance;

    constructor(renderTarget) {
        super(renderTarget);
        const exitButton = document.createElement('button');
        exitButton.addEventListener("click",() => this.exitMenu());
        this.addElement(exitButton)
        //Unlock mouse by sending message to the game world or the player
        const mouseMessage = new MouseMsg(false);
        this.#playerMediatorInstance = PlayerMediator.getInstance();
        this.#playerMediatorInstance.notify(mouseMessage);
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
        const mouseMessage = new MouseMsg(true);
        this.#playerMediatorInstance.notify(mouseMessage);
    }
}