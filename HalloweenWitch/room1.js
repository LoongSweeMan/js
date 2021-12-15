class room1 extends Phaser.Scene {

    constructor() {
        super('room1');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
        this.score = data.score;


    }

    preload() {
      console.log("life: ", window.heart);

    // Step 1, load JSON
    this.load.tilemapTiledJSON("room1","assets/palace.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("decoration32", "assets/decoration.png");
    this.load.image("pipoya32", "assets/pipoya.png");
    this.load.image("scenery32", "assets/Scenery.png");
    this.load.image("pumpkin", "assets/pumpkin.png");
    this.load.image("heart", "assets/heart.png");

    this.load.atlas('batfront', 'assets/bat-front.png', 'assets/bat-front.json');
    this.load.atlas('batside', 'assets/bat-side.png', 'assets/bat-side.json');
    this.load.atlas('ghostfront', 'assets/ghost-front.png', 'assets/ghost-front.json');
    this.load.atlas('ghostside', 'assets/ghost-side.png', 'assets/ghost-side.json');

    }

    create() {

      console.log("life: ", window.heart);

//      //background_sound
//     window.music = this.sound
//     .add("bgmusic", {
//    loop: true,
//    }).setVolume(0.3);window.music.play();

// window.music.stop();

// window.music = this.sound
//     .add("bgmusic", {
//    loop: true,
//    }).setVolume(0.3);window.music.play();

   //collectsound
   this.collectsound = this.sound.add("collect");

    //hitsound
    this.hitsound = this.sound.add("hit");

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

        let tileArray = [decorationTiles, pipoyaTiles, sceneryTiles]

        this.groundLayer = map.createLayer("ground", tileArray, 0, 0);
        this.fenceLayer = map.createLayer("fence", tileArray, 0, 0);
        this.obstacleLayer = map.createLayer("obstacle", tileArray, 0, 0);

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;



        this.time.addEvent({ delay: 1000, callback: this.moveLeftRight, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveLeftRight2, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveLeftRight3, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 0, callback: this.moveUpDown, callbackScope: this, loop: false });


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
        window.score = this.score;

         // create the enemy sprite
         this.ghost1 = this.physics.add.sprite(this.ghost1.x, this.ghost1.y, 'ghost1').play('ghostfront');
         this.ghost2 = this.physics.add.sprite(this.ghost2.x, this.ghost2.y, 'ghost2').play('ghostside');
         this.ghost3 = this.physics.add.sprite(this.ghost3.x, this.ghost3.y, 'ghost3').play('ghostside');
         this.ghost4 = this.physics.add.sprite(this.ghost4.x, this.ghost4.y, 'ghost4').play('ghostside');

        //  //create the collectable sprite
         this.pumpkin1 = this.physics.add.sprite(337, 910, 'pumpkin'); 
         this.pumpkin2 = this.physics.add.sprite(336, 496, 'pumpkin');
         this.pumpkin3 = this.physics.add.sprite(78, 299, 'pumpkin');
         this.pumpkin4 = this.physics.add.sprite(591, 302, 'pumpkin');
         this.pumpkin5 = this.physics.add.sprite(77, 78, 'pumpkin');


         //hit enemy
         this.physics.add.overlap(this.player, this.ghost1, this.ghostOverlap, null, this);
         this.physics.add.overlap(this.player, this.ghost2, this.ghostOverlap, null, this);
         this.physics.add.overlap(this.player, this.ghost3, this.ghostOverlap, null, this);
         this.physics.add.overlap(this.player, this.ghost4, this.ghostOverlap, null, this);


         //hit collectable
         this.physics.add.overlap(this.player, this.pumpkin1, this.collectItem, null, this);
         this.physics.add.overlap(this.player, this.pumpkin2, this.collectItem, null, this);
         this.physics.add.overlap(this.player, this.pumpkin3, this.collectItem, null, this);
         this.physics.add.overlap(this.player, this.pumpkin4, this.collectItem, null, this);
         this.physics.add.overlap(this.player, this.pumpkin5, this.collectItem, null, this);



         //hit poison
      
      
        this.player.setCollideWorldBounds(true);

        //hearts
        this.heart1 = this.add
        .image(30, 25, "heart")
        .setScrollFactor(0)
        .setVisible(false);
        this.heart2 = this.add
        .image(70, 25, "heart")
        .setScrollFactor(0)
        .setVisible(false);
        this.heart3 = this.add
        .image(110, 25, "heart")
        .setScrollFactor(0)
        .setVisible(false);

      if (window.heart >= 3) {
        this.heart1.setVisible(true);
        this.heart2.setVisible(true);
        this.heart3.setVisible(true);
      } 
       else if (window.heart == 2) {
        this.heart1.setVisible(true);
        this.heart2.setVisible(true);
      } 
       else if (window.heart == 1) {
        this.heart1.setVisible(true);
      } 
      
          // create the arrow keys
          this.cursors = this.input.keyboard.createCursorKeys();
      
          // camera follow player
          this.cameras.main.startFollow(this.player);

          this.fenceLayer.setCollisionByExclusion(-1, true)
          this.obstacleLayer.setCollisionByExclusion(-1, true)
      
          this.physics.add.collider(this.player, this.fenceLayer)
          this.physics.add.collider(this.player, this.obstacleLayer)

          console.log('item: ', window.score);

          // this.scoreText = this.add.text(30, 440, window.score , {fontSize: '25px', fill: '#ffffff' }).setScrollFactor(0);  
        
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


        // winRoom(){
        //   console.log("Win");
        //   this.scene.start("world");
        // }


        world(player, tile) {
          console.log("world function");
          let playerPos = {};
          playerPos.x = 260;
          playerPos.y = 977;
          playerPos.dir = "down";
      
          this.scene.start("world", {playerPos: playerPos, score : this.score});
        }

      // Function hit ghost and bat
      ghostOverlap(player,ghost) {
        console.log( "ghost overlap player");
                window.heart--;

         if (window.heart == 2) {
         this.heart3.setVisible(false);
       } else if (window.heart == 1) {
         this.heart2.setVisible(false);
       } else if (window.heart == 0) {
         this.heart1.setVisible(false);
         console.log("you are dead");
         this.scene.start("gameover");
       }
    ghost.disableBody (true, true);
    this.hitsound.play();
    this.cameras.main.shake(200);
      }

      batOverlap(player,bat) {
        console.log( "bat overlap player");
                window.heart--;

         if (window.heart == 2) {
         this.heart3.setVisible(false);
       } else if (window.heart == 1) {
         this.heart2.setVisible(false);
       } else if (window.heart == 0) {
         this.heart1.setVisible(false);
         console.log("you are dead");
         this.scene.start("gameover");
       }
    bat.disableBody (true, true);
    this.hitsound.play();
    this.cameras.main.shake(200);
      }


      collectItem (player,item)
      {
      console.log("item collected");
      item.disableBody(true,true);
      this.collectsound.play();
      
      // window.score++; // add 10 points to the score

      // this.scoreText.setText('item: ' + window.score);

      return false;

      }





   }
