/**
 * Interface Class Colleague
 * @class Colleague
 * 
 */

export default class Colleague {

    constructor(mediator){
        this.mediator = mediator
        throw new Error("Interface can't be instantiated.");
    }

    getState(){
        throw new Error("Method 'getState()' must be implemented.");
    }

    action(msg){
        throw new Error("Method 'action(msg)' must be implemented.");
    }

}