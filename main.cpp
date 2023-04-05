#include <iostream>
#include <Ogre.h>
#include <reactphysics3d/reactphysics3d.h>
#include <irrKlang.h>

int main() {

  std::cout << "Hello, world!" << std::endl;

  // Initialize Ogre3D
  Ogre::Root* root = new Ogre::Root();
  Ogre::RenderWindow* window = root->initialise(true, "My Game Engine");
  
  // Initialize ReactPhysics3D
  rp3d::PhysicsCommon physicsCommon;
  rp3d::PhysicsWorld* physicsWorld = physicsCommon.createPhysicsWorld();

  // Initialize irrKlang
  irrklang::ISoundEngine* soundEngine = irrklang::createIrrKlangDevice();

  // Cleanup
  delete soundEngine;
  physicsCommon.destroyPhysicsWorld(physicsWorld);
  delete window;
  delete root;

  return 0;
}

//g++ -std=c++11 -o mygame main.cpp -I/usr/include/OGRE -I./reactphysics3d/include -I./irrKlang/include -L./reactphysics3d/build -L./irrKlang/bin/linux-gcc-64 -L/usr/lib -lOgreMain -lreactphysics3d -lIrrKlang
