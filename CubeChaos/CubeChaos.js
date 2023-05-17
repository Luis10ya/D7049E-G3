import * as THREE from 'three';
import GameWorld from '../engine/world/GameWorld.js';
import { Player } from '../engine/player/Player.js';
import { GameLogic } from './GameLogic.js';
import { GameInit } from './GameInit.js';



export function cubeChaos(){

    let renderTarget = document.createElement('div');
    document.body.appendChild(renderTarget);

    // init gameWorld
    let gameWorld = new GameWorld(renderTarget);

    let gameLogic = new GameLogic(gameWorld, renderTarget);
    let gameInit = new GameInit(gameWorld);

    // init and start game
    gameInit.buildRooms();
    gameLogic.startGameLoop();

}