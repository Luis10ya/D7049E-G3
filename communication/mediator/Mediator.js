/**
 * Abstract Class Mediator
 * 
 * @class Mediator
 * 
 */

class Mediator {

    #recipients = new Array();
    static instance;

    constructor(){
        if (this.constructor == Mediator) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    register(recipentColleague){
        //throw new Error("Method 'register(recipentColleague)' must be implemented.");
        this.#recipients.push(recipentColleague)
    }

    static getInstance(){
        return instance;
    }




}