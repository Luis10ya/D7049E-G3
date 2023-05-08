/**
 * @class InventoryMsg
 * @extends {Message}
 * 
 */

// contain inventoryObj and 
// if it should be added or removed
class InventoryMsg extends Message {

    remove; // Bool
    item;   // InventoryObj
    
    constructor(remove, item){
            this.remove = remove;
            this.item = item
    }
}