/**
 * Abstract Class Message
 * 
 * @class Message
 * 
 */

class Message {

    #content;

    constructor(){
        if (this.constructor == Message) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    getMessage(){
        return this.#content;
    }

    setMessage(message){
        this.#content = message;
    }


}

