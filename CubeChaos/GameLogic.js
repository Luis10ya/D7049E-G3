import * as THREE from 'three';
import GameWorld from '../engine/world/GameWorld.js';
import Room from '../engine/world/Room.js';
import { MediatorInit } from './MediatorInit.js';

export class GameInit {

    #gameWorld
    #renderTarget
    #mediatorInit
    #run

    constructor(gameWorld, renderTarget){
        this.#gameWorld = gameWorld;
        this.#renderTarget = renderTarget;
        this.#mediatorInit = new MediatorInit();
        this.#run = false;

        // create overlays and add to renderTarget
    }

    startGameLoop(){
        this.#run = true;
        this.#gameLoop();
    }

    emergencyBreak(){
        this.#run = false;
    }

    #gameLoop(){
        while(run == true){

            // run game
        
        }
    }

}