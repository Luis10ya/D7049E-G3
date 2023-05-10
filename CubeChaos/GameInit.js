import * as THREE from 'three';
import GameWorld from '../../engine/world/GameWorld.js';
import Room from '../../engine/world/Room.js';

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

    #createRoomStructure(roomWidth, roomDepth, roomHeight, groundMaterial, wallMaterial, ceilingMaterial, room) {
        var groundAndCeilingGeometry = new THREE.BoxGeometry(roomWidth, 1, roomDepth);
        let widthWall = new THREE.BoxGeometry(roomWidth, roomHeight, 0.5);
        let depthWall = new THREE.BoxGeometry(0.5, roomHeight, roomDepth);
        let ground = new GameObject3D([0,-0.5,0], [0,0,0], 0, groundAndCeilingGeometry, groundMaterial, false, true);
        let ceiling = new GameObject3D([0,roomHeight+0.5,0], [0,0,0], 0, groundAndCeilingGeometry, ceilingMaterial, false, true);
        let southWall = new GameObject3D([0,roomHeight/2,-(roomDepth/2)-0.25], [0,0,0], 0, widthWall, wallMaterial, false, true);
        let northWall = new GameObject3D([0,roomHeight/2,(roomDepth/2)+0.25], [0,0,0], 0, widthWall, wallMaterial, false, true);
        let westWall = new GameObject3D([-(roomWidth/2)-0.25,roomHeight/2,0], [0,0,0], 0, depthWall, wallMaterial, false, true);
        let eastWall = new GameObject3D([(roomWidth/2)+0.25,roomHeight/2,0], [0,0,0], 0, depthWall, wallMaterial, false, true);
        room.createGround(ground);
        room.addObject3D(ceiling, southWall, northWall, westWall, eastWall);
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