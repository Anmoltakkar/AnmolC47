var score =0, life = 5;
var bg,bow,arrow;
var blueBalloon,blueBalloonImg,greenBalloon,greenBalloonImg,redBalloon,redBalloonImg,pinkBalloon,pinkBalloonImg;
var balloon,balloonGrp,bird,birdImg,boomImg,arrowGrp,birdGrp,birdSound,balloonSound,start,end,startImg,endImg,bg;


var gameState="start"

function preload(){
bgImg  = loadImage("assets/bgEdit.png")
bowImg = loadImage("assets/bow.png")
arrowImg = loadImage("assets/arrow edit.png")
blueBalloonImg = loadImage("assets/blue balloon.png")
greenBalloonImg = loadImage("assets/green balloon.png")
redBalloonImg = loadImage("assets/red balloon.png")
pinkBalloonImg = loadImage("assets/pink balloon.png")
birdImg = loadImage("assets/bird.png")
boomImg = loadImage("assets/boom.png")
redBird = loadImage("assets/redBird.png")
birdSound = loadSound("assets/bird.wav")
balloonSound = loadSound("assets/balloonPop.mp3")
startImg  = loadImage("assets/start.png")
endImg = loadImage("assets/end.png")
}
function setup() {
  createCanvas(850, 470);
  
  balloonGrp = new Group();
  arrowGrp = new Group();
  birdGrp = new Group();

  bg = createSprite(415,230,1000,500)
  bg.addImage("bg",startImg)
  bg.scale = 1.7
  
  bow = createSprite(50,250,20,20)
  bow.visible = false
  bow.addImage(bowImg)
  bow.scale = 0.4
  
    
  
}

function draw() {
     background("green");

  



  if(gameState === "start" && keyDown("space")){
    gameState="play"
  }



  if(gameState === "play"){
    bg.addImage("bg",bgImg)
    ///bg.scale = 1.7

    bow.visible = true
    bow.y = World.mouseY

    if(keyDown("space") && frameCount%60 === 0 ) {
      arrow = createSprite(bow.x,bow.y,10,10)
      arrow.addImage(arrowImg)
      arrow.velocityX = 10
      arrowGrp.add(arrow)
    }

    textSize(45)
    fill("red")
    stroke("black")
    text("Score: "+score,30,50)
    text("Life: "+life,700,50)
     
     spawnBow();
     spawnBalloon();
     spawnBird();
  
      if(arrowGrp.isTouching(balloonGrp)){
        score = score+5
        balloon.addImage(boomImg)
        balloon.scale = 0.3
        balloon.velocityY = 0;
        balloon.lifetime = 4;
        arrowGrp.destroyEach();
        balloonSound.play();
      }
  
      if(arrowGrp.isTouching(birdGrp)){
        life = life -1
        birdGrp.destroyEach();
        console.log(life)
        birdSound.play()
    }
  
  }


  if(gameState === "play" && life ===0){
    gameState = "end"
  }


  if(gameState === "end"){
    end = createSprite(425,230,1000,500)
    end.addImage(endImg)
  }


      drawSprites();
    }  


      function spawnBalloon(){
        
        if(frameCount%190===0){
        balloon = createSprite(random(700,830),random(550,700),50,50)
        balloon.scale = 0.5
        balloon.velocityY =random(-6,-2)

          var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: balloon.addImage(greenBalloonImg);
              break;
      case 2: balloon.addImage(redBalloonImg);
              break;
      case 3: balloon.addImage(blueBalloonImg);
              break;
      case 4: balloon.addImage(pinkBalloonImg);
              break;
      default: break;
    }
    balloonGrp.add(balloon)
        }
        
      }

      function spawnBird(){
        if(frameCount%350===0){
         bird = createSprite(950,random(50,450))
         bird.addImage(birdImg)
         bird.scale = 0.35
         bird.velocityX = random(-6,-3)
         if(bird.y <= 250){
           bird.velocityY = 2
         }
         else{
           bird.velocityY = -2
         }

         var rand1 = Math.round(random(1,4));
         switch(rand1) {
           case 1: bird.addImage(birdImg);
                   break;
           case 2: bird.addImage(redBird);
                   break;
                   default: break;
           }
         birdGrp.add(bird)
        }
      }

      function spawnBow(){
        bow.visible = true

      
      }

     
      

      
    
  