require('../message/Message');
import Message from '../message/Message';

/**
 * Abstract Class Mediator
 * 
 * @class Mediator
 * 
 */

class Mediator {

    recipients = new Array();
    static instance;

    constructor(){
        if (this.constructor == Mediator) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    register(recipientColleague){
        //throw new Error("Method 'register(recipentColleague)' must be implemented.");
        this.recipients.push(recipientColleague)
    }

    notify(message){
        for (recipient of this.recipients) {
            if (typeof recipient.action === 'function') {
                recipient.action(message);
            }
        }
    }

    static getInstance(){
        return instance;
    }




}