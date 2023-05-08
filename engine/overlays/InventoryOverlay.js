import Overlay from './Overlay';

/**
 * @class InventoryOverlay
 * @extends {Overlay}
 * 
 */
export default class InventoryOverlay extends Overlay{

    #rows;
    #columns;

    
    constructor(renderTarget, rows, columns){
        super(renderTarget);
        this.#rows = rows;
        this.#columns = columns;
        this.update([]);
    }

    update(newInventory){

        var table = document.createElement('table');

        table.setAttribute('rows', this.#rows);
        table.setAttribute('cols', this.#columns);

        for (var i = 0; i < this.#rows; i++) {
            var row = table.insertRow();
        
            for (var j = 0; j < this.#columns; j++) {
                var cell = row.insertCell();
                var index = i*this.#columns + j;
                if (index < newInventory.length) {
                    cell.innerHTML = newInventory[index];
                }
            }
        }

        this.overlayDiv.appendChild(table);
    }

}