//@author: Malte

import * as THREE from 'three';
import { Ammo } from 'ammojs3/dist/ammo.js'
import MapMenu from '../overlays/MapMenu';
import PauseMenu from '../overlays/PauseMenu'
import Colleague from '../communication/Colleague';

/**
 * The GameWorld is the central Element of the players surrounding in the Game.
 * It manages all rooms and manages the basic attributes of the entire game world like gravity and the clock
 */
export default class GameWorld extends Colleague{

    #player;
    #camera;
    #clock;
    #renderer;
    #currentRoom;
    #rooms;
    #pauseMenu;
    #mapMenu;
    #paused;
    


    /**
     * Constructor for the GameWorldClass
     * @param {Player} player 
     * @param {Element} domElement 
     */
    constructor(player, domElement) {
        //Set constructor arguments
        this.#player = player;

        //initialize ThreeJS stuff
        this.#camera = player.getCamera();
        this.#clock = new THREE.Clock();
        this.#renderer = new THREE.WebGLBufferRenderer({
            antialias: true,
            alpha: true,
        });
        this.#renderer.setPixelRatio(window.devicePixelRatio);
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        domElement.appendChild(this.#renderer.domElement);

        this.#currentRoom = undefined;
        this.#rooms = new Array();

        this.#pauseMenu = new PauseMenu(domElement);
        this.#mapMenu = new MapMenu(domElement, this.#rooms)

        this.#paused = false;
        this.#clock.start()
    }

    /**
     * Adds a new room to the rooms known to GameWorld
     * @param {Room} room
     */
    addRoom(room) {
        if (this.#rooms.length == 0) {
            this.#currentRoom = room;
            this.#rooms.push(room);
            return true;
        } else {
            if (this.#rooms.indexOf(room) > -1) {
                return false;
            } else {
                this.#rooms.push(room);
                return true;
            }
        }
    }

    /**
     * deletes a room from the availableRooms
     * @param {Room | number} room
     */
    removeRoom(room) {
        if(typeof(room) === 'Number') {
            if ((room >= 0) && (room < this.#rooms.length)) {
                this.#rooms.splice(room,1);
            }
        } else {
            const index = this.#rooms.indexOf(room);
            if (index > -1) {
                this.#rooms.splice(index,1);
            }
        }
    }

    /**
     * Sets the current room either by object reference or by index in the rooms array
     * @param {Room | number} room
     */
    setCurrentRoom(room){
        if (typeof(room) === 'Number') {
            this.loadRoom(room);
            this.#currentRoom = this.#rooms[room];
            return true;
        } else {
            const index = this.#rooms.indexOf(room);
            if (index > -1) {
                this.loadRoom(room);
                this.#currentRoom = room;
                return true;
            } else { //room is not known
                return false; 
            }
        }
    }

    /**
     * Returns the current room
     * @returns {Room} room
     */
    get currentRoom() {
        return this.#currentRoom;
    }

    /**
     * This **private** Method is used to load a room, so set the scene in the renderer
     * @param {Number} id 
     */
    loadRoom(id) {
        this.#renderer.render(this.#rooms[id].getScene(), this.#camera);
    }

    /**
     * Handles incoming Messages
     * @override
     * @param {Message} msg 
     */
    action(msg) {
        if (msg instanceof GameObjectMessage) {
            //Do nothing?
        } else if (msg instanceof PlayerMessage) {
            //Do nothing?
        } else if (msg instanceof MovementMessage) {
            //Do nothing?
        } else if (msg instanceof GameEventMessage) {
            //Do nothing
        } else {
            throw new Error("Argument of type " + Object.prototype.toString.call(msg) + " not supported for action");
        }
    }

    #togglePause(){
        this.#paused = !this.#paused;
        if (this.#paused) {
            this.#pauseMenu.setVisibility(true);
            this.clock.stop();
        } else {
            this.#pauseMenu.setVisibility(false);
            this.#clock.start();
        }
    }

    update() {
        const deltaTime = this.#clock.deltaTime();
        this.#currentRoom.updatePhysics();
    }
}