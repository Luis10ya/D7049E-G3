import * as THREE from 'three';
import GameWorld from '../engine/world/GameWorld.js';
import Room from '../engine/world/Room.js';

export class GameInit {

    #gameWorld

    constructor(gameWorld){
        this.#gameWorld = gameWorld;

    }

    buildRooms(){
        this.#gameWorld.addRoom(this.#buildEntryRoom);
        this.#gameWorld.addRoom(this.#buildZeroGravityRoom);
        this.#gameWorld.addRoom(this.#buildSpaceRoom);
        this.#gameWorld.addRoom(this.#buildMotionRoom);
        this.#gameWorld.addRoom(this.#buildCubeRoom);
        this.#gameWorld.addRoom(this.#buildSphereRoom);
        this.#gameWorld.addRoom(this.#buildMysteryRoom);
        this.#gameWorld.addRoom(this.#buildFinalRoom);
        this.#connectRooms();
    }

    #buildEntryRoom(){
        let room = new Room("Entry room");
        // fill room here
        return room;
    }

    #buildZeroGravityRoom(){
        let room = new Room("Zero Gravity room");
        // fill room here
        return room;
    }

    #buildSpaceRoom(){
        let room = new Room("Space room");
        // fill room here
        return room;
    }

    #buildMotionRoom(){
        let room = new Room("Motion room");
        // fill room here
        return room;
    }

    #buildCubeRoom(){
        let room = new Room("Cube room");
        // fill room here
        return room;
    }

    #buildSphereRoom(){
        let room = new Room("Sphere room");
        // fill room here
        return room;
    }

    #buildMysteryRoom(){
        let room = new Room("Mystery room");
        // fill room here
        return room;
    }

    #buildFinalRoom(){
        let room = new Room("Final room");
        // fill room here
        return room;
    }

    #connectRooms(){
        // create exit objects and add them to the rooms
    }

}