import Message from "./Message";

/**
 * @class GameEventMsg
 * @extends {Message}
 * 
 */

class GameEventMsgContent {
    eventType = "";
    eventResponsible;
}

export default class GameEventMsg extends Message {
    constructor(eventType, eventResponsible) {
        this.eventType = eventType;
        this.eventResponsible = eventResponsible;
    }
}