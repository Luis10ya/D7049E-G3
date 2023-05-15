import * as THREE from 'three';
import GameWorld from '../engine/world/GameWorld.js';
import Room from '../engine/world/Room.js';
import { MediatorInit } from './MediatorInit.js';
import FullscreenMenu from '../engine/overlays/FullscreenMenu.js';
import  Player  from '../engine/player/Player.js';

export class GameInit {

    #gameWorld
    #renderTarget
    #mediatorInit
    #run
    #player

    constructor(gameWorld, renderTarget, player){
        this.#gameWorld = gameWorld;
        this.#renderTarget = renderTarget;
        this.#mediatorInit = new MediatorInit();
        this.#run = false;
        this.#player = player;

        // create overlays and add to renderTarget
        // create fullscreenmenu for the start menu
        let startMenu = new FullscreenMenu(this.#renderTarget);
        startMenu.addElement(document.createTextNode("Cube Chaos"));
        let button = startMenu.getElementsByTagName('button');

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