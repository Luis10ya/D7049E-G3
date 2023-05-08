export default class Overlay {

    /**
     * 
     * @param {Element} renderTarget 
     */
    constructor(renderTarget) {
        this.renderTarget = renderTarget;
        this.overlayDiv = document.createElement('div');
        this.overlayDiv.style.position = 'absolute';
        this.overlayDiv.style.top = '0%';
        this.overlayDiv.style.left = '0%';
        this.overlayDiv.style.visibility = 'visible';
        this.overlayDiv.style.width = '100%'; // 100% of parent element width
        this.overlayDiv.style.height = '100%'; // 100% of parent element height
        this.color = [0.5, 0.5, 0.5];
        this.transparency = 1;
        this.overlayDiv.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.transparency})`;
  
        this.renderTarget.appendChild(this.overlayDiv);
    }
  
    /**
     * 
     * @param {Position in percentage, from left} left
     * @param {Position in percentage, from top} top
     */
    setPosition(left, top) {
        this.overlayDiv.style.left = `${left}%`;
        this.overlayDiv.style.top = `${top}%`;
    }
  
    setVisibility(visibility) {
        this.overlayDiv.style.visibility = visibility ? 'visible' : 'hidden';
    }
  
    /**
     * 
     * @param {Height in percentage} height 
     * @param {width in percentage} width 
     */
    setSize(height, width) {
        this.overlayDiv.style.width = `${width}%`;
        this.overlayDiv.style.height = `${height}%`;
    }
  
    setGeneralTransparency(transparency) {
        this.transparency = transparency;
        this.overlayDiv.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.transparency})`;
    }

    /**
     * 
     * @param {RGB color} color 
     */
    setColor(color){
        this.color = color;
        this.overlayDiv.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.transparency})`;
    }
  }
