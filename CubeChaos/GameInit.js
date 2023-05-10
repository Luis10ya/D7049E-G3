import * as THREE from 'three';
import GameWorld from '../../engine/world/GameWorld.js';
import Room from '../../engine/world/Room.js';
import GameObject3D from '../engine/world/GameObject3D.js';

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

    #createBox(pos, rot, mass, width, height, depth, material, castShadow, recvShadow, room) {
        var boxGeometry = new THREE.BoxGeometry(width, height, depth);
        let box = new GameObject3D(pos, rot, mass, boxGeometry, material, castShadow, recvShadow);
        room.addObject3D(box);
    }

    #buildEntryRoom(){
        let room = new Room("Entry room");
        let groundTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/waves-of-sand.png");
        let groundMaterial = new THREE.MeshDepthMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/Blue-Sky.jpg");
        let ceilingMaterial = new THREE.MeshDepthMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/desert.jpg");
        let wallMaterial = new THREE.MeshDepthMaterial({map: wallTexture});

        this.#createRoomStructure(75, 100, 10, groundMaterial, wallMaterial, ceilingMaterial, room);
        let boxCount = 0;
        let waterTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/water.jpg");
        let waterMaterial = new THREE.MeshDepthMaterial({map: waterTexture});
        while(boxCount < 5) {
            this.#createBox([0,boxCount+0.5,0], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
        }

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