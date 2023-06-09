import * as THREE from 'three';
import GameWorld from '../engine/world/GameWorld.js';
import Room from '../engine/world/Room.js';
import GameObject3D from '../engine/world/GameObject3D.js';
import Exit from '../engine/world/Exit.js';
import { Player } from '../engine/player/Player.js';

export class GameInit {

    #gameWorld
    #entryRoomDimensions
    #zeroGravityRoomDimensions
    #spaceRoomDimensions
    #motionRoomDimensions
    #cubeRoomDimensions
    #sphereRoomDimensions
    #mysteryRoomDimensions
    #finalRoomDimensions

    constructor(gameWorld){
        this.#gameWorld = gameWorld;

        // width, depth, height
        this.#entryRoomDimensions = [75, 100, 10];
        this.#zeroGravityRoomDimensions = [100, 100, 100];
        this.#spaceRoomDimensions = [50, 50, 30];
        this.#motionRoomDimensions = [75, 25, 25];
        this.#cubeRoomDimensions = [150, 150, 150];
        this.#sphereRoomDimensions = [50, 25, 50];
        this.#mysteryRoomDimensions = [50, 25, 10];
        this.#finalRoomDimensions = [10, 10, 10];
    }

    buildRooms(){
        let room = this.#buildEntryRoom()
        this.#gameWorld.addRoom(room);
        this.#gameWorld.addRoom(this.#buildZeroGravityRoom());
        this.#gameWorld.addRoom(this.#buildSpaceRoom());
        this.#gameWorld.addRoom(this.#buildMotionRoom());
        this.#gameWorld.addRoom(this.#buildCubeRoom());
        this.#gameWorld.addRoom(this.#buildSphereRoom());
        this.#gameWorld.addRoom(this.#buildMysteryRoom());
        this.#gameWorld.addRoom(this.#buildFinalRoom());
        this.#connectRooms();

        
    }

