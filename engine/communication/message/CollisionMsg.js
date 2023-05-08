/**
 * @class CollisionMsg
 * @extends {Message}
 * 
 */

// Send what was collided with
class CollisionMsg extends Message {

    collisionPartner;

    constructor(collisionPartner){
        this.collisionPartner = collisionPartner;
    }
}