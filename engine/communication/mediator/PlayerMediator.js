import Mediator from "./Mediator";

/**
 * @class PlayerMediator
 * @extends {Mediator}
 * 
 */

// Gets keycode from eventListener: [keyUp] and [keyDown]
// Forwards Message to Player
export default class PlayerMediator extends Mediator {
    static instance = new PlayerMediator();
}