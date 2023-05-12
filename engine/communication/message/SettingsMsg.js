import Message from "./Message";

/**
 * @class SettingsMsg
 * @extends {Message}
 * 
 */

// sends name and value of setting?
export default class SettingsMsg extends Message {

    name;
    value;

    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}