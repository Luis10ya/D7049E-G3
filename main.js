import { Player } from "./engine/player/Player";
import GameWorld from "./engine/world/GameWorld";
import Room from "./engine/world/Room";

parent = document.getElementById("game");
player = new Player(1,3,12,1.7,parent);
gameWorld = new GameWorld(player, parent);
gameWorld.addRoom(Room.createFromGLTFScene('motor', './public/2CylinderEngine.gltf'))