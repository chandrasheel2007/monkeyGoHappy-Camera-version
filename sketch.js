var monkey, bananagrp, bg, invground, obs, stonegrp, monkeycol, speed, speed1, speed2;

var monkeyimg, bananaimg, bgimg, obsimg, collided;

var score, gamestate, PLAY, END, INITIAL, col;

var s, z;

var bg_grp, grp, speedgrp;

var check=0;




function preload() {

  monkeyimg = loadAnimation("images/Monkey_01.png", "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png", "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png");

  bgimg = loadImage("images/jungle.jpg");

  bananaimg = loadImage("images/banana.png");

  obsimg = loadImage("images/stone.png");
  
  collided = loadAnimation("images/Monkey_05.png", "images/Monkey_05.png");

  s = loadImage("images/S.png");
  

}

function setup() {
  createCanvas(displayWidth, displayHeight-143);
  

  //camera.position.x=width/2-500;
  gamestate=0;
  PLAY=1;
  END=2;
  INITIAL=0;

  score=0;

  //groups for obstacle and bananas
  bananagrp = createGroup();
  stonegrp = createGroup();
  bg_grp = createGroup();
  speedgrp = createGroup();

  

  monkey = createSprite(width/2-500, height-170);
  monkey.addAnimation('collided', collided);
  monkey.addAnimation('animation', monkeyimg);
  monkey.scale=0.4;
  monkey.depth=2;
  monkey.visible=false;

  invground = createSprite(width/2, height-30, width, 1);
  invground.visible=false;
  
  
  
}

function draw() {
  background(220);
  
  //
  //GAMESTATE PLAY
  //
  if(gamestate===PLAY){

    speedgrp.setLifetimeEach(300);

    monkey.changeAnimation('animation', monkeyimg);

    
      monkey.visible=true;

     
        camera.position.x+=25;
      

      score = score + Math.round((getFrameRate() / 30));
      
    if(keyWentDown("space") && monkey.collide(invground)){
      monkey.velocityY = -80;
    }

    invground.x=camera.position.x;

    repeatImage();
  
    addObstacles();

    addBananas();

    if(bananagrp.isTouching(monkey)){
      bananagrp.destroyEach();
      score+=50;
    }

     if(stonegrp.isTouching(monkey)){
       stonegrp.destroyEach();
       gamestate=END;
     }

    }
  //
  //GAMESTATE END
  //
  if(gamestate===END){
    bananagrp.setLifetimeEach(-1);
    stonegrp.setLifetimeEach(-1);
    monkey.changeAnimation('collided', collided);
    imageMode(CENTER);
    image(bgimg, camera.position.x, height/2-200, 998*3, 766*3);
  }
   
     

  monkey.collide(invground);

  //gravity
  monkey.velocityY = monkey.velocityY + 4;

  monkey.x=camera.position.x-400;

  
 

  drawSprites();

  if(gamestate===PLAY||gamestate===END){
    push();
    fill(250);
    stroke(0);
    strokeWeight(2);
    textAlign(CENTER);
    textSize(35);
    text("Score: "+ score, camera.position.x-850, 50);
    pop();
  }

  //
  //GAMESTATE INITIAL
  //
  if(gamestate===INITIAL){

    imageMode(CENTER);
    image(bgimg, camera.position.x, height/2-200, 998*3, 766*3);

    

    monkey.visible=false;
    bananagrp.destroyEach();
    stonegrp.destroyEach();
    push();
    fill(250);
    stroke(0);
    strokeWeight(2);
    textAlign(CENTER);
    textSize(35);
    push();
    textSize(40);
    fill(0);
    stroke(255);
    text("🐵🐵 Monkey-Go-Happy 🐵🐵", camera.position.x, 50);
    pop();

    text("🐵 Use your Space Button to Jump 🐵", camera.position.x, height/5 );
    text("🐵 Avoid Hitting obstacles 🐵", camera.position.x, height/5+height/5);
    text("🐵 Collect the Bananas for extra points 🐵", camera.position.x, height/5+height/5+height/5);
    text("🐵 Press ⬜ to Start the Game 🐵", camera.position.x, height/5+height/5+height/5+height/5);

    imageMode(CENTER);
    image(s, camera.position.x-92.5, height/5+height/5+height/5+height/5-13, 50, 50);

    pop();

    if(gamestate===INITIAL&&keyDown('s')){
      score=0;
      gamestate=PLAY;
      camera.position.x=960;
    }

  }

  if(gamestate===END){
    
    fill(250);
    stroke(0);
    strokeWeight(2);
    textAlign(CENTER);
    textSize(35);
    text("GAME OVER!", camera.position.x, height/2);
    text("Press R to Restart", camera.position.x, height/2+100);
    
    
    if(gamestate===END&&keyWentDown('r')){
      gamestate=INITIAL;
      
    }
    
  }
  
}

function repeatImage(){
  
  if(check===0){
  speed = createSprite(width/2+100, height/2-200);
  speed.addImage('bgimg', bgimg);
  speed.scale=3;
  speed.depth=monkey.depth-3;
  speedgrp.add(speed);
  

  speed1 = createSprite(3990, height/2-200);
  speed1.addImage('bgimg', bgimg);
  speed1.scale=3;
  speed1.depth=monkey.depth-3;
  speedgrp.add(speed1);

  speed2 = createSprite(4500, height/2-200);
  speed2.addImage('bgimg', bgimg);
  speed2.scale=3;
  speed2.depth=monkey.depth-3;
  speedgrp.add(speed2);

  check=2;
 
  }
  
  

  if(frameCount%119===0){
  grp = createSprite(camera.position.x+displayWidth*2, height/2-200);
  grp.addImage('image', bgimg);
  grp.scale=3;
  grp.depth=monkey.depth-2;
  bg_grp.add(grp);
  bg_grp.setLifetimeEach(300);

  }
}

function addObstacles(){
  if(frameCount%110===0){
    
      z = createSprite(random(camera.position.x+width/2, camera.position.x+width), 820);
      z.addImage('obs', obsimg);
      z.scale=0.5;
      z.depth=monkey.depth-1;
      z.lifetime=200;
      stonegrp.add(z);
      
      

      
    }
  }

  function addBananas(){
    if(frameCount%110===0){
      
        var z = createSprite(random(camera.position.x+width/2, camera.position.x+width), random(300, 700));
        z.addImage('obs', bananaimg);
        z.scale=0.2;
        z.depth=monkey.depth-1;
        z.lifetime=200;
        bananagrp.add(z);
        
        
  
        
      }
    }

