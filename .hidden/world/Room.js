import * as THREE from 'three';
import * as Ammo from 'ammo.js';
import Colleague from '../communication/Colleague';
import GameObject3D from './GameObject3D';

export default class Room extends Colleague {
    scene;
    physicsWorld;
    gameObject3DList;

    constructor() {
        super();

        this.gameObject3DList = new Array();

        this.scene = new THREE.Scene();

        let collisionConfiguration, dispatcher, broadphase, solver;
        collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
        broadphase = new Ammo.btDbvtBroadphase();
        solver = new Ammo.btSequentialImpulseConstraintSolver();
        this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
        this.physicsWorld.setGravity(new Ammo.btVector3(0, -9.81, 0));
        
        
    }

    createGround() {
        const groundPlaneGeometry = new THREE.BoxGeometry(10000,1,10000);
        const groundPlaneMaterial = new THREE.MeshBasicMaterial({ color: 0x777777 });
        const ground = new GameObject3D(
            [0,0-0.5,0],
            [-Math.PI/2,0,0],
            0,
            groundPlaneGeometry,
            groundPlaneMaterial,
            false,
            true
        );
        this.addObject3D(ground);
    }

    addObject3D(...objects) {
        for (const object of objects) {
            this.gameObject3DList.push(object);
            this.scene.add(object.rep3d);
            this.physicsWorld.addRigidBody(object.body);
        }
    }

    addPlayer(player) {
        this.scene.add(player.rep3d);
        this.physicsWorld.addRigidBody(player.body);
    }

    update(deltaTime) {
        this.physicsWorld.stepSimulation(deltaTime, 10);
        for (const object of this.gameObject3DList) {
            object.updateMotion();
        }
    }
}