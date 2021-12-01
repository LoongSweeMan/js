class world extends Phaser.Scene {
  constructor() {
    super(
       "world"
    );
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world","assets/worldmap.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("building32", "assets/building.png");
    this.load.image("decoration32", "assets/decoration.png");
    this.load.image("grass32", "assets/grass.png");
    this.load.image("ground32", "assets/ground.png");
    this.load.image("halloween32", "assets/halloween.png");
    this.load.image("pipoya32", "assets/pipoya.png");
    this.load.image("plants32", "assets/plants.png");
    this.load.image("scenery32", "assets/Scenery.png");
    this.load.image("tree32", "assets/tree.png");

    // this.load.atlas('left', 'assets/left.png', 'assets/left.json');
    // this.load.atlas('right', 'assets/right.png', 'assets/right.json');
    // this.load.atlas('down', 'assets/down.png', 'assets/down.json');
    // this.load.atlas('up', 'assets/up.png', 'assets/up.json');
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:"world"});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildingTiles = map.addTilesetImage("building", "building32");
    let decorationTiles = map.addTilesetImage("decoration", "decoration32");
    let grassTiles = map.addTilesetImage("grass", "grass32");
    let groundTiles = map.addTilesetImage("ground", "ground32");
    let halloweenTiles = map.addTilesetImage("halloween", "halloween32");
    let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya32");
    let plantsTiles = map.addTilesetImage("plants", "plants32");
    let sceneryTiles = map.addTilesetImage("Scenery", "scenery32");
    let treeTiles = map.addTilesetImage("tree", "tree32");
    

    // Step 5  Load in layers by layers
    this.grassLayer = map.createLayer("grassLayer", 
    [buildingTiles,decorationTiles,grassTiles,groundTiles,halloweenTiles,pipoyaTiles,plantsTiles,sceneryTiles,treeTiles], 0, 0);

    this.groundLayer = map.createLayer("groundLayer", 
    [buildingTiles,decorationTiles,grassTiles,groundTiles,halloweenTiles,pipoyaTiles,plantsTiles,sceneryTiles,treeTiles], 0, 0);

    this.decorationLayer = map.createLayer("decorationLayer", 
    [buildingTiles,decorationTiles,grassTiles,groundTiles,halloweenTiles,pipoyaTiles,plantsTiles,sceneryTiles,treeTiles], 0, 0);

    this.treeLayer = map.createLayer("treeLayer", 
    [buildingTiles,decorationTiles,grassTiles,groundTiles,halloweenTiles,pipoyaTiles,plantsTiles,sceneryTiles,treeTiles], 0, 0);

    this.buildingLayer = map.createLayer("buildingLayer", 
    [buildingTiles,decorationTiles,grassTiles,groundTiles,halloweenTiles,pipoyaTiles,plantsTiles,sceneryTiles,treeTiles], 0, 0);

    this.fenceLayer = map.createLayer("fenceLayer", 
    [buildingTiles,decorationTiles,grassTiles,groundTiles,halloweenTiles,pipoyaTiles,plantsTiles,sceneryTiles,treeTiles], 0, 0);



  this.physics.world.bounds.width = this.groundLayer.width;
  this.physics.world.bounds.height = this.groundLayer.height;

  // this.player=this.physics.add.sprite(
  //   1108,
  //   1193,
  //   "up"
  //   );

  this.player = this.physics.add.sprite(

    this.playerPos.x,
    this.playerPos.y,
    this.playerPos.dir,
  );

  window.player = this.player;


  this.player.setCollideWorldBounds(true);
    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    this.decorationLayer.setCollisionByExclusion(-1, true)
    this.treeLayer.setCollisionByExclusion(-1, true)
    this.buildingLayer.setCollisionByExclusion(-1, true)
    this.fenceLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.decorationLayer)
    this.physics.add.collider(this.player, this.treeLayer)
    this.physics.add.collider(this.player, this.buildingLayer)
    this.physics.add.collider(this.player, this.fenceLayer)
  } /////////////////// end of create //////////////////////////////

  update() {

  if(
    this.player.x > 241 &&
    this.player.x < 300 &&
    this.player.y > 945 &&
    this.player.y < 957
  ) {
    this.room1()
  }

  if(
    this.player.x > 1141 &&
    this.player.x < 1188 &&
    this.player.y > 432 &&
    this.player.y < 433
  ) {
    this.room2()
  }

  if(
    this.player.x > 336 &&
    this.player.x < 433 &&
    this.player.y > 144 &&
    this.player.y < 241
  ) {
    this.room3()
  }

  if(this.cursors.left.isDown){
      this.player.setVelocityX(-170);
      this.player.anims.play("left",true);
  }
  else if(this.cursors.right.isDown){
    this.player.setVelocityX(170);
    this.player.anims.play("right",true);
  }
  else if(this.cursors.up.isDown){
    this.player.setVelocityY(-170);
    this.player.anims.play("up",true);
  }
  else if(this.cursors.down.isDown){
    this.player.setVelocityY(170);
    this.player.anims.play("down",true);
  }else{
    this.player.anims.stop();
    this.player.body.setVelocity(0,0);
  }
} /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    let playerPos = {};
    playerPos.x = 88;
    playerPos.y = 859;
    playerPos.dir = "up";

    this.scene.start("room1", {playerPos: playerPos});
  }

  room2(player, tile) {
    console.log("room2 function");
    let playerPos = {};
    playerPos.x = 323;
    playerPos.y = 883;
    playerPos.dir = "up";

    this.scene.start("room2", {playerPos: playerPos});
  }

  room3(player, tile) {
    console.log("room3 function");
    let playerPos = {};
    playerPos.x = 88;
    playerPos.y = 351;
    playerPos.dir = "right";

    this.scene.start("room3", {playerPos: playerPos});
  }
} //////////// end of class world ////////////////////////
