import Colleague from "../communication/Colleague";
import * as THREE from 'three';
import { Player } from "../player/Player";
import Room from "./Room";

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

        this.roomList = new Array();

        window.addEventListener('resize', () => {
            this.player.getCamera().aspect = window.innerWidth / window.innerHeight;
            this.player.getCamera().updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
    }

    animate() {
        requestAnimationFrame(() => {
            this.animate();
        });

        this.deltaTime = this.clock.getDelta();
        console.log(this.deltaTime);
        this.totalTime += this.deltaTime;

        this.currentRoom.updateGameObjects(this.deltaTime);
        this.player.update(this.deltaTime);

        this.renderer.render(this.currentRoom.getScene(), this.player.camera);
    }

    addRoom(newRoom) {
        if (!(newRoom instanceof Room) || (this.roomExists(newRoom.getName()))) {
            return false;
        }
        this.roomList.push(newRoom);
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
                this.currentRoom = room;
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
}