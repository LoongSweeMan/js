class room1 extends Phaser.Scene {

    constructor() {
        super('room1');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;

    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON("room1","assets/palace.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("decoration32", "assets/decoration.png");
    this.load.image("pipoya32", "assets/pipoya.png");
    this.load.image("scenery32", "assets/Scenery.png");
    this.load.image("item32", "assets/item.png");
    // this.load.image("heart", "assets/heart.png");

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


        console.log('*** room1 scene');

        let map = this.make.tilemap({key:"room1"});

        let decorationTiles = map.addTilesetImage("decoration", "decoration32");
        let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya32");
        let sceneryTiles = map.addTilesetImage("Scenery", "scenery32");
        let itemTiles = map.addTilesetImage("item", "item32");

        let tileArray = [decorationTiles, pipoyaTiles, sceneryTiles, itemTiles]

        this.groundLayer = map.createLayer("ground", tileArray, 0, 0);
        this.fenceLayer = map.createLayer("fence", tileArray, 0, 0);
        this.obstacleLayer = map.createLayer("obstacle", tileArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer", tileArray, 0, 0);

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;


        this.time.addEvent({ delay: 1000, callback: this.moveLeftRight, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveLeftRight2, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveLeftRight3, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveUpDown, callbackScope: this, loop: false });


        // this.item = map.findObject("itemLayer", obj => obj.name === "item");
        // this.pumpkin2 = map.findObject("objectLayer", obj => obj.name === "pumpkin2");
        // this.pumpkin3 = map.findObject("objectLayer", obj => obj.name === "pumpkin3");
        // this.pumpkin4 = map.findObject("objectLayer", obj => obj.name === "pumpkin4");
        // this.pumpkin5 = map.findObject("objectLayer", obj => obj.name === "pumpkin5");
        this.ghost1 = map.findObject("objectLayer", obj => obj.name === "ghost1");
        this.ghost2 = map.findObject("objectLayer", obj => obj.name === "ghost2");
        this.ghost3 = map.findObject("objectLayer", obj => obj.name === "ghost3");
        this.ghost4 = map.findObject("objectLayer", obj => obj.name === "ghost4");

      

        this.player = this.physics.add.sprite(
          this.playerPos.x,
          this.playerPos.y,
          this.playerPos.dir
        );
      
        window.player = this.player;

         // create the enemy sprite
         this.ghost1 = this.physics.add.sprite(this.ghost1.x, this.ghost1.y, 'ghost1').play('ghostfront');
         this.ghost2 = this.physics.add.sprite(this.ghost2.x, this.ghost2.y, 'ghost2').play('ghostside');
         this.ghost3 = this.physics.add.sprite(this.ghost3.x, this.ghost3.y, 'ghost3').play('ghostside');
         this.ghost4 = this.physics.add.sprite(this.ghost4.x, this.ghost4.y, 'ghost4').play('ghostside');

        //  //create the collectable sprite
        //  this.pumpkin1 = this.physics.add.sprite(this.pumpkin1.x, this.pumpkin1.y, 'pumpkin'); 
        //  this.pumpkin2 = this.physics.add.sprite(this.pumpkin2.x, this.pumpkin2.y, 'pumpkin');
        //  this.pumpkin3 = this.physics.add.sprite(this.pumpkin3.x, this.pumpkin3.y, 'pumpkin');
        //  this.pumpkin4 = this.physics.add.sprite(this.pumpkin4.x, this.pumpkin4.y, 'pumpkin');
        //  this.pumpkin5 = this.physics.add.sprite(this.pumpkin5.x, this.pumpkin5.y, 'pumpkin');


         //hearts
        //  this.heart1 = this.add.image(50, 30, 'heart').setScrollFactor(0);
        //  this.heart2 = this.add.image(100, 30, 'heart').setScrollFactor(0);
        //  this.heart3 = this.add.image(150, 30, 'heart').setScrollFactor(0);

         //hit enemy
         this.physics.add.overlap(this.player, this.ghost1, this.ghostfrontOverlap, null, this);
         this.physics.add.overlap(this.player, this.ghost2, this.ghostsideOverlap, null, this);
         this.physics.add.overlap(this.player, this.ghost3, this.ghostsideOverlap, null, this);
         this.physics.add.overlap(this.player, this.ghost4, this.ghostsideOverlap, null, this);


         //hit collectable
        //  this.physics.add.overlap(this.player, 1, this.collectItem, null, this);
        //  this.physics.add.overlap(this.player, this.pumpkin2, this.collectItem, null, this);
        //  this.physics.add.overlap(this.player, this.pumpkin3, this.collectItem, null, this);
        //  this.physics.add.overlap(this.player, this.pumpkin4, this.collectItem, null, this);
        //  this.physics.add.overlap(this.player, this.pumpkin5, this.collectItem, null, this);

        this.itemLayer.setTileIndexCallback(1, this.removeItem, this);


         //hit poison
      
      
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
            this.player.x > 39 &&
            this.player.x < 115 &&
            this.player.y > 943
        ) {
            this.world();
        }

        if(
          this.player.x > 432 &&
          this.player.x < 526 &&
          this.player.y > 16  &&
          this.player.y < 17
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

        moveUpDown() {
          console.log('moveUpDown')
          this.tweens.timeline({
              targets: this.ghost1,
              loop: -1, // loop forever
              ease: 'Linear',
              duration: 2000,
              tweens: [
                {
                    y: 750,
                },
                {
                    y: this.ghost1.y,
                },
            ]
          });
      }

        moveLeftRight() {
          console.log('moveLeftRight')
          this.tweens.timeline({
              targets: this.ghost2,
              loop: -1, // loop forever
              ease: 'Linear',
              duration: 3000,
              tweens: [
              {
                  x: 405,
              },
              {
                  x: this.ghost2.x,
              },
          ]
          });
      }

              moveLeftRight2() {
          console.log('moveLeftRight')
          this.tweens.timeline({
              targets: this.ghost3,
              loop: -1, // loop forever
              ease: 'Linear',
              duration: 2000,
              tweens: [
              {
                  x: 148,
              },
              {
                  x: this.ghost3.x,
              },
          ]
          });
      }
              moveLeftRight3() {
          console.log('moveLeftRight')
          this.tweens.timeline({
              targets: this.ghost4,
              loop: -1, // loop forever
              ease: 'Linear',
              duration: 2000,
              tweens: [
              {
                  x: 536,
              },
              {
                  x: this.ghost4.x,
              },
          ]
          });
      }

      // //hit enemies
      // ghostfrontOverlap () {
      //   console.log("ghostfront overlap player"); {
      //   objectLayer.disableBody(true, true);
      //   // this.boomSnd.play();
      //   console.log(this.lifeCount);
      //   this.liveCount -= 1;
      //   this.cameras.main.shake(100);}

      //3 life
      //   if ( this.liveCount === 2) {
      //     this.cameras.main.shake(100);
      //     this.hitSnd.play();
      //     this.heart3.setVisible(false);
      //   } else if ( this.liveCount === 1) {
      //     this.hitSnd.play();
      //     this.cameras.main.shake(100);
      //     this.heart2.setVisible(false);
      //   } else if ( this.liveCount === 0) {
      //   this.hitSnd.play();
      //     this.cameras.main.shake(500);
      //     this.heart1.setVisible(false);
      //     this.isDead = true;
      //     }
      // } 

    //   if ( this.lifeCount === 0 ) {
    //     // delay 1 sec
    //     this.time.delayedCall(1000,function() {
          // // Reset counter before a restart
          // this.isDead = false;
          // this.life = 3;
          // this.scene.stop("room1");
          // // // this.backgroundMusicSnd.stop();
          // this.scene.start("preload");
    // } 


        world(player, tile) {
          console.log("world function");
          let playerPos = {};
          playerPos.x = 260;
          playerPos.y = 977;
          playerPos.dir = "down";
      
          this.scene.start("world", {playerPos: playerPos});
        }

        // Function hit ghost
      ghostfrontOverlap() {
        console.log( "ghostfront overlap player");
        this.scene.start("gameover");
      }

      ghostsideOverlap() {
          console.log( "ghostsideoverlap player");
          this.scene.start("gameover");
      }

    //   itemOverlap() {
    //     console.log( "itemoverlap player");
    //     item.disableBody(true, true);    
    // }

      // collectItem(player, item) {
      //   item.disableBody(true, true);
      //   this.bingSnd.play();
      //   console.log(this.lifeCount);
      //   this.lifeCount += 1; 
      //   if ( this.lifeCount === 3) {
      //       this.cameras.main.shake(50);
      //       // this.life3.setVisible(true);
      //   } else if ( this.lifeCount === 2) {
      //       this.cameras.main.shake(50);
      //       // this.life2.setVisible(true);
      //   } else if ( this.lifeCount === 1) {
      //       this.cameras.main.shake(50);
      //       // this.life1.setVisible(true);
      //   }
      //   return false;
      //   }


      // removeitem
      removeItem(player, item) {
        console.log('hit item', item.index );
        if (item.index !== 1) return;
        this.itemLayer.removeTileAt(item.x, item.y); // remove the item

        return false;
    }





    }
