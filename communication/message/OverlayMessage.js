/**
 * @class OverlayMessage
 * @extends {Message}
 * 
 */

class OverlayMessage extends Message {
    constructor(keyPressed) {
        switch (keyPressed) {
            case 27:
                this.#content = "escape";
                break;
            case 77:
            case 109:
                this.#content = "map";
                break;
        }
    }
}