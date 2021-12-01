class gameover extends Phaser.Scene {
    constructor() {
      super(
        "gameover"
      );
  
      // Put global variable here
    }
  
      
  
    preload() {
      // intro
      this.load.image('gameover', 'assets/gameover.png');
  
    }
  
    create() {
        console.log("*** gameover");
    
        this.add.image(0,0,'gameover').setOrigin(0,0);
        console.log("This is gameover")
  
    
    
        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume
    
        //this.music.play()
        //window.music = this.music
  
    
        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey("SPACE");
    
        // On spacebar event, call the world scene
        spaceDown.on(
          "down",
          function () {
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