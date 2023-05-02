/**
 * @class MovementMessage
 * @extends {Message}
 * 
 */

class MovementMessage extends Message {
    constructor(keyPressed) {
        switch (keyPressed) {
            case 32:
                this.#content = "jump";
                break;
            case 87:
            case 119:
                this.#content = "forward";
                break;
            case 65:
            case 97:
                this.#content = "left";
                break;
            case 83:
            case 115:
                this.#content = "backward";
                break;
            case 68:
            case 100:
                this.#content = "right";
                break;
            case 15:
                this.#content = "sprint";
                break;
        }
    }
}