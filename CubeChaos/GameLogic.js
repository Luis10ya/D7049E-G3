import * as THREE from 'three';
import GameWorld from '../engine/world/GameWorld.js';
import Room from '../engine/world/Room.js';
// import { MediatorInit } from './MediatorInit.js';
import FullscreenMenu from '../engine/overlays/FullscreenMenu.js';
import KeyboardMediator from "../engine/communication/mediator/KeyboardMediator";
import PlayerMediator from "../engine/communication/mediator/PlayerMediator";
import { Player } from '../engine/player/Player.js';

export class GameLogic {

    #gameWorld
    #renderTarget

    constructor(gameWorld, renderTarget){
        this.#gameWorld = gameWorld;
        this.#renderTarget = renderTarget;

        // this.showStartMenu();

        

    }

    // showStartMenu() {
    //     let startMenu = new FullscreenMenu(this.#renderTarget);
    //     let buttonContainer = document.createElement('div');

    //     let button = document.createElement('button');
    //     button.textContent = 'Start Game';

    //     button.addEventListener('click', () => {
    //         this.startGameLoop();
    //     });

    //     buttonContainer.appendChild(button);

    //     startMenu.addElement(buttonContainer);

    // }

    startGameLoop(){
        this.#gameLoop();
    }


    #gameLoop(){
        this.#gameWorld.setCurrentRoom("Final room");
        this.#gameWorld.getPlayer().setPosition([50,50,0]);
        this.#gameWorld.animate();
    }

}