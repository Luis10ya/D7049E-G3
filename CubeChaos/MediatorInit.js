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
        this.gameObject3DMediator = GameObject3DMediator.getInstance();
        this.playerMediator = PlayerMediator.getInstance();
        this.physicsMediator = PhysicsMediator.getInstance();
        this.keyboardMediator = KeyboardMediator.getInstance();
        this.mouseInputMediator = MouseInputMediator.getInstance();
        this.escMediator = EscMediator.getInstance();
        this.menuMediator = MenuMediator.getInstance();
        this.inventoryMediator = InventoryMediator.getInstance();
        this.triggerMediator = TriggerMediator.getInstance();
    }


}