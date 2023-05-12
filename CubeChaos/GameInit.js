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
        let groundTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/waves-of-sand.png");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/Blue-Sky.jpg");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/desert.jpg");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(75, 100, 10, groundMaterial, wallMaterial, ceilingMaterial, room);

        let waterTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/water.jpg");
        let waterMaterial = new THREE.MeshStandardMaterial({map: waterTexture});
        let boxCount = 0;
        while(boxCount < 5) {
            this.#createBox([0,boxCount+0.5,0], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
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
        room.setGravity(0.5);
        let groundTexture = new THREE.TextureLoader().load("./assets/images/zeroGravityRoom/spaceship_floor.jpg");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/zeroGravityRoom/floating-guy.jpg");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/zeroGravityRoom/spaceship-in-space.jpg");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(100, 100, 100, groundMaterial, wallMaterial, ceilingMaterial, room);

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
        room.setGravity(2);
        let groundTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/space_floor.gif");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/space-ceiling.gif");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/spaceRoom/space-walls.jpg");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(50, 50, 30, groundMaterial, wallMaterial, ceilingMaterial, room);
        
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
        let groundTexture = new THREE.TextureLoader().load("./assets/images/motionRoom/motionFloor.gif");
        let groundMaterial = new THREE.MeshDepthMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/motionRoom/motionCeiling.gif");
        let ceilingMaterial = new THREE.MeshDepthMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/motionRoom/motionWall.gif");
        let wallMaterial = new THREE.MeshDepthMaterial({map: wallTexture});

        this.#createRoomStructure(75, 25, 25, groundMaterial, wallMaterial, ceilingMaterial, room);

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
        let groundTexture = new THREE.TextureLoader().load("./assets/images/cubeRoom/cube.png");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/cubeRoom/cube.png");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/cubeRoom/cube.png");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(150, 150, 150, groundMaterial, wallMaterial, ceilingMaterial, room);

        let metalTexture = new THREE.TextureLoader().load("./assets/images/cubeRoom/brushedMetal.jpg");
        let metalMaterial = new THREE.MeshStandardMaterial({map: metalTexture});

        let boxTowerCount1 = 0;
        while(boxTowerCount1 < 30) {
            this.#createBox([30,boxTowerCount1+0.5,10], [0,0,0], 20, 2,2,2, metalMaterial, true, true, room);
            boxTowerCount1++;
        }

        let boxTowerCount2 = 0;
        while(boxTowerCount2 < 40) {
            this.#createBox([10,boxTowerCount2+0.5,5], [0,0,0], 20, 4,4,4, metalMaterial, true, true, room);
            boxTowerCount2++;
        }

        let boxTowerCount3 = 0;
        while(boxTowerCount3 < 20) {
            this.#createBox([5,boxTowerCount3+0.5,2.5], [0,0,0], 20, 1,1,1, metalMaterial, true, true, room);
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
        let groundTexture = new THREE.TextureLoader().load("./assets/images/sphereRoom/slime-floor-ceiling.png");
        let groundMaterial = new THREE.MeshDepthMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/sphereRoom/slime-floor-ceiling.png");
        let ceilingMaterial = new THREE.MeshDepthMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/sphereRoom/slime.gif");
        let wallMaterial = new THREE.MeshDepthMaterial({map: wallTexture});

        this.#createRoomStructure(50, 25, 75, groundMaterial, wallMaterial, ceilingMaterial, room);

        let slimeBallTexture = new THREE.TextureLoader().load("./assets/images/sphereRoom/slime-balls.jpg");
        let slimeBallMaterial = new THREE.MeshDepthMaterial({map: slimeBallTexture});

        let sphereCount1 = 0;
        while(sphereCount1 < 30) {
            this.#createSphere([-10,sphereCount1+4,35], [0,0,0], 5, 4,32,32, slimeBallMaterial, true, true, room);
            sphereCount1++;
        }

        this.#createSphere([10, 4, 25], [0,0,0], 5, 4,32,32, slimeBallMaterial, true, true, room);

        return room;
    }

    #buildMysteryRoom(){
        let room = new Room("Mystery room");
        let groundTexture = new THREE.TextureLoader().load("./assets/images/mysteryRoom/mysteryFloorAndRoof.jpg");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/mysteryRoom/mysteryFloorAndRoof.jpg");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/mysteryRoom/mysteryWall.jpg");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(50, 25, 10, groundMaterial, wallMaterial, ceilingMaterial, room);

        let chestTexture = new THREE.TextureLoader().load("./assets/images/mysteryRoom/mysteryWall.jpg");
        let chestMaterial = new THREE.MeshStandardMaterial({map: chestTexture});

        this.#createBox([15,0.5,5], [0,0,0], 20, 2,1,1, chestMaterial, true, true, room);

        return room;
    }

    #buildFinalRoom(){
        let room = new Room("Final room");
        let groundTexture = new THREE.TextureLoader().load("./assets/images/finalRoom/happy-floor.jpg");
        let groundMaterial = new THREE.MeshStandardMaterial({map: groundTexture});
        let ceilingTexture = new THREE.TextureLoader().load("./assets/images/finalRoom/firework.gif");
        let ceilingMaterial = new THREE.MeshStandardMaterial({map: ceilingTexture});
        let wallTexture = new THREE.TextureLoader().load("./assets/images/finalRoom/you-did-it.gif");
        let wallMaterial = new THREE.MeshStandardMaterial({map: wallTexture});

        this.#createRoomStructure(10, 10, 10, groundMaterial, wallMaterial, ceilingMaterial, room);

        let confettiTexture = new THREE.TextureLoader().load("./assets/images/finalRoom/confetti.jpg");
        let confettiMaterial = new THREE.MeshStandardMaterial({map: confettiTexture});

        this.#createBox([0,2,0], [0,0,0], 1, 4,4,4, confettiMaterial, false, false, room);

        return room;
    }

    #connectRooms(){
        // create exit objects and add them to the rooms
    }

}