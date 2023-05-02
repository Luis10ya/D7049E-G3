//@author: Malte

require('./Map');
require('./Overlay');

import Overlay from './Overlay';
import Map from './Map';


export default class MapMenu extends Overlay{
    constructor(renderTarget, rooms) {
        super(renderTarget);
        this.#map = new Map(rooms, this.renderTarget.createElement("div"));
    }
}