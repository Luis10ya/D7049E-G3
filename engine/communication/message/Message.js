/**
 * Abstract Class Message
 * 
 * @class Message
 * 
 */

class Message {

    content;

    constructor(message){
        if (this.constructor == Message) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.content = message;

    }

    getMessage(){
        return this.content;
    }

    setMessage(message){
        this.content = message;
    }


}

