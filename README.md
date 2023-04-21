VIE idea:
	Physics Museum
	Walking simulator (Jump and walk)
	Put obstacles (Physics Demo)
	(User defined environment?)
	collect coins to pay the machines 

Code lang: 
	JavaScript

Development environment set up
	3D library: https://threejs.org
	Physics library: ammo.js, https://github.com/kripken/ammo.js/

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
