VIE idea:
	Physics Museum
	Walking simulator (Jump and walk)
	Put obstacles (Physics Demo)
	(User defined environment?)
	collect coins to pay the machines 

Code lang: 
	C++

Development environment set up
	3D library: https://www.ogre3d.org/ 
	Physics library: https://www.reactphysics3d.com
	Audio library: https://www.ambiera.com/irrklang/index.html

Download irrklang from [https://www.ambiera.at/downloads/irrKlang-64bit-1.6.0.zip]
Extract and rename to irrKlang

## Classes
- MuseumMayham: class that initializes maian objects for used libraries and handles game loop
- UserInput: Collection of callables linked with user input
- SceneManager: create & delete GameObjects, manage scene graph
    - GameObject (interface): Holds different values such as mash and rigidBody. Inheritted by gameparts that are not part of the engine
- CameraController: Defines Camera Pose
- CollisionManager: Collection of Callback Associators from Game objects
- LightManager
- SoundManager
- Player
- FileIOHandler
- UIHandler

### Game Classes
- Coin (GameObject)
- Experiment (GameObjectManager)
- MuseumSceneManager (inherits from SceneManager)