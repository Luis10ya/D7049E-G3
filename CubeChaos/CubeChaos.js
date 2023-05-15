import * as THREE from 'three';
import GameWorld from '../engine/world/GameWorld.js';
import  Player  from '../engine/player/Player.js';
import  GameInit  from './GameInit.js';
import  GameLogic  from './GameLogic.js';

export class CubeChaos {

    main(){

        let renderTarget = document.createElement('div');
        document.body.appendChild(renderTarget);

        // init player
        let velocity = 4 // test
        let velocityTurbo = 8 // test
        let jumpAcceleration = 30 // test
        let eyeHeight = 3 // test
        let player = new Player(velocity, velocityTurbo, jumpAcceleration, eyeHeight, renderTarget);

        // init gameWorld
        let gameWorld = new GameWorld(player, renderTarget);

        let gameLogic = new GameLogic(gameWorld, renderTarget, player);
        let gameInit = new GameInit(gameWorld, player);

        // init and start game
        gameInit.buildRooms();
        gameLogic.startGameLoop();

    }

}