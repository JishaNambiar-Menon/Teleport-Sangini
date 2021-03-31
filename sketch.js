//clear gamestates
//add npcs
//score/feedback/counter of keys
//clear canvas size changes
//welcome + end screen
var forest, forestIMG, forestIMG2;
var claire, claireIMG;
var mallow, catIMG;
var invisibleGround, invisibleGround2;
var invisiWall1, invisiWall2;
var magicKey, keyIMG;
var keyCounter = 0;

var gameState = 0;
// 0 = forest
//1 = cliffs
//2 = ??

function preload(){
  forestIMG = loadImage('images/forest2.png');
  cliffsIMG2 = loadImage('images/cliffs1.png');
  castleIMG = loadImage('images/castle1.png');
  welcomeScreenIMG = loadImage('images/welcome.PNG');
  endgameIMG = loadImage('images/gameover.jpg');

  claireIMG = loadImage('images/claire.PNG');
  catIMG = loadImage('images/cat.PNG');
  keyIMG = loadImage('images/key.png');
}

function setup() {
  createCanvas(600,300);

  forest = createSprite(600, 200, 1200, 400);
  forest.addImage('forest', forestIMG);
  //forest.velocityX = -1;
  forest.scale = 0.8;

  claire = createSprite(200, 200, 100, 50);
  claire.addImage('main protagonist', claireIMG);
  claire.scale = 0.06;
  //claire.velocityX = forest.velocityX;

  mallow = createSprite(180, 200, 50, 50);
  mallow.addImage('main cat', catIMG);
  mallow.scale = 0.08;
  //mallow.velocityX = forest.velocityX;

  magicKey = createSprite(1600, 500, 50, 50);
  magicKey.addImage('key', keyIMG);
  magicKey.scale = 0.1;
  //magicKey.velocityX = forest.velocityX;

  invisibleGround = createSprite(500, 300, 1500, 50);
  invisibleGround.visible = false;
  //invisibleGround.velocityX = forest.velocityX;

  invisibleGround2 = createSprite(forest.x+50, forest.y, 400, 50);
  //invisibleGround2.velocityX = forest.velocityX;
  invisibleGround2.visible = false;

  //670, 500
  invisiWall1 = createSprite(670, 500, 50, 200);
  //invisiWall1.velocityX = forest.velocityX;
  invisiWall1.visible = false;

  invisiWall2 = createSprite(1030, 500, 50, 200);
  //invisiWall2.velocityX = forest.velocityX;
  invisiWall2.visible = false;
}

