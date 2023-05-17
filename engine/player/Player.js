import * as THREE from 'three';
import * as Ammo from 'ammo.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

import GameObject3D from '../world/GameObject3D';


export class Player extends GameObject3D {

    camera;
    controls;

    forward;
    backwards;
    left;
    right;

    velocity;
    velocityTurbo; //TODO
    mass;
    jumpAcceleration;
    eyeHeight;

    //TODO: add the inventory, addInventoryItem, removeInventoryItem

    constructor(mass, velocity, velocityTurbo, jumpAcceleration, eyeHeight, domElement) {
        const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
        const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });

        super(
            [0, 20, 0],
            [0, 0, 0],
            mass,
            playerGeometry,
            playerGeometry,
            true,
            false
        );

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.rep3d.add(this.camera);
        this.camera.position.y = 1.5;

        this.body.setAngularFactor(new Ammo.btVector3(0, 0, 0));
        this.body.setFriction(0.4);
        this.body.setDamping(0.4, 0.4);
        this.body.setCcdSweptSphereRadius(0.2);
        this.body.setCcdMotionThreshold(0.0001);
        this.body.setRestitution(50);


        this.controls = new PointerLockControls(this.camera, domElement);

        this.velocity = velocity;
        this.velocityTurbo = velocityTurbo;
        this.jumpAcceleration = jumpAcceleration;
        this.eyeHeight = eyeHeight;

        document.addEventListener('click', () => this.controls.lock(), false);

        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyRelease.bind(this), false);
    }

    onKeyDown(event) {
        switch (event.code) {
            case 'KeyW':
                this.forward = true;
                break;
            case 'KeyS':
                this.backwards = true;
                break;
            case 'KeyA':
                this.left = true;
                break;
            case 'KeyD':
                this.right = true;
                break;
        }
    }

    onKeyRelease(event) {
        switch (event.code) {
            case 'KeyW':
                this.forward = false;
                break;
            case 'KeyS':
                this.backwards = false;
                break;
            case 'KeyA':
                this.left = false;
                break;
            case 'KeyD':
                this.right = false;
                break;
        }
    }

    update(deltaTime) {
        console.log("speed");
        const forceMultiplier = this.velocity * deltaTime;
        const playerDirection = new THREE.Vector3();
        this.camera.getWorldDirection(playerDirection);
        playerDirection.y = 0;
        playerDirection.normalize();

        const currentVelocity = this.body.getLinearVelocity()

        const playerVelocity = this.body.getLinearVelocity();
        const force = new Ammo.btVector3(0, currentVelocity.y(), 0);

        if (this.forward) {
            
            force.setValue(playerDirection.x * forceMultiplier, currentVelocity.y(), playerDirection.z * forceMultiplier);
        } 
        if (this.backwards) {
            force.setValue(-playerDirection.x * forceMultiplier, currentVelocity.y(), -playerDirection.z * forceMultiplier);
        }
        if (this.left) {
            playerDirection.cross(this.camera.up);
            force.setValue(-playerDirection.x * forceMultiplier, currentVelocity.y(), -playerDirection.z * forceMultiplier);
        } 
        if (this.right) {
            playerDirection.cross(this.camera.up);
            force.setValue(playerDirection.x * forceMultiplier, currentVelocity.y(), playerDirection.z * forceMultiplier);
        }
        this.body.setLinearVelocity(force);
        //console.log(force.x(), force.y(), force.z());

        super.updateMotion()
    }

    getCamera() {
        return this.camera;
    }

    getMass() {
        return this.mass //TODO: + INventorymass
    }

    getControls()  {
        return this.controls;
    }
}