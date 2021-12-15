class winscene extends Phaser.Scene {
    constructor() {
      super(
        "winscene"
      );
  
      // Put global variable here
    }
  
      
  
    preload() {
      // intro
      this.load.image('win1', 'assets/win1.png');
  
    }
  
    create() {
        console.log("*** win");

        window.heart=3

        window.music.stop();

        this.music = this.sound.add("win", {
       loop: true,
       }).setVolume(0.3);this.music.play();

    // Add image and detect spacebar keypress

    this.add.image(0, 0, 'win1').setOrigin(0, 0);

  
    
    
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
            console.log("Jump to preload");
            this.scene.start( "preload");
            this.music.stop();
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