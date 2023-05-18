import Colleague from "../communication/Colleague";
import * as THREE from 'three';
import { Player } from "../player/Player";
import Room from "./Room";
import TriggerMediator from "../communication/mediator/TriggerMediator";
import RoomChangeMsg from "../communication/message/RoomChangeMsg";

export default class GameWorld extends Colleague {
    roomList;
    currentRoom;
    player;

    renderer;

    clock;
    deltaTime;
    totalTime;

    //TODO Menus

    constructor() {
        super();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        this.clock = new THREE.Clock();
        this.deltaTime = 0;
        this.totalTime = 0;
        
        this.currentRoom = new Room();

        const player = new Player(20, 200, 40, 10, 1.5, this.renderer.domElement);
        this.player = player
        this.currentRoom.addObject3D(player);
        player.setPosition(0,0,0);

        this.roomList = new Array();

        window.addEventListener('resize', () => {
            this.player.getCamera().aspect = window.innerWidth / window.innerHeight;
            this.player.getCamera().updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        TriggerMediator.getInstance().register(this);
    }

    animate() {
        requestAnimationFrame(() => {
            this.animate();
        });

        this.deltaTime = this.clock.getDelta();
        console.log(this.deltaTime);
        this.totalTime += this.deltaTime;

        if(this.totalTime > 1) {
            this.totalTime = 0;
            this.player.pushUp();
        }

        this.currentRoom.updateGameObjects(this.deltaTime);
        this.player.update(this.deltaTime);

        this.renderer.render(this.currentRoom.getScene(), this.player.camera);
    }

    addRoom(newRoom) {
        const isInstance = !(newRoom instanceof Room)
        const roomExists = this.roomExists(newRoom.getName())
        if ( isInstance || roomExists) {
            return false;
        }
        this.roomList.push(newRoom);
        return true;
    }

    roomExists(name) {
        if (name instanceof Room) {
            return this.roomExists(name.getName());
        }
        for (const room of this.roomList) {
            if (room.getName() === name) {
                return true;
            }
        }
        return false;
    }

    removeRoom(name) {
        if (name instanceof Room) {
            return this.removeRoom(name.getName());
        }
        var toRemove = -1;
        for (var i = 0; i < this.roomList.length; i++) {
            if (this.roomList.at(i).getName() === name) {
                toRemove = i;
                break;
            }
        }
        if (toRemove >= 0) {
            this.roomList.splice(toRemove, 1);
        }
    }

    setCurrentRoom(name) {
        if (name instanceof Room) {
            return this.setCurrentRoom(name.getName());
        }
        for (const room of this.roomList) {
            if (room.getName() === name) {
                this.currentRoom.removeObject3D(this.player);
                this.currentRoom = room;
                this.currentRoom.addObject3D(this.player);
                return true;
            }
        }
        return false;
    }

    getCurrentRoom() {
        return this.currentRoom;
    }

    getRooms() {
        return this.roomList;
    }

    getPlayer() {
        return this.player;
    }

    action(msg) {
        if (msg instanceof RoomChangeMsg) {
            this.setCurrentRoom(msg.newCurrentRoom);
        }
    }
}