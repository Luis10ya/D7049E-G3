import * as THREE from 'three';
import GameObject3DMediator from '../engine/communication/mediator/GameObject3DMediator.js';
import PlayerMediator from '../engine/communication/mediator/PlayerMediator.js';
import PhysicsMediator from '../engine/communication/mediator/PhysicsMediator.js';
import KeyboardMediator from '../engine/communication/mediator/KeyboardMediator.js';
import MouseInputMediator from '../engine/communication/mediator/MouseInputMediator.js';
import EscMediator from '../engine/communication/mediator/EscMediator.js';
import MenuMediator from '../engine/communication/mediator/MenuMediator.js';
import InventoryMediator from '../engine/communication/mediator/InventoryMediator.js';
import TriggerMediator from '../engine/communication/mediator/TriggerMediator.js';



export class MediatorInit {

    constructor(){
        this.gameObject3DMediator = GameObject3DMediator.instance;
        this.playerMediator = PlayerMediator.instance;
        this.physicsMediator = PhysicsMediator.instance;
        this.keyboardMediator = KeyboardMediator.instance;
        this.mouseInputMediator = MouseInputMediator.instance;
        this.escMediator = EscMediator.instance;
        this.menuMediator = MenuMediator.instance;
        this.inventoryMediator = InventoryMediator.instance;
        this.triggerMediator = TriggerMediator.instance;
    }


}