import { Player } from "./engine/player/Player";
import GameWorld from "./engine/world/GameWorld";
import Room from "./engine/world/Room";
import KeyboardMediator from "./engine/communication/mediator/KeyboardMediator";
import PlayerMediator from "./engine/communication/mediator/PlayerMediator";
import KeyboardMsg from "./engine/communication/message/KeyboardMsg";
import MovementMsg from "./engine/communication/message/MovementMsg";
import * as THREE from 'three';
import GameObject3D from "./engine/world/GameObject3D";

let parent = document.getElementById("game");
let player = new Player(80,1,3,12,1.7,parent);
//let gameWorld = new GameWorld(player, parent);
//gameWorld.addRoom(Room.createFromGLTFScene('motor', './public/2CylinderEngine.gltf'))

function createRoomStructure(roomWidth, roomDepth, roomHeight, groundMaterial, wallMaterial, ceilingMaterial, room) {
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

function createBox(pos, rot, mass, width, height, depth, material, castShadow, recvShadow, room) {
    var boxGeometry = new THREE.BoxGeometry(width, height, depth);
    let box = new GameObject3D(pos, rot, mass, boxGeometry, material, castShadow, recvShadow);
    room.addObject3D(box);
}

function buildEntryRoom(){
    let room = new Room("Entry room");
    let groundTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/waves-of-sand.png");
    let groundMaterial = new THREE.MeshDepthMaterial({map: groundTexture});
    let ceilingTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/Blue-Sky.jpg");
    let ceilingMaterial = new THREE.MeshDepthMaterial({map: ceilingTexture});
    let wallTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/desert.jpg");
    let wallMaterial = new THREE.MeshDepthMaterial({map: wallTexture});

    createRoomStructure(75, 100, 10, groundMaterial, wallMaterial, ceilingMaterial, room);
    let boxCount = 0;
    let waterTexture = new THREE.TextureLoader().load("./assets/images/entryRoom/water.jpg");
    let waterMaterial = new THREE.MeshDepthMaterial({map: waterTexture});
    while(boxCount < 5) {
        createBox([0,boxCount+0.5,0], [0,0,0], 20, 1,1,1, waterMaterial, true, true, room);
        boxCount++;
    }

    return room;
}

const room = buildEntryRoom();
room.setIntensityOfGeneralLight(1);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

createListeners(parent);
requestAnimationFrame((t)=>{
    renderer.render(room.getScene(), player.getCamera());
    
});

/**
 * 
 * @param {Element} parent 
 */
function createListeners (parent) {
    window.addEventListener("keydown", (event)=> {
        console.log("pressed down");
        const message = new KeyboardMsg(event.key);
        console.log(message);
        const movementMessage = new MovementMsg(event.key);
        KeyboardMediator.getInstance().notify(message);
        PlayerMediator.getInstance().notify(movementMessage);
    }, true);
    window.addEventListener("keyup", (event) => {
        console.log("released");
        const message = new KeyboardMsg(event.key);
        const movementMessage = new MovementMsg(event.key);
        KeyboardMediator.getInstance().notify(message);
        PlayerMediator.getInstance().notify(movementMessage);
    }, false);
}

