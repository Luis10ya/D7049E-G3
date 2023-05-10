import { Player } from "./engine/player/Player";
import GameWorld from "./engine/world/GameWorld";
import Room from "./engine/world/Room";
import KeyboardMediator from "./engine/communication/mediator/KeyboardMediator";
import PlayerMediator from "./engine/communication/mediator/PlayerMediator";
import KeyboardMsg from "./engine/communication/message/KeyboardMsg";
import MovementMsg from "./engine/communication/message/MovementMsg";

let parent = document.getElementById("game");
let player = new Player(80,1,3,12,1.7,parent);
let gameWorld = new GameWorld(player, parent);
gameWorld.addRoom(Room.createFromGLTFScene('motor', './public/2CylinderEngine.gltf'))
createListeners(parent);

window.setInterval(()=>{
    gameWorld.update();
}, 30);

function createListeners (parent) {
    parent.addEventListener("keydown", (event) => {
        const message = new KeyboardMsg(event.key);
        const movementMessage = new MovementMsg(event.key);
        KeyboardMediator.getInstance().notify(message);
        PlayerMediator.getInstance().notify(movementMessage);
    });

    parent.addEventListener("keyup", (event) => {
        const message = new KeyboardMsg(event.key);
        const movementMessage = new MovementMsg(event.key);
        KeyboardMediator.getInstance().notify(message);
        PlayerMediator.getInstance().notify(movementMessage);
    });
}