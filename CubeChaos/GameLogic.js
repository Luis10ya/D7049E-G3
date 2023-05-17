import * as THREE from 'three';
import GameWorld from '../engine/world/GameWorld.js';
import Room from '../engine/world/Room.js';
// import { MediatorInit } from './MediatorInit.js';
import FullscreenMenu from '../engine/overlays/FullscreenMenu.js';
import { Player } from '../engine/player/Player.js';

export class GameLogic {

    #gameWorld
    #renderTarget
    // #mediatorInit
    #player

    constructor(gameWorld, renderTarget, player){
        this.#gameWorld = gameWorld;
        this.#renderTarget = renderTarget;
        // this.#mediatorInit = new MediatorInit();

        this.#player = player;

        this.showStartMenu();

        

    }

    showStartMenu() {
        let startMenu = new FullscreenMenu(this.#renderTarget);
        let buttonContainer = document.createElement('div');

        let button = document.createElement('button');
        button.textContent = 'Start Game';

        button.addEventListener('click', () => {
            this.startGameLoop();
        });

        buttonContainer.appendChild(button);

        startMenu.addElement(buttonContainer);

    }

    startGameLoop(){
        this.#gameLoop();
    }


    #gameLoop(){
        this.#gameWorld.update();
        createListeners();
    }

    

    createListeners () {
        window.addEventListener("keydown", (event)=> {
            const message = new KeyboardMsg(event.key, true);
            const movementMessage = new MovementMsg(event.key, true);
            // this.#mediatorInit.keyboardMediator.notify(message);
            // this.#mediatorInit.playerMediator.notify(movementMessage);
        }, true);
        window.addEventListener("keyup", (event) => {
            const message = new KeyboardMsg(event.key, false);
            const movementMessage = new MovementMsg(event.key, false);
            // this.#mediatorInit.keyboardMediator.notify(message);
            // this.#mediatorInit.playerMediator.notify(movementMessage);
        }, false);
    }

}