class room3 extends Phaser.Scene {

    constructor() {
        super('room3');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON("room3","assets/underground.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("decoration32", "assets/decoration.png");
    this.load.image("pipoya32", "assets/pipoya.png");
    this.load.image("scenery32", "assets/Scenery.png");
    this.load.image("grass32", "assets/grass.png");
    this.load.image("item32", "assets/item.png");
    this.load.image("poison32", "assets/poison.png");


    this.load.atlas('batfront', 'assets/bat-front.png', 'assets/bat-front.json');
    this.load.atlas('batside', 'assets/bat-side.png', 'assets/bat-side.json');
    this.load.atlas('ghostfront', 'assets/ghost-front.png', 'assets/ghost-front.json');
    this.load.atlas('ghostside', 'assets/ghost-side.png', 'assets/ghost-side.json');

    }

    create() {

      this.anims.create({
        key: 'ghostfront',
        frames: [
          {key:'ghostfront',frame:'animation-41'},
          {key:'ghostfront',frame:'animation-42'},
          {key:'ghostfront',frame:'animation-43'},
          {key:'ghostfront',frame:'animation-44'},
        ],
        frameRate: 8,
        repeat: -1
      })
      
      this.anims.create({
        key: 'ghostside',
        frames: [
          {key:'ghostside',frame:'animation-33'},
          {key:'ghostside',frame:'animation-34'},
          {key:'ghostside',frame:'animation-35'},
          {key:'ghostside',frame:'animation-36'},
        ],
        frameRate: 8,
        repeat: -1
      })

this.anims.create({
  key: 'batfront',
  frames: [
    {key:'batfront',frame:'animation-17'},
    {key:'batfront',frame:'animation-18'},
    {key:'batfront',frame:'animation-19'},
    {key:'batfront',frame:'animation-20'},
  ],
  frameRate: 8,
  repeat: -1
})

this.anims.create({
  key: 'batside',
  frames: [
    {key:'batside',frame:'animation-29'},
    {key:'batside',frame:'animation-30'},
    {key:'batside',frame:'animation-31'},
    {key:'batside',frame:'animation-32'},
  ],
  frameRate: 8,
  repeat: -1
})


        console.log('*** room3 scene');

        let map = this.make.tilemap({key:"room3"});

        let decorationTiles = map.addTilesetImage("decoration", "decoration32");
        let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya32");
        let sceneryTiles = map.addTilesetImage("Scenery", "scenery32");
        let grassTiles = map.addTilesetImage("grass", "grass32");
        let itemTiles = map.addTilesetImage("item", "item32");

        let tileArray = [decorationTiles, pipoyaTiles, sceneryTiles, grassTiles, itemTiles]

        this.groundLayer = map.createLayer("ground", tileArray, 0, 0);
        this.fenceLayer = map.createLayer("fence", tileArray, 0, 0);
        this.obstacleLayer = map.createLayer("obstacle", tileArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer", tileArray, 0, 0);

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

        this.time.addEvent({ delay: 0, callback: this.moveLeftRight, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 1000, callback: this.moveUpDown, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveUpDown2, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 1000, callback: this.moveUpDown3, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveLeftRight2, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveLeftRight3, callbackScope: this, loop: false });

        this.ghost1 = map.findObject("objectLayer", obj => obj.name === "ghost1");
        this.ghost2 = map.findObject("objectLayer", obj => obj.name === "ghost2");
        this.bat1 = map.findObject("objectLayer", obj => obj.name === "bat1");
        this.bat2 = map.findObject("objectLayer", obj => obj.name === "bat2");
        this.bat3 = map.findObject("objectLayer", obj => obj.name === "bat3");
        this.bat4 = map.findObject("objectLayer", obj => obj.name === "bat4");
      
        this.player = this.physics.add.sprite(
          this.playerPos.x,
          this.playerPos.y,
          this.playerPos.dir
        );
      
        window.player = this.player;


        // create the enemy sprite
        this.ghost1 = this.physics.add.sprite(576, 566, 'ghost1').play('ghostfront');
        this.ghost2 = this.physics.add.sprite(729, 190, 'ghost2').play('ghostside');
        this.bat1 = this.physics.add.sprite(502, 500, 'bat1').play('batside');
        this.bat2 = this.physics.add.sprite(301, 341, 'bat2').play('batfront');
        this.bat3 = this.physics.add.sprite(664, 429, 'bat3').play('batfront');
        this.bat4 = this.physics.add.sprite(878, 234, 'bat4').play('batside');

        //hit enemy
        this.physics.add.overlap(this.player, this.ghost1, this.ghostfrontOverlap, null, this);
        this.physics.add.overlap(this.player, this.ghost2, this.ghostsideOverlap, null, this);
        this.physics.add.overlap(this.player, this.bat1, this.batsideOverlap, null, this);
        this.physics.add.overlap(this.player, this.bat2, this.batfrontOverlap, null, this);
        this.physics.add.overlap(this.player, this.bat3, this.batfrontOverlap, null, this);
        this.physics.add.overlap(this.player, this.bat4, this.batsideOverlap, null, this);

        //item layer callback
        this.itemLayer.setTileIndexCallback(1, this.removeItem, this);
        this.itemLayer.setTileIndexCallback(2, this.removeItem, this);
      
      
        this.player.setCollideWorldBounds(true);
      
          // create the arrow keys
          this.cursors = this.input.keyboard.createCursorKeys();
      
          // camera follow player
          this.cameras.main.startFollow(this.player);

          this.fenceLayer.setCollisionByExclusion(-1, true)
          this.obstacleLayer.setCollisionByExclusion(-1, true)
      
          this.physics.add.collider(this.player, this.fenceLayer)
          this.physics.add.collider(this.player, this.obstacleLayer)
          this.physics.add.collider(this.itemLayer, this.player)
        
    }

    update() {

        if(
            this.player.x > 47 &&
            this.player.x < 49 &&
            this.player.y > 320 &&
            this.player.y < 373
        ) {
            this.world();
        }

        if(
          this.player.x > 911 &&
          this.player.x < 912 &&
          this.player.y > 480  &&
          this.player.y < 539
      ) {
          this.world();
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

      }

    //end of update

    moveLeftRight() {
      console.log('moveLeftRight')
      this.tweens.timeline({
          targets: this.bat1,
          loop: -1, // loop forever
          ease: 'Linear',
          duration: 3000,
          tweens: [
            {
              x: 269,
          },
          {
              x: 500,
          },
      ]
      });
  }

  moveLeftRight2() {
    console.log('moveLeftRight')
    this.tweens.timeline({
        targets: this.ghost2,
        loop: -1, // loop forever
        ease: 'Linear',
        duration: 3000,
        tweens: [
          {
            x: 428,
        },
        {
            x: 729,
        },
    ]
    });
}

moveLeftRight3() {
  console.log('moveLeftRight')
  this.tweens.timeline({
      targets: this.bat4,
      loop: -1, // loop forever
      ease: 'Linear',
      duration: 3500,
      tweens: [
        {
          x: 652,
      },
      {
          x: 878,
      },
  ]
  });
}


  moveUpDown() {
    console.log('moveUpDown')
    this.tweens.timeline({
        targets: this.bat2,
        loop: -1, // loop forever
        ease: 'Linear',
        duration: 2000,
        tweens: [
          {
              y: 90,
          },
          {
              y: 341,
          },
      ]
    });
}

moveUpDown2() {
  console.log('moveUpDown')
  this.tweens.timeline({
      targets: this.ghost1,
      loop: -1, // loop forever
      ease: 'Linear',
      duration: 2000,
      tweens: [
        {
            y: 350,
        },
        {
            y: 566,
        },
    ]
  });
}

moveUpDown3() {
  console.log('moveUpDown')
  this.tweens.timeline({
      targets: this.bat3,
      loop: -1, // loop forever
      ease: 'Linear',
      duration: 2000,
      tweens: [
        {
            y: 190,
        },
        {
            y: 429,
        },
    ]
  });
}


    world(player, tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 383;
        playerPos.y = 277;
        playerPos.dir = "down";
    
        this.scene.start("world", {playerPos: playerPos});
      }

      // Function hit ghost and bat
      ghostfrontOverlap() {
        console.log( "ghostfront overlap player");
        this.scene.start("gameover");
      }

      ghostsideOverlap() {
          console.log( "ghostsideoverlap player");
          this.scene.start("gameover");
      }

      batfrontOverlap() {
        console.log( "batfrontoverlap player");
        this.scene.start("gameover");
    }

    batsideOverlap() {
      console.log( "batsideoverlap player");
      this.scene.start("gameover");
  }


      removeItem(player, item) {
        console.log('hit item', item.index );
        if (item.index !== 1) return;
        this.itemLayer.removeTileAt(item.x, item.y); // remove the item

        return false;
    }

 
  }
