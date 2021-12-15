class room2 extends Phaser.Scene {

    constructor() {
        super('room2');
        
        // Put global variable here
    }


    init(data) {
        this.playerPos = data.playerPos;
        this.score = data.score;
    }

    preload() {

    // Step 1, load JSON
    this.load.tilemapTiledJSON("room2","assets/church.json");

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("decoration32", "assets/decoration.png");
    this.load.image("pipoya32", "assets/pipoya.png");
    this.load.image("scenery32", "assets/Scenery.png");
    this.load.image("pumpkin", "assets/pumpkin.png");
    this.load.image("sweet", "assets/sweet.png");
    this.load.image("heart", "assets/heart.png");

    this.load.atlas('batfront', 'assets/bat-front.png', 'assets/bat-front.json');
    this.load.atlas('batside', 'assets/bat-side.png', 'assets/bat-side.json');
    this.load.atlas('ghostfront', 'assets/ghost-front.png', 'assets/ghost-front.json');
    this.load.atlas('ghostside', 'assets/ghost-side.png', 'assets/ghost-side.json');

    }

    

    create() {
      console.log("life: ", window.heart);

//           //background_sound
//     window.music = this.sound
//     .add("bgmusic", {
//    loop: true,
//    }).setVolume(0.3);window.music.play();

// window.music.stop();

   //collectsound
   this.collectsound = this.sound.add("collect");

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


      
        console.log('*** room2 scene');

        let map = this.make.tilemap({key:"room2"});

        let decorationTiles = map.addTilesetImage("decoration", "decoration32");
        let pipoyaTiles = map.addTilesetImage("pipoya", "pipoya32");
        let sceneryTiles = map.addTilesetImage("Scenery", "scenery32");

        let tileArray = [decorationTiles, pipoyaTiles, sceneryTiles]

        this.groundLayer = map.createLayer("ground", tileArray, 0, 0);
        this.fenceLayer = map.createLayer("fence", tileArray, 0, 0);
        this.obstacleLayer = map.createLayer("obstacle", tileArray, 0, 0);

        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;


        this.time.addEvent({ delay: 0, callback: this.moveLeftRight, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 1000, callback: this.moveUpDown, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 1000, callback: this.moveUpDown2, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 1000, callback: this.moveUpDown3, callbackScope: this, loop: false });
        this.time.addEvent({ delay: 1000, callback: this.moveLeftRight2, callbackScope: this, loop: false });


        this.ghost1 = map.findObject("objectLayer", obj => obj.name === "ghost1");
        this.ghost2 = map.findObject("objectLayer", obj => obj.name === "ghost2");
        this.ghost3 = map.findObject("objectLayer", obj => obj.name === "ghost3");
        this.bat1 = map.findObject("objectLayer", obj => obj.name === "bat1");
        this.bat2 = map.findObject("objectLayer", obj => obj.name === "bat2");
        this.bat2 = map.findObject("objectLayer", obj => obj.name === "bat3");

      
        this.player = this.physics.add.sprite(
          this.playerPos.x,
          this.playerPos.y,
          this.playerPos.dir
        );
      
        window.player = this.player;
        window.score = this.score;

        // create the enemy sprite
        this.ghost1 = this.physics.add.sprite(82, 780, 'ghost1').play('ghostside');
        this.ghost2 = this.physics.add.sprite(442, 64, 'ghost2').play('ghostfront');
        this.ghost3 = this.physics.add.sprite(141, 332, 'ghost3').play('ghostfront');
        this.bat1 = this.physics.add.sprite(260, 569, 'bat1').play('batfront');
        this.bat2 = this.physics.add.sprite(430, 569, 'bat2').play('batside');
        this.bat3 = this.physics.add.sprite(260, 569, 'bat3').play('batfront');

        //  //create the collectable sprite
         this.pumpkin1 = this.physics.add.sprite(79, 911, 'pumpkin'); 
         this.pumpkin2 = this.physics.add.sprite(494, 560, 'pumpkin');
         this.pumpkin3 = this.physics.add.sprite(78, 112, 'pumpkin');
         this.sweet1 = this.physics.add.sprite(79, 466, 'sweet');
         this.sweet2 = this.physics.add.sprite(560, 111, 'sweet');

         //hit enemy
         this.physics.add.overlap(this.player, this.ghost1, this.ghostOverlap, null, this);
         this.physics.add.overlap(this.player, this.ghost2, this.ghostOverlap, null, this);
         this.physics.add.overlap(this.player, this.ghost3, this.ghostOverlap, null, this);
         this.physics.add.overlap(this.player, this.bat1, this.batOverlap, null, this);
         this.physics.add.overlap(this.player, this.bat2, this.batOverlap, null, this);
         this.physics.add.overlap(this.player, this.bat3, this.batOverlap, null, this);

         //hit collectable
         this.physics.add.overlap(this.player, this.pumpkin1, this.collectItem, null, this);
         this.physics.add.overlap(this.player, this.pumpkin2, this.collectItem, null, this);
         this.physics.add.overlap(this.player, this.pumpkin3, this.collectItem, null, this);
         this.physics.add.overlap(this.player, this.sweet1, this.collectItem, null, this);
         this.physics.add.overlap(this.player, this.sweet2, this.collectItem, null, this);

         //move to player
        //  this. bat1 = {
        //   bat1.play('batfront');
        //   bat1.flipX = true;
        //   this.physics.moveToObject( bat1, this.player, 569, 5500);
        //  }


      
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
        
    }

    update() {

      this.physics.moveToObject(this.bat3, this.player, 50, 4000)

        if(
            this.player.x > 272 &&
            this.player.x < 369 &&
            this.player.y > 943
        ) {
            this.world();
        }

        if(
          this.player.x > 272 &&
          this.player.x < 369 &&
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
    moveLeftRight() {
      console.log('moveLeftRight')
      this.tweens.timeline({
          targets: this.ghost1,
          loop: -1, // loop forever
          ease: 'Linear',
          duration: 3000,
          tweens: [
            {
              x: 382,
          },
          {
              x: 82,
          },
      ]
      });
  }

  moveLeftRight2() {
    console.log('moveLeftRight')
    this.tweens.timeline({
        targets: this.bat2,
        loop: -1, // loop forever
        ease: 'Linear',
        duration: 3000,
        tweens: [
          {
            x: 194,
        },
        {
            x: 430,
        },
    ]
    });
}

  moveUpDown() {
    console.log('moveUpDown')
    this.tweens.timeline({
        targets: this.ghost2,
        loop: -1, // loop forever
        ease: 'Linear',
        duration: 2000,
        tweens: [
          {
              y: 201,
          },
          {
              y: 64,
          },
      ]
    });
}


moveUpDown2() {
  console.log('moveUpDown')
  this.tweens.timeline({
      targets: this.ghost3,
      loop: -1, // loop forever
      ease: 'Linear',
      duration: 2000,
      tweens: [
        {
            y: 65,
        },
        {
            y: 332,
        },
    ]
  });
}

moveUpDown3() {
  console.log('moveUpDown')
  this.tweens.timeline({
      targets: this.bat1,
      loop: -1, // loop forever
      ease: 'Linear',
      duration: 2000,
      tweens: [
        {
            y: 406,
        },
        {
            y: 569,
        },
    ]
  });
}




    world(player, tile) {
        console.log("world function");
        let playerPos = {};
        playerPos.x = 1164;
        playerPos.y = 460;
        playerPos.dir = "down";
    
        this.scene.start("world", {playerPos: playerPos});
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
   }
 

}
