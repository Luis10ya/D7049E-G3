import GameObject3D from "./engine/world/GameObject3D";
import GameWorld from "./engine/world/GameWorld";
import * as THREE from 'three';

const gameWorld = new GameWorld();

gameWorld.currentRoom.createGround(new GameObject3D(
    [0,0-0.5,0],
    [-Math.PI/2,0,0],
    0,
    new THREE.BoxGeometry(10000,1,10000),
    new THREE.MeshBasicMaterial({ color: 0x777777 }),
    false,
    true
));

gameWorld.currentRoom.addObject3D(
    new GameObject3D(
        [-10,2,-10],
        [0,0,0],
        0
    ),
    new GameObject3D(
        [-10,20,-10],
        [0,0,0],
        10,
        new THREE.SphereGeometry(3),
    )
)

document.addEventListener("click", ()=> {
    console.log("spawn");
    gameWorld.currentRoom.addObject3D(new GameObject3D(
        [-10,20,-10],
        [0,0,0],
        10,
        new THREE.SphereGeometry(3),
    )
    );
})

gameWorld.animate()