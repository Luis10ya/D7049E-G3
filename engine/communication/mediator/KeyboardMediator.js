import Mediator from "./Mediator";

/**
 * @class KeyboardMediator
 * @extends {Mediator}
 * 
 */

// Gets keycode from eventListener: [keyUp] and [keyDown]
export default class KeyboardMediator extends Mediator {
    static instance = new KeyboardMediator();
}