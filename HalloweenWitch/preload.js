class preload extends Phaser.Scene {
  constructor() {
    super(
      "preload"
    );

    // Put global variable here
  }

    

  preload() {
    //heart
    this.load.image('heart', 'assets/heart.png');


    //sound
   
     this.load.audio('gameover', 'assets/gameoverbgm.mp3');
     this.load.audio('hit', 'assets/hitsound.wav');
     this.load.audio('win', 'assets/winbgm.wav');
     this.load.audio('collect', 'assets/collectsound.mp3');
     this.load.audio("bgmusic","assets/bgmusic.mp3");

    // intro
    this.load.image('intro', 'assets/introscene.png');


    //player
    this.load.atlas('left', 'assets/left.png', 'assets/left.json');
    this.load.atlas('right', 'assets/right.png', 'assets/right.json');
    this.load.atlas('down', 'assets/down.png', 'assets/down.json');
    this.load.atlas('up', 'assets/up.png', 'assets/up.json');

    //enemy
    this.load.atlas('batfront', 'assets/bat-front.png', 'assets/bat-front.json');
    this.load.atlas('batside', 'assets/bat-side.png', 'assets/bat-side.json');
    this.load.atlas('ghostfront', 'assets/ghost-front.png', 'assets/ghost-front.json');
    this.load.atlas('ghostside', 'assets/ghost-side.png', 'assets/ghost-side.json');


  }

  create() {
    console.log("*** preload scene");

    // window.music.stop();

    this.add.image(0,0,'intro').setOrigin(0,0);
    console.log("This is intro")

    this.anims.create({
      key: 'left',
      frames: [
        {key:'left',frame:'animation-07'},
        {key:'left',frame:'animation-05'},
        {key:'left',frame:'animation-08'},
        {key:'left',frame:'animation-06'},
      ],
      frameRate: 8,
      repeat: -1
  });

      this.anims.create({
      key: 'right',
      frames: [
        {key:'right',frame:'animation-01'},
        {key:'right',frame:'animation-02'},
        {key:'right',frame:'animation-03'},
        {key:'right',frame:'animation-04'},
      ],
      frameRate: 8,
      repeat: -1
  });

      this.anims.create({
      key: 'up',
      frames: [
        {key:'up',frame:'animation-13'},
        {key:'up',frame:'animation-14'},
        {key:'up',frame:'animation-15'},
        {key:'up',frame:'animation-16'},
      ],
      frameRate: 8,
      repeat: -1
  });

  this.anims.create({
    key: 'down',
    frames: [
      {key:'down',frame:'animation-09'},
      {key:'down',frame:'animation-10'},
      {key:'down',frame:'animation-11'},
      {key:'down',frame:'animation-12'},
    ],
    frameRate: 8,
    repeat: -1
})

// this.anims.create({
//   key: 'batfront',
//   frames: [
//     {key:'batfront',frame:'animation-17'},
//     {key:'batfront',frame:'animation-18'},
//     {key:'batfront',frame:'animation-19'},
//     {key:'batfront',frame:'animation-20'},
//   ],
//   frameRate: 8,
//   repeat: -1
// })

// this.anims.create({
//   key: 'batside',
//   frames: [
//     {key:'batside',frame:'animation-29'},
//     {key:'batside',frame:'animation-30'},
//     {key:'batside',frame:'animation-31'},
//     {key:'batside',frame:'animation-32'},
//   ],
//   frameRate: 8,
//   repeat: -1
// })

// this.anims.create({
//   key: 'ghostfront',
//   frames: [
//     {key:'ghostfront',frame:'animation-41'},
//     {key:'ghostfront',frame:'animation-42'},
//     {key:'ghostfront',frame:'animation-43'},
//     {key:'ghostfront',frame:'animation-44'},
//   ],
//   frameRate: 8,
//   repeat: -1
// })

// this.anims.create({
//   key: 'ghostside',
//   frames: [
//     {key:'ghostside',frame:'animation-33'},
//     {key:'ghostside',frame:'animation-34'},
//     {key:'ghostside',frame:'animation-35'},
//     {key:'ghostside',frame:'animation-36'},
//   ],
//   frameRate: 8,
//   repeat: -1
// })


    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");
    var key1 = this.input.keyboard.addKey(49);

    // On spacebar event, call the world scene
    // spaceDown.on(
    //   "down",
    //   function () {
    //     console.log("Jump to world scene");
    //     let playerPos = {};
    //     playerPos.x = 1108;
    //     playerPos.y = 1193;
    //     playerPos.dir = "up";
    
    //     this.scene.start("world", { playerPos: playerPos });
    //   },
    //   this
    // );

    spaceDown.on(
      "down",
      function () {
        console.log("Jump to storyline scene");
        this.scene.start( "storyline");
      },
      this
    );

    key1.on("down", function () {
      console.log("Jump to world scene");
      let playerPos = {};
      playerPos.x = 1108;
      playerPos.y = 1193;
      playerPos.dir = "up";
  
      this.scene.start("world", { playerPos: playerPos });
    },
    this
    );

    // Add any text in the main page
    // this.add.text(90, 600, "Press spacebar to continue", {
    //   font: "30px Courier",
    //   fill: "#FFFFFF",
    // });

    // Create all the game animations here
  }
}