    #createRoomStructure( dimenstions, groundMaterial, wallMaterial, ceilingMaterial, room) {
        var groundAndCeilingGeometry = new THREE.BoxGeometry(dimenstions[0], 1, dimenstions[1]);
        let widthWall = new THREE.BoxGeometry(dimenstions[0], dimenstions[2], 0.5);
        let depthWall = new THREE.BoxGeometry(0.5, dimenstions[2], dimenstions[1]);
        let ground = new GameObject3D([0,-0.5,0], [0,0,0], 0, groundAndCeilingGeometry, groundMaterial, false, true);
        let ceiling = new GameObject3D([0,dimenstions[2]+0.5,0], [0,0,0], 0, groundAndCeilingGeometry, ceilingMaterial, false, true);
        let southWall = new GameObject3D([0,dimenstions[2]/2,-(dimenstions[1]/2)-0.25], [0,0,0], 0, widthWall, wallMaterial, false, true);
        let northWall = new GameObject3D([0,dimenstions[2]/2,(dimenstions[1]/2)+0.25], [0,0,0], 0, widthWall, wallMaterial, false, true);
        let westWall = new GameObject3D([-(dimenstions[0]/2)-0.25,dimenstions[2]/2,0], [0,0,0], 0, depthWall, wallMaterial, false, true);
        let eastWall = new GameObject3D([(dimenstions[0]/2)+0.25,dimenstions[2]/2,0], [0,0,0], 0, depthWall, wallMaterial, false, true);
        room.createGround(ground);
        room.addObject3D(ceiling, southWall, northWall, westWall, eastWall);
    }

    #createBox(pos, rot, mass, width, height, depth, material, castShadow, recvShadow, room) {
        var boxGeometry = new THREE.BoxGeometry(width, height, depth);
        let box = new GameObject3D(pos, rot, mass, boxGeometry, material, castShadow, recvShadow);
        room.addObject3D(box);
    }

    #createExit(pos, rot, width, height, depth, castShadow, recvShadow, image, currRoom, newRoom, playerPos){
        let exitTexture = new THREE.TextureLoader().load(image);
        let exitMaterial =  new THREE.MeshStandardMaterial({map: exitTexture});
        //let exitObject = this.#getExit(pos, rot, width, height, depth, exitMaterial, castShadow, recvShadow);
        let exitGeometry = new THREE.BoxGeometry(width, height, depth)
        let exit = new Exit(pos, rot, 10, exitGeometry, exitMaterial, castShadow, recvShadow, newRoom, playerPos);
        // let action = currRoom.getPhysicsWorld().contactPairTest(
        //     this.#gameWorld.getPlayer(),
        //     exit,
        //     function(collisionData) {
        //       this.changeRoom(currRoom, newRoom);
        //     }.bind(this)
        //   );
        // exit.setAction(action);
        currRoom.addExit(exit);
    }

    // Absolutely scuffed
    /*changeRoom(currRoom, newRoom){
        this.#gameWorld.setCurrentRoom(newRoom);
        let rooms = this.#gameWorld.getRooms();
        if(currRoom ===  rooms[0] && newRoom === rooms[5]){
            this.#gameWorld.getPlayer().setPosition(this.#sphereRoomDimensions[0]/2,0, -(this.#sphereRoomDimensions[1]/2)+1.5);
        }else if(currRoom ===  rooms[5] && newRoom === rooms[0]) {
            this.#gameWorld.getPlayer().setPosition(this.#entryRoomDimensions[0]/2,0, (this.#entryRoomDimensions[1]/2)-1.5);
        }else if(currRoom ===  rooms[5] && newRoom === rooms[6]) {
            this.#gameWorld.getPlayer().setPosition((this.#mysteryRoomDimensions[0]/2)-1.5,0, this.#mysteryRoomDimensions[1]/2);
        }else if(currRoom ===  rooms[5] && newRoom === rooms[1]) {
            this.#gameWorld.getPlayer().setPosition(-(this.#zeroGravityRoomDimensions[0]/2)+1.5,0, this.#zeroGravityRoomDimensions[1]/2);
        }else if(currRoom ===  rooms[6] && newRoom === rooms[0]) {
            this.#gameWorld.getPlayer().setPosition(-(this.#entryRoomDimensions[0]/2)+1.5,0, this.#entryRoomDimensions[1]/2);
        }else if(currRoom ===  rooms[1] && newRoom === rooms[5]) {
            this.#gameWorld.getPlayer().setPosition(-(this.#sphereRoomDimensions[0]/2)+1.5,0, this.#sphereRoomDimensions[1]/2);
        }else if(currRoom ===  rooms[1] && newRoom === rooms[3]) {
            this.#gameWorld.getPlayer().setPosition(this.#motionRoomDimensions[0]/2,0, (this.#motionRoomDimensions[1]/2)-1.5);
        }else if(currRoom ===  rooms[1] && newRoom === rooms[2]) {
            this.#gameWorld.getPlayer().setPosition(this.#spaceRoomDimensions[0]/2,0, -(this.#spaceRoomDimensions[1]/2)+1.5);
        }else if(currRoom ===  rooms[3] && newRoom === rooms[0]) {
            this.#gameWorld.getPlayer().setPosition((this.#entryRoomDimensions[0]/2)-1.5,0, this.#entryRoomDimensions[1]/2);
        }else if(currRoom ===  rooms[3] && newRoom === rooms[2]) {
            this.#gameWorld.getPlayer().setPosition(-(this.#spaceRoomDimensions[0]/2)+1.5,0, this.#spaceRoomDimensions[1]/2);
        }else if(currRoom ===  rooms[3] && newRoom === rooms[1]) {
            this.#gameWorld.getPlayer().setPosition(this.#zeroGravityRoomDimensions[0]/2,0, (this.#zeroGravityRoomDimensions[1]/2)-1.5);
        }else if(currRoom ===  rooms[2] && newRoom === rooms[3]) {
            this.#gameWorld.getPlayer().setPosition((this.#motionRoomDimensions[0]/2)-1.5,0, this.#motionRoomDimensions[1]/2);
        }else if(currRoom ===  rooms[2] && newRoom === rooms[1]) {
            this.#gameWorld.getPlayer().setPosition((this.#zeroGravityRoomDimensions[0]/2)-1.5,0, this.#zeroGravityRoomDimensions[1]/2);
        }else if(currRoom ===  rooms[2] && newRoom === rooms[4]) {
            this.#gameWorld.getPlayer().setPosition(this.#cubeRoomDimensions[0]/2,0, -(this.#cubeRoomDimensions[1]/2)+1.5);
        }else if(currRoom ===  rooms[4] && newRoom === rooms[2]) {
            this.#gameWorld.getPlayer().setPosition(this.#spaceRoomDimensions[0]/2,0, (this.#spaceRoomDimensions[1]/2)-1.5);
        }else if(currRoom ===  rooms[4] && newRoom === rooms[7]) {
            this.#gameWorld.getPlayer().setPosition(this.#finalRoomDimensions[0]/2,0, -(this.#finalRoomDimensions[1]/2)+1.5);
        }else if(currRoom ===  rooms[7] && newRoom === rooms[4]) {
            this.#gameWorld.getPlayer().setPosition(this.#cubeRoomDimensions[0]/2,0, (this.#cubeRoomDimensions[1]/2)-1.5);
        }else if(currRoom ===  rooms[7] && newRoom === rooms[0]) {
            this.#gameWorld.getPlayer().setPosition(this.#entryRoomDimensions[0]/2,0, -(this.#entryRoomDimensions[1]/2)+1.5);
        }
    }*/

    #getExit(pos, rot, width, height, depth, material, castShadow, recvShadow) {
        var exitGeometry = new THREE.BoxGeometry(width, height, depth);
        let exit = new GameObject3D(pos, rot, 0, exitGeometry, material, castShadow, recvShadow);
        return exit;
    }

    #createSphere(pos, rot, mass, radius, widthSegments, heightSegments, material, castShadow, recvShadow, room) {
        var sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        let sphere = new GameObject3D(pos, rot, mass, sphereGeometry, material, castShadow, recvShadow);
        room.addObject3D(sphere);
    }

    /**
     * 
     * Entry room
     */
    #buildEntryRoom(){
        let room = new Room("Entry room");
        room.setIntensityOfGeneralLight(15);

        const fogColor = 0xf7ebba;
        const fogDensity = 0.03;
        const fog = new THREE.FogExp2(fogColor, fogDensity);
        room.getScene().fog = fog;

        let groundTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/waves-of-sand.png");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/Blue-Sky.jpg");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/desert.jpg");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(this.#entryRoomDimensions, groundMaterial, wallMaterial, ceilingMaterial, room);

        let waterTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/water.jpg");
        let waterMaterial = new THREE.MeshStandardMaterial({map: waterTexture});
        let boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([0,boxCount+0.5,0], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([5,boxCount+0.5,5], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([-5,boxCount+0.5,-5], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([5,boxCount+0.5,-5], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([-5,boxCount+0.5,5], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([10,boxCount+0.5,10], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([-10,boxCount+0.5,-10], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([10,boxCount+0.5,-10], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([-10,boxCount+0.5,10], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([80,boxCount+0.5,80], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([70,boxCount+0.5,80], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([60,boxCount+0.5,80], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([50,boxCount+0.5,80], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([80,boxCount+0.5,70], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([70,boxCount+0.5,60], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([60,boxCount+0.5,50], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([50,boxCount+0.5,50], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
            boxCount++;
        }

        return room;
    }

    /**
     * 
     * "Zero"Gravity room
     */
    #buildZeroGravityRoom(){
        let room = new Room("Zero Gravity room");
        room.setIntensityOfGeneralLight(8);

        const fogColor = 0xffffff;
        const fogDensity = 0.005;
        const fog = new THREE.FogExp2(fogColor, fogDensity);
        room.getScene().fog = fog;

        room.setGravity(0.5);
        let groundTexture = new THREE.TextureLoader().load("./assets/images/zeroGravityRoom/spaceship_floor.jpg");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/zeroGravityRoom/floating-guy.jpg");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/zeroGravityRoom/spaceship-in-space.jpg");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(this.#zeroGravityRoomDimensions, groundMaterial, wallMaterial, ceilingMaterial, room);

        let sphereTexture = new THREE.TextureLoader().load("./assets/images/zeroGravityRoom/sci-fi-eye.jpg");
        let sphereMaterial = new THREE.MeshStandardMaterial({map: sphereTexture});

        let sphereCount = 0;
        while(sphereCount < 25) {
            this.#createSphere([30,sphereCount+1,-20], [0,0,0], 10, 1,32,32, sphereMaterial, true, true, room);
            sphereCount++;
        }

        sphereCount = 0;
        while(sphereCount < 10) {
            this.#createSphere([-10,sphereCount+4,35], [0,0,0], 5, 4,32,32, sphereMaterial, true, true, room);
            sphereCount++;
        }

        return room;
    }

    #buildSpaceRoom(){
        let room = new Room("Space room");
        room.setIntensityOfGeneralLight(4);

        const fogColor = 0x99097c;
        const fogDensity = 0.02;
        const fog = new THREE.FogExp2(fogColor, fogDensity);
        room.getScene().fog = fog;

        room.setGravity(2);
        let groundTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/space-floor.gif");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/space-ceiling.gif");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/space-walls.jpg");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(this.#spaceRoomDimensions, groundMaterial, wallMaterial, ceilingMaterial, room);
        
        let sunTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/sun.jpg");
        let sunMaterial = new THREE.MeshStandardMaterial({map: sunTexture});
        this.#createSphere([0,6,0], [0,0,0], 30, 6,32,32, sunMaterial, false, false, room);

        let earthTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/earth.jpg");
        let earthMaterial = new THREE.MeshStandardMaterial({map: earthTexture});
        this.#createSphere([20,6,0], [0,0,0], 10, 2,32,32, earthMaterial, false, false, room);

        let jupiterTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/jupiter.jpg");
        let jupiterMaterial = new THREE.MeshStandardMaterial({map: jupiterTexture});
        this.#createSphere([0,6,20], [0,0,0], 15, 5,32,32, jupiterMaterial, false, false, room);

        let moonTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/moon.jpg");
        let moonMaterial = new THREE.MeshStandardMaterial({map: moonTexture});
        this.#createSphere([-20,6,0], [0,0,0], 5, 1,32,32, moonMaterial, false, false, room);

        let neptuneTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/neptune.jpg");
        let neptuneMaterial = new THREE.MeshStandardMaterial({map: neptuneTexture});
        this.#createSphere([0,6,-20], [0,0,0], 8, 4,32,32, neptuneMaterial, false, false, room);

        let plutoTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/pluto.jpg");
        let plutoMaterial = new THREE.MeshStandardMaterial({map: plutoTexture});
        this.#createSphere([11,6,11], [0,0,0], 10, 3,32,32, plutoMaterial, false, false, room);

        return room;
    }

    /**
     * 
     * MOTION ROOM!?!?!? :)
     */
    #buildMotionRoom(){
        let room = new Room("Motion room");
        room.setIntensityOfGeneralLight(10);

        const fogColor = 0xffffff;
        const fogDensity = 0.025;
        const fog = new THREE.FogExp2(fogColor, fogDensity);
        room.getScene().fog = fog;

        let groundTexture = new THREE.TextureLoader().load("./assets/images/motionRoom/motionFloor.gif");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/motionRoom/motionCeiling.gif");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/motionRoom/motionWall.gif");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(this.#motionRoomDimensions, groundMaterial, wallMaterial, ceilingMaterial, room);

        let sphereTexture = new THREE.TextureLoader().load("./assets/images/motionRoom/spherePattern.gif");
        let sphereMaterial = new THREE.MeshStandardMaterial({map: sphereTexture});
        this.#createSphere([0,17,0], [0,0,0], 1, 8,32,32, sphereMaterial, true, true, room);

        return room;
    }

    /**
     * 
     * CUBE ROOM
     */
    #buildCubeRoom(){
        let room = new Room("Cube room");
        room.setIntensityOfGeneralLight(10);

        const fogColor = 0xffffff;
        const fogDensity = 0.025;
        const fog = new THREE.FogExp2(fogColor, fogDensity);
        room.getScene().fog = fog;

        let groundTexture = new THREE.TextureLoader().load("./assets/images/cubeRoom/cube.png");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/cubeRoom/cube.png");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/cubeRoom/cube.png");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(this.#cubeRoomDimensions, groundMaterial, wallMaterial, ceilingMaterial, room);

        let metalTexture = new THREE.TextureLoader().load("./assets/images/cubeRoom/brushedMetal.jpg");
        let metalMaterial = new THREE.MeshStandardMaterial({map: metalTexture});

        let boxTowerCount1 = 0;
        while(boxTowerCount1 < 30) {
            this.#createBox([30,2*boxTowerCount1+2,10], [0,0,0], 20, 2,2,2, metalMaterial, true, true, room);
            boxTowerCount1++;
        }

        let boxTowerCount2 = 0;
        while(boxTowerCount2 < 40) {
            this.#createBox([10,4*boxTowerCount2+4,5], [0,0,0], 20, 4,4,4, metalMaterial, true, true, room);
            boxTowerCount2++;
        }

        let boxTowerCount3 = 0;
        while(boxTowerCount3 < 20) {
            this.#createBox([5,boxTowerCount3+1,2.5], [0,0,0], 20, 1,1,1, metalMaterial, true, true, room);
            boxTowerCount3++;
        }

        this.#createBox([1,0.5,1], [0,0,0], 20, 1,1,1, metalMaterial, true, true, room);
        this.#createBox([25,0.5,25], [0,0,0], 20, 1,1,1, metalMaterial, true, true, room);
        this.#createBox([42,0.5,100], [0,0,0], 20, 1,1,1, metalMaterial, true, true, room);
        this.#createBox([30,0.5,30], [0,0,0], 20, 1,1,1, metalMaterial, true, true, room);
        this.#createBox([40,0.5,20], [0,0,0], 20, 1,1,1, metalMaterial, true, true, room);
        this.#createBox([15,0.5,25], [0,0,0], 20, 1,1,1, metalMaterial, true, true, room);

        return room;
    }

    /**
     * 
     * SLIME ROOM/Sphere room
     */
    #buildSphereRoom(){
        let room = new Room("Sphere room");
        room.setIntensityOfGeneralLight(10);

        const fogColor = 0x25ba20;
        const fogDensity = 0.025;
        const fog = new THREE.FogExp2(fogColor, fogDensity);

        room.getScene().fog = fog;

        let groundTexture = new THREE.TextureLoader().load("./assets/images/sphereRoom/slime-floor-ceiling.jpg");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/sphereRoom/slime-floor-ceiling.jpg");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/sphereRoom/slime.gif");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(this.#sphereRoomDimensions, groundMaterial, wallMaterial, ceilingMaterial, room);

        let slimeBallTexture = new THREE.TextureLoader().load("./assets/images/sphereRoom/slime-balls.jpg");
        let slimeBallMaterial = new THREE.MeshStandardMaterial({map: slimeBallTexture});

        let sphereCount1 = 0;
        while(sphereCount1 < 35) {
            this.#createSphere([10,sphereCount1+4,10], [0,0,0], 5, 1.5,32,32, slimeBallMaterial, true, true, room);
            sphereCount1++;
        }

        let sphereCount2 = 0;
        while(sphereCount2 < 35) {
            this.#createSphere([-10,sphereCount2+4,10], [0,0,0], 5, 1.5,32,32, slimeBallMaterial, true, true, room);
            sphereCount2++;
        }

        this.#createSphere([10, 40, -10], [0,0,0], 5, 4,32,32, slimeBallMaterial, true, true, room);

        return room;
    }

    /**
     * 
     * SUPER MYSTERY!
     */
    #buildMysteryRoom(){
        let room = new Room("Mystery room");
        room.setIntensityOfGeneralLight(5);

        const fogColor = 0x1f1e1d;
        const fogDensity = 0.1;
        const fog = new THREE.FogExp2(fogColor, fogDensity);
        room.getScene().fog = fog;

        let groundTexture = new THREE.TextureLoader().load("./assets/images/mysteryRoom/mysteryFloorAndRoof.jpg");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/mysteryRoom/mysteryFloorAndRoof.jpg");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/mysteryRoom/mysteryWall.jpg");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(this.#mysteryRoomDimensions, groundMaterial, wallMaterial, ceilingMaterial, room);

        let chestTexture = new THREE.TextureLoader().load("./assets/images/mysteryRoom/chest.jpg");
        let chestMaterial = new THREE.MeshStandardMaterial({map: chestTexture});

        this.#createBox([15,0.5,5], [0,0,0], 20, 2,1,1, chestMaterial, true, true, room);

        return room;
    }

    #buildFinalRoom(){
        let room = new Room("Final room");
        room.setIntensityOfGeneralLight(8);
        let groundTexture = new THREE.TextureLoader().load("./assets/images/finalRoom/happy-floor.jpg");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/finalRoom/firework.gif");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/finalRoom/you-did-it.gif");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(this.#finalRoomDimensions, groundMaterial, wallMaterial, ceilingMaterial, room);

        let confettiTexture = new THREE.TextureLoader().load("./assets/images/finalRoom/confetti.jpg");
        let confettiMaterial = new THREE.MeshStandardMaterial({map: confettiTexture});

        this.#createBox([0,2,0], [0,0,0], 1, 4,4,4, confettiMaterial, false, false, room);

        return room;
    }

    #connectRooms(){
        let rooms = this.#gameWorld.getRooms();

        var distanceFromExit = 3

        // entryToSphere
        let exit1 = './assets/images/entryRoom/sphereDoor.png';
        let playerPos1 = [this.#sphereRoomDimensions[0]/2,0, -(this.#sphereRoomDimensions[1]/2)+distanceFromExit];
        this.#createExit([0, 2, (this.#entryRoomDimensions[1]/2)-0.25], [0,0,0], 3, 4, 0.5, true, true, exit1, rooms[0], rooms[5], playerPos1);

        // sphereToEntry
        let exit2 = './assets/images/sphereRoom/entryDoor.jpg';
        let playerPos2 = [this.#entryRoomDimensions[0]/2,0, (this.#entryRoomDimensions[1]/2)-distanceFromExit];
        this.#createExit([0, 2, -(this.#sphereRoomDimensions[1]/2)+0.25], [0,0,0], 3, 4, 0.5, true, true, exit2, rooms[5], rooms[0], playerPos2);

        // sphereToMystery
        let exit3 = './assets/images/sphereRoom/mysteryDoor.png';
        let playerPos3 = [(this.#mysteryRoomDimensions[0]/2)-distanceFromExit,0, this.#mysteryRoomDimensions[1]/2];
        this.#createExit([-(this.#sphereRoomDimensions[0]/2)+0.25, 2, 0], [0,0,0], 0.5, 4, 3, true, true, exit3, rooms[5], rooms[6], playerPos3);

        // sphereToZeroGravity
        let exit4 = './assets/images/sphereRoom/zeroGravityDoor.png';
        let playerPos4 = [-(this.#zeroGravityRoomDimensions[0]/2)+distanceFromExit,0, this.#zeroGravityRoomDimensions[1]/2];
        this.#createExit([(this.#sphereRoomDimensions[0]/2)-0.25, 2, 0], [0,0,0], 0.5, 4, 3, true, true, exit4, rooms[5], rooms[1], playerPos4);

        // mysteryToEntry
        let exit5 = './assets/images/mysteryRoom/entryDoor.jpg';
        let playerPos5 = [-(this.#entryRoomDimensions[0]/2)+distanceFromExit,0, this.#entryRoomDimensions[1]/2];
        this.#createExit([(this.#mysteryRoomDimensions[0]/2)-0.25, 2, 0], [0,0,0], 0.5, 4, 3, true, true, exit5, rooms[6], rooms[0], playerPos5);

        // zeroGravityToSphere
        let exit6 = './assets/images/zeroGravityRoom/sphereDoor.png';
        let playerPos6 = [-(this.#sphereRoomDimensions[0]/2)+distanceFromExit,0, this.#sphereRoomDimensions[1]/2];
        this.#createExit([-(this.#zeroGravityRoomDimensions[0]/2)+0.25, 2, 0], [0,0,0], 0.5, 4, 3, true, true, exit6, rooms[1], rooms[5], playerPos6);

        // zeroGravityToMotion
        let exit7 = './assets/images/zeroGravityRoom/motionDoor.gif';
        let playerPos7 = [this.#motionRoomDimensions[0]/2,0, (this.#motionRoomDimensions[1]/2)-distanceFromExit];
        this.#createExit([0, 2, -(this.#zeroGravityRoomDimensions[1]/2)+0.25], [0,0,0], 3, 4, 0.5, true, true, exit7, rooms[1], rooms[3], playerPos7);

        // zeroGravityToSpace
        let exit8 = './assets/images/zeroGravityRoom/spaceDoor.jpg';
        let playerPos8 = [this.#spaceRoomDimensions[0]/2,0, -(this.#spaceRoomDimensions[1]/2)+distanceFromExit];
        this.#createExit([(this.#zeroGravityRoomDimensions[0]/2)-0.25, 2, 0], [0,0,0], 0.5, 4, 3, true, true, exit8, rooms[1], rooms[2], playerPos8);

        // motionToZeroGravity
        let exit9 = './assets/images/motionRoom/zeroGravityDoor.png';
        let playerPos9 = [this.#zeroGravityRoomDimensions[0]/2,0, (this.#zeroGravityRoomDimensions[1]/2)-distanceFromExit];
        this.#createExit([0, 2, (this.#motionRoomDimensions[1]/2)-0.25], [0,0,0], 3, 4, 0.5, true, true, exit9, rooms[3], rooms[1], playerPos9);

        // motionToEntry
        let exit10 = './assets/images/motionRoom/entryDoor.jpg';
        let playerPos10 = [(this.#entryRoomDimensions[0]/2)-distanceFromExit,0, this.#entryRoomDimensions[1]/2];
        this.#createExit([-(this.#motionRoomDimensions[0]/2)+0.25, 2, 0], [0,0,0], 0.5, 4, 3, true, true, exit10, rooms[3], rooms[0], playerPos10);

        // motionToSpace
        let exit11 = './assets/images/motionRoom/spaceDoor.jpg';
        let playerPos11 = [-(this.#spaceRoomDimensions[0]/2)+distanceFromExit,0, this.#spaceRoomDimensions[1]/2];
        this.#createExit([(this.#motionRoomDimensions[0]/2)-0.25, 2, 0], [0,0,0], 0.5, 4, 3, true, true, exit11, rooms[3], rooms[2], playerPos11);

        // spaceToMotion
        let exit12 = './assets/images/spaceRoom/motionDoor.gif';
        let playerPos12 = [(this.#motionRoomDimensions[0]/2)-distanceFromExit,0, this.#motionRoomDimensions[1]/2];
        this.#createExit([-(this.#spaceRoomDimensions[0]/2)+0.25, 2, 0], [0,0,0], 0.5, 4, 3, true, true, exit12, rooms[2], rooms[3], playerPos12);

        // spaceToZeroGravity
        let exit13 = './assets/images/spaceRoom/zeroGravityDoor.png';
        let playerPos13 = [(this.#zeroGravityRoomDimensions[0]/2)-distanceFromExit,0, this.#zeroGravityRoomDimensions[1]/2];
        this.#createExit([0, 2, -(this.#spaceRoomDimensions[1]/2)+0.25], [0,0,0], 3, 4, 0.5, true, true, exit13, rooms[2], rooms[1], playerPos13);

        // spaceToCube
        let exit14 = './assets/images/spaceRoom/cubeDoor.png';
        let playerPos14 = [this.#cubeRoomDimensions[0]/2,0, -(this.#cubeRoomDimensions[1]/2)+distanceFromExit];
        this.#createExit([0, 2, (this.#spaceRoomDimensions[1]/2)-0.25], [0,0,0], 3, 4, 0.5, true, true, exit14, rooms[2], rooms[4], playerPos14);

        // cubeToSpace
        let exit15 = './assets/images/cubeRoom/spaceDoor.jpg';
        let playerPos15 = [this.#spaceRoomDimensions[0]/2,0, (this.#spaceRoomDimensions[1]/2)-distanceFromExit];
        this.#createExit([0, 2, -(this.#cubeRoomDimensions[1]/2)+0.25], [0,0,0], 3, 4, 0.5, true, true, exit15, rooms[4], rooms[2], playerPos15);

        // cubeToFinal
        let exit16 = './assets/images/cubeRoom/victoryDoor.png';
        let playerPos16 = [this.#finalRoomDimensions[0]/2,0, -(this.#finalRoomDimensions[1]/2)+distanceFromExit];
        this.#createExit([0, 2, (this.#cubeRoomDimensions[1]/2)-0.25], [0,0,0], 3, 4, 0.5, true, true, exit16, rooms[4], rooms[7], playerPos16);

        // finalToCube
        let exit17 = './assets/images/finalRoom/cubeDoor.png';
        let playerPos17 = [this.#cubeRoomDimensions[0]/2,0, (this.#cubeRoomDimensions[1]/2)-distanceFromExit];
        this.#createExit([0, 2, -(this.#finalRoomDimensions[1]/2)+0.25], [0,0,0], 3, 4, 0.5, true, true, exit17, rooms[7], rooms[4], playerPos17);

        // finalToEntry
        let exit18 = './assets/images/finalRoom/entryDoor.jpg';
        let playerPos18 = [this.#entryRoomDimensions[0]/2,0, -(this.#entryRoomDimensions[1]/2)+distanceFromExit];
        this.#createExit([0, 2, (this.#finalRoomDimensions[1]/2)-0.25], [0,0,0], 3, 4, 0.5, true, true, exit18, rooms[7], rooms[0], playerPos18);

        //this.#createExit(pos, rot, width, height, depth, true, true, image, currRoom, newRoom);

    }

}