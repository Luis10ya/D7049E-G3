class Room {

    constructor(name){
        this.#name = name;
        this.#lights = [];
        this.#scene = new THREE.Scene();
        this.#generalLight = new THREE.AmbientLight();
        this.#exits = [];
        this.#hasGround = false;
        this.#scene.add(this.#generalLight);
    }

    getName(){
        return this.#name;
    }

    getScene(){
        return this.#scene;
    }

    setColorOfGeneralLight(color){
        this.#generalLight.color = color;
    }

    setIntensityOfGeneralLight(intensity){
        this.#generalLight.intensity = intensity;
    }

    addLight(light){
        let lightExistsInScene = this.#isObjectInScene(light)
        if(!lightExistsInScene){
            this.#lights.push(light);
            this.#scene.add(light);
        }
    }

    removeLight(light) {
        posInLights = this.getPosInLights(light);
        if(posInLights == -1){
            return false;
        }
        this.#lights.splice(posInLights, 1);
        this.#scene.remove(light);
        return true; 
    }

    getPosInLights(light){
        const isLight = (element) => element === light;
        return this.#lights.findIndex(isLight);
    }

    addExit(exit){
        if(this.getPosInExits(exit) == -1){
            this.#exits.push(exit);
        }
    }

    getPosInExits(exit){
        const isExit = (element) => element === exit;
        return this.#exits.findIndex(isExit);
    }

    removeExit(exit) {
        var posInExits = -1;
        if (typeof exit === 'number') {
            posInExits = exit;
            if (posInExits >= this.#exits.length || posInExits < 0) {
                return false;
            }
        } else if (exit === 'Exit') {
            posInExits = this.getPosInExits(exit)
            if(posInExits == -1){
                return false;
            } 
        }
        this.#exits.splice(posInExits, 1);
        return true;
    }

    addObject3D(object){
        let objectExistsInScene = this.#isObjectInScene(object);
        if(!objectExistsInScene){
            this.#scene.add(object);
        }
    }

    removeObject3D(object){
        let objectExistsInScene = this.#isObjectInScene(object);
        if(!objectExistsInScene){
            return false;
        }
        this.#scene.remove(object)
        return true;
    }

    #isObjectInScene(object){
        let objectExistsInScene = false;
        this.#scene.children.forEach(child => {
            if (child === object) {
                objectExistsInScene = true;
            }
        });
        return objectExistsInScene;
    }

    createGround(groundShape){
        let objectExistsInScene = this.#isObjectInScene(groundShape);
        if(!this.#hasGround && !objectExistsInScene){
            this.#hasGround = true;
            this.#scene.add(groundShape);
        }
    }

    getNeighbours(){
        let neighbours = [];
        this.#exits.forEach(exit => {
            neighbours.push(exit.getRoom())
        });
        return neighbours;
    }

    addBackground(backgroundObejct){
        let objectExistsInScene = this.#isObjectInScene(backgroundObejct);
        if(!objectExistsInScene){
            this.#scene.add(backgroundObejct);
        }
    }

}