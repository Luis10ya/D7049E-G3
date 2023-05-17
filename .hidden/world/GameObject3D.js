import Colleague from "../communication/Colleague";
import * as THREE from 'three';
import * as Ammo from 'ammo.js'


export default class GameObject3D extends Colleague {
    rep3d;
    body;

    constructor(
        [posX = 0, posY = 0, posZ = 0],
        [rotX = 0, rotY = 0, rotZ = 0],
        mass = 0,
        geometry = new THREE.BoxGeometry(5, 5, 5),
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        castShadow = true,
        recvShadow = true
    ) {
        super();

        this.rep3d = new THREE.Mesh(geometry, material);
        const position = new THREE.Vector3(posX, posY, posZ);
        this.rep3d.position.copy(position);
        
        //TODO: Test this
        /**this.rep3d.rotateX(rotX);
        this.rep3d.rotateY(rotY);
        this.rep3d.rotateZ(rotZ);*/
        this.rep3d.castShadow = castShadow;
        this.rep3d.receiveShadow = recvShadow;
        //Untested until here

        this.body = this.createBodyFromMesh(this.rep3d, mass);
    }

    createBodyFromMesh(mesh, mass) {
        const geometry = mesh.geometry;
        const scale = mesh.scale;
        geometry.computeVertexNormals();

        const shape = new Ammo.btConvexHullShape();

        if (geometry.attributes.position) {
            const vertices = geometry.attributes.position.array;
            for (let i = 0; i < vertices.length; i += 3) {
                const vertex = new Ammo.btVector3(
                    vertices[i] * scale.x,
                    vertices[i + 1] * scale.y,
                    vertices[i + 2] * scale.z
                );
                shape.addPoint(vertex);
            }
        } else if (geometry.vertices) {
            for (const vertex of geometry.vertices) {
                const btVertex = new Ammo.btVector3(
                    vertex.x * scale.x,
                    vertex.y * scale.y,
                    vertex.z * scale.z
                );
                shape.addPoint(btVertex);
            }
        } else {
            console.warn("Unsupported geometry type for collision shape creation:", geometry);
            return null;
        }

        const position = new THREE.Vector3();
        mesh.getWorldPosition(position);

        const quaternion = new THREE.Quaternion();
        mesh.getWorldQuaternion(quaternion);

        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
        transform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));

        const motionState = new Ammo.btDefaultMotionState(transform);
        const localInertia = new Ammo.btVector3(0, 0, 0);
        shape.calculateLocalInertia(mass, localInertia);

        const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
        return new Ammo.btRigidBody(rbInfo);       
    }

    updateMotion() {
        const transform = this.body.getWorldTransform();
        const origin = transform.getOrigin();
        const rotation = transform.getRotation();

        this.rep3d.position.set(origin.x(), origin.y(), origin.z());
        this.rep3d.quaternion.set(rotation.x(), rotation.y(), rotation.z(), rotation.w());
    }

    getObject3D() {
        return this.rep3d;
    }

    getRigidBody() {
        return this.body;
    }

    initMovement(velocity) {
        this.body.setLinearVelocity(velocity);
    }
}