/**
 * @class SettingsMsg
 * @extends {Message}
 * 
 */

// sends name and value of setting?
class SettingsMsg extends Message {

    name;
    value;

    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}