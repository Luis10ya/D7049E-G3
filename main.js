import { Player } from "./engine/player/Player";
import GameWorld from "./engine/world/GameWorld";
import Room from "./engine/world/Room";

let parent = document.getElementById("game");
let player = new Player(80,1,3,12,1.7,parent);
let gameWorld = new GameWorld(player, parent);
gameWorld.addRoom(Room.createFromGLTFScene('motor', './public/2CylinderEngine.gltf'))