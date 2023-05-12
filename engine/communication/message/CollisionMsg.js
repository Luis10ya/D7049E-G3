import Message from "./Message";

/**
 * @class CollisionMsg
 * @extends {Message}
 * 
 */

// Send what was collided with
export default class CollisionMsg extends Message {

    collisionPartner;

    constructor(collisionPartner){
        super();
        this.collisionPartner = collisionPartner;
    }
}