function draw() {
  background('white'); 

  camera.position.x = claire.x;
  mallow.x = claire.x-35;
  mallow.y = claire.y + 30;
  //camera.position.y = claire.y;

  if(gameState == 0){
    //canvas = createCanvas(1600,800);
    forest.addImage('welcome', welcomeScreenIMG);
    forest.changeImage('welcome', welcomeScreenIMG);
    claire.visible = false;
    mallow.visible = false;
    magicKey.visible = false;

    forest.velocityX = 0;
    /*invisibleGround.velocityX = forest.velocityX;
    invisibleGround2.velocityX = forest.velocityX;
    invisiWall1.velocityX = forest.velocityX;
    invisiWall2.velocityX = forest.velocityX;*/

    textSize(30);
    fill('blue');
    e = text('PRESS SPACE TO PLAY', 600, 700);

    if(keyDown('SPACE')){
      gameState = 1;
      claire.visible = true;
      mallow.visible = true;
      magicKey.visible = true;
      forest.addImage('lvl 1', forestIMG);
      forest.changeImage('lvl 1', forestIMG);

    drawSprites();
  }

  }
  
  else if(gameState == 1){
    //canvas = createCanvas(1500,800);

    spawnObstacle()
    console.log(forest.x);
    //setTimeout(endGame, 10000);
    claire.velocityX += 0.01;
    /*if(forest.x<0){
      forest.x = forest.width/2;
    }*/

    if(camera.position.x + canvas.width/2 > forest.x + forest.width/2 ){
      forest.x = camera.position.x;
      invisibleGround.x = camera.position.x;
    }

    invisibleGround2.velocityX = forest.velocityX;
    invisiWall1.velocityX = forest.velocityX;
    invisiWall2.velocityX = forest.velocityX;

    //magicKey.x = 1000;
    magicKey.velocityX = forest.velocityX;
    if(claire.isTouching(magicKey)){
      forest.addImage('other background', cliffsIMG2);
      forest.changeImage('other background', cliffsIMG2);
      forest.scale = 1.2;

      claire.x = 200;
      mallow.x = 140;
      gameState = gameState + 1;
      keyCounter = keyCounter + 1;
      //canvas size has to change
      //claire + mallow x and y changes
      //scale changes
      //change animation

      invisibleGround2.destroy();
      invisiWall1.destroy();
      invisiWall2.destroy();
    }

    drawSprites();
  }

  else if(gameState == 2){
    //canvas = createCanvas(2600,800);
    //forest.velocityX = -1;
    invisibleGround2.velocityX = forest.velocityX;
    invisiWall1.velocityX = forest.velocityX;
    invisiWall2.velocityX = forest.velocityX;

    if(claire.isTouching(magicKey)){
      forest.addImage('other other background', castleIMG);
      forest.changeImage('other other background', castleIMG);
      forest.scale = 1.2;
      

      claire.x = 200;
      mallow.x = 140;
      gameState = gameState + 1;
      keyCounter = keyCounter + 1;
      //canvas size has to change
      //claire + mallow x and y changes
      //scale changes
      //change animation
    }

    drawSprites();
  }

  else if(gameState == 3){
   // canvas = createCanvas(2600,800);
    //forest.velocityX = -1;

    if(claire.isTouching(magicKey)){
      forest.addImage('end background', endgameIMG);
      forest.changeImage('end background', endgameIMG);
      forest.scale = 2;
      forest.velocityX = 0;
      claire.visible = false;
      mallow.visible = false;
      gameState = gameState + 1;
      keyCounter = keyCounter + 1;
      //canvas size has to change
      //claire + mallow x and y changes
      //scale changes
      //change animation
    }

    drawSprites();
  }

  else if(gameState > 3){
    forest.velocityX = 0;
    forest.addImage('end background', endgameIMG);
    forest.changeImage('end background', endgameIMG);
    claire.destroy();
    mallow.destroy();
    magicKey.destroy();

    drawSprites();
  }

  if(forest.x < 400){
    forest.x = forest.width/2;
  }

  if(keyDown(RIGHT_ARROW)){
    claire.x = claire.x + 10;
    mallow.x = mallow.x + 10;
  }

  if(keyDown(LEFT_ARROW)){
    claire.x = claire.x - 10;
    mallow.x = mallow.x - 10;
  }

  if(keyDown(UP_ARROW)){
    claire.velocityY = - 10;
    mallow.velocityY = claire.velocityY;
  }
  claire.velocityY = claire.velocityY + 0.5;
  mallow.velocityY = claire.velocityY;

  claire.collide(invisibleGround);
  mallow.collide(invisibleGround);
  magicKey.collide(invisibleGround);

  claire.collide(invisibleGround2);
  mallow.collide(invisibleGround2);

  claire.collide(invisiWall1);
  mallow.collide(invisiWall1);

  claire.collide(invisiWall2);
  mallow.collide(invisiWall2);

  drawSprites();

  textSize(20);
  fill('white');
  text(mouseX + ', ' + mouseY, 50, 50);

  textSize(18);
  fill('black');
  text('Amount of Keys: ' + keyCounter, 50, 80);
}

function endGame(){
  text("TIME OUT! You couldn't complete the level in time :(", 50, 500);
  console.log('inside endgame');
}

function spawnObstacle() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(camera.position.x + canvas.width/2,100,40,10);
    cloud.y = Math.round(random(10,60));
    //cloud.addImage(cloudImage);
    //cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   //cloudsGroup.add(cloud);
    }
}
