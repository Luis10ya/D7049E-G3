import MenuMediator from "../communication/mediator/MenuMediator";

export default class Setting {
    #value;
    #displayName;
    #mediator;


    constructor(displayName) {  
        this.#displayName = displayName;
        this.#mediator = MenuMediator.getInstance();
    }

    setValue(value) {
        this.#value = value;
        this.sendMessage;
    }

    getDisplayName() {
        return this.#displayName;
    }

    sendMessage() {
        messageObj = {
            setting: this.#displayName,
            value: this.#value
        }
        message = new OverlayMessage(JSON.stringify(messageObj));
        this.#mediator.notify(message);
    }
}