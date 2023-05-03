/**
 * @class MovementMessage
 * @extends {Message}
 * 
 */

class MovementMessage extends Message {
    constructor(keyPressed) {
        switch (keyPressed) {
            case 32:    // Space
                this.#content = "jump";
                break;
            case 87:    // w
            case 119:   // W
                this.#content = "forward";
                break;
            case 65:    // a
            case 97:    // A
                this.#content = "left";
                break;
            case 83:    // s
            case 115:   // S
                this.#content = "backward";
                break;
            case 68:    // d
            case 100:   // D
                this.#content = "right";
                break;
            case 15:    // Shift
                this.#content = "sprint";
                break;
        }
    }
}