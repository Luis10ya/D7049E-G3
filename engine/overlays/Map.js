//@author: Malte

import { Network } from "vis-network";

require('../world/Room');
require('./MapMenu')


export default class Map {

    #nodes;
    #edges;
    #network;

    /**
     * 
     * @param {Array<Room>} rooms A List of rooms that should not change anymore. If it changes build new Map Object
     * @param {string} currentPosition Name of the current room
     * @param {Element} renderTarget HTML Object that gets modified to the map
     */
    constructor(rooms, renderTarget) {
        this.#nodes = new Array();
        this.#edges = new Array();
        
        //Initialize graph. Collect all nodes
        for (const room of rooms) {
            if (room.isVisited()) {
                this.#nodes.push({
                    id: room.getName(), //I hope this works otherwise i have to create a table with integers asociated with the room names
                    label: room.getName(),
                    shape: "square",
                    background: "white",
                    border: "black",
                });
            }
        }

        //Initialize graph. Add the edges
        for (const room of rooms) {
            if (room.isVisited()) {
                for (const neighbour of room.getNeighbours()) {
                    if (neighbour.isVisited()) {
                        this.#edges.push({
                            from: room.getName(),
                            to: neighbour.getName() 
                        });
                    }
                }
            }
        }

        this.#network = new Network(renderTarget, {
            nodes: nodes,
            edges: edges,
        }, {
            nodes: {
                borderwidth:2,
            },
        });
    }

    /**
     * Gets called to update the current location. 
     * Should be called when the currentRoom of the gameWorld is changed 
     * @param {string} name 
     */
    setLocation(name) {
        for (const node of this.#nodes) {
            node.background = "white";
            if (node.id === name) {
                node.background = "yellow";
            }
        }
    }
}