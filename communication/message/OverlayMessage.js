/**
 * @class OverlayMessage
 * @extends {Message}
 * 
 */

class OverlayMessage extends Message {
    constructor(keyPressed) {
        switch (keyPressed) {
            case 27:    // ESC
                this.content = "escape";
                break;
            case 77:    // m
            case 109:   // M
                this.content = "map";
                break;
        }
    }
}