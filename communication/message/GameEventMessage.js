/**
 * @class GameEventMessage
 * @extends {Message}
 * 
 */

class GameEventMessageContent {
    eventType = "";
    eventResponsible;
}

class GameEventMessage extends Message {
    constructor(eventType, eventResponsible) {
        this.eventType = eventType;
        this.eventResponsible = eventResponsible;
    }
}