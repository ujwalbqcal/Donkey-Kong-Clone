let mario_Image = new Image();
let mariodead_Image = new Image();
let mariohammer_Image = new Image();

mariohammer_Image.src = './images/mariohammer.png';
mario_Image.src = './images/smallmariosheet-3.png';
mariodead_Image.src = './images/mariodead.png';

let GRAVITY = 1,
stopOffset = 2,
isplatform ;

const sprite_width_mario = 296,
      sprite_height_mario = 22,
      sprite_rows_mario = 1,
      sprite_columns_mario = 8,
      mario_framecount = 8;

      let  mario_single_width ,
          mario_single_height;

mariodead_Image.addEventListener('load', (e) => {
    mario_single_width = sprite_width_mario/sprite_columns_mario;
    mario_single_height = sprite_height_mario/sprite_rows_mario;
          });

const sprite_width_mariohammer = 148,
      sprite_height_mariohammer = 38,
      sprite_rows_mariohammer = 1,
      sprite_columns_mariohammer = 4,
      mariohammer_framecount = 4;

let  mariohammer_single_width ,
    mariohammer_single_height;

mariohammer_Image.addEventListener('load', (e) => {
      mariohammer_single_width = sprite_width_mariohammer/sprite_columns_mariohammer;
      mariohammer_single_height = sprite_height_mariohammer/sprite_rows_mariohammer;
            });


class MARIO{
  constructor(mario){

    this.positionX = mario.positionX;
    this.positionY = mario.positionY;
    this.velocityY = mario.velocityY;
    this.velocityX = mario.velocityX;
    this.jumping = true;
    this.ladder = true;
    this.indexmario = 0;
    this.indexmariohammer = 0;

    setInterval(() => {
     this.indexmario++;
     if (this.indexmario >= 8) {
       this.indexmario = 0;
     }
   }, 100)
   setInterval(() => {
    this.indexmariohammer++;
    if (this.indexmariohammer >= 4) {
      this.indexmariohammer = 0;
    }
  }, 100)
  }

  draw(){
    ctx.beginPath();
    if(ismarioalive && !ismariohammer )
    ctx.drawImage(mario_Image,srcX,srcY,single_width,single_height,this.positionX,this.positionY,single_width,single_height);
    if(!ismarioalive  ){
      ctx.drawImage(mariodead_Image, this.indexmario * mario_single_width,0, mario_single_width, mario_single_height, this.positionX, this.positionY, mario_single_width, sprite_height_mario);      // ctx.fillRect(this.positionX,this.positionY,this.width,this.height);

    }
    if(ismariohammer && ismarioalive ){
    ctx.drawImage(mariohammer_Image, this.indexmariohammer * mariohammer_single_width,0, mariohammer_single_width, mariohammer_single_height, this.positionX, this.positionY - 10, mariohammer_single_width , sprite_height_mariohammer );      // ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
  }
    ctx.closePath();
  }

  moveRight(eachplatform){
    updateFrame();
    left = false;
    this.positionX += 0.5;
  }

  moveLeft(){
    updateFrame();
    left = true;
    this.positionX -= speed;
  }


  moveUp(eachladder){
    this.index = 0;

    if((this.positionX + single_width +20  ) > eachladder.positionX && this.positionX < (eachladder.positionX + ladder_Image.width ) &&
     this.positionY< eachladder.positionY+100 && this.positionY+single_height>eachladder.positionY){
      this.index = ladderArray.indexOf(eachladder);
    }

    if((this.positionX + single_width  ) > ladderArray[this.index].positionX &&
     this.positionX < (ladderArray[this.index].positionX + ladder_Image.width -10) &&
     this.positionY + single_height > ladderArray[this.index].positionY ){
       GRAVITY = 0;
      stopOffset =18;
      this.positionY -= stopOffset;
    }
  }

    moveDown(eachladder){
      this.indexnext = 8;
      if((this.positionX + single_width +5  ) > eachladder.positionX && this.positionX < (eachladder.positionX + ladder_Image.width ) &&
       this.positionY + single_height < eachladder.positionY + ladder_Image.height   && this.positionY > eachladder.positionY  - 40 ){
        this.indexnext = ladderArray.indexOf(eachladder);
      }

        if((this.positionX + single_width  ) > ladderArray[this.indexnext].positionX && this.positionX < (ladderArray[this.indexnext].positionX + ladder_Image.width) &&
        this.positionY   > ladderArray[this.indexnext].positionY -80 ){

          stopOffset = 20;
          if(this.positionY  == 36 ){
            stopOffset = 0;
          }
        this.positionY += stopOffset;
      }
    }

    jump(eachplatform){
      this.index = 0;

      if((this.positionX + single_width +20  ) > eachplatform.positionX && this.positionX < (eachplatform.positionX + eachplatform.platform_Image.width * 32 ) &&
      this.positionY + single_height + 5< eachplatform.positionY + eachplatform.platform_Image.height   && this.positionY > eachplatform.positionY  - 40 ){
        this.index = platformArray.indexOf(eachplatform);
      }

      if((this.positionX + single_width +20  ) > platformArray[this.index].positionX && this.positionX < (platformArray[this.index].positionX + platformArray[this.index].platform_Image.width * 35 ) &&
      this.positionY + single_height < platformArray[this.index].positionY + platformArray[this.index].platform_Image.height   && this.positionY > platformArray[this.index].positionY  - 100 ){

        this.jumping = false;
        this.positionY = platformArray[this.index].positionY - single_height;
        this.velocityY = 0;
        GRAVITY =2  ;
        stopOffset = 2;

      }
    }
  }

updateFrame = ()=>{
  ctx.clearRect(0,0,single_width,single_height);

  cutframe = ++cutframe % framecount;
  srcX = cutframe * single_width;

  if(left && this.positionX > 0 ){
  		srcY = trackLeft * single_height;
  				}
  if(right && this.positionX<canvas.width-single_width){
  		srcY = trackRight * single_height;
  				}
}

let marioTrait = {
  positionX : 150,
  positionY : 517,
  velocityY : 0,
  velocityX : 0,
  jumping :true,
};

let marioPlayer = new MARIO(marioTrait);

// marioPlayer.draw();

controller = {
  keyListener:function(event) {

  const key_state = (event.type == "keydown")?true:false;

  switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 65:
      controller.left = key_state;
      case 32:// up key
        controller.jump = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;
      case 68:
      controller.right = key_state;
      break;
      case 38:
      controller.moveUp = key_state;
      break;
      case 40:
      controller.moveDown = key_state;
      break;

    }
}
};

loop = function() {

  if (controller.jump && marioPlayer.jumping == false) {

    marioPlayer.velocityY -= 20;
    marioPlayer.jumping = true;
    // marioPlayer.velocityY += 1.5;
  }

  if (controller.left ) {
    marioPlayer.moveLeft();
    walkingSound.play();

  }

  if (controller.right) {
    platformArray.forEach((eachplatform,index)=>{
      marioPlayer.moveRight(eachplatform);
      walkingSound.play();


    })
  }

  if(controller.moveUp){
    ladderArray.forEach((eachladder,index)=>{
      marioPlayer.moveUp(eachladder);
      walkingSound.play();

    })
  }

  if(controller.moveDown){
    ladderArray.forEach((eachladder,index)=>{
      marioPlayer.moveDown(eachladder);
      walkingSound.play();

    })
  }

  marioPlayer.velocityY += GRAVITY ;// gravity
  marioPlayer.positionX += marioPlayer.velocityX;
  marioPlayer.positionY += marioPlayer.velocityY;
  marioPlayer.velocityX *= 0.9;// friction
  marioPlayer.velocityY *= 0.9;// friction

  platformArray.forEach((eachplatform,index)=>{
    marioPlayer.jump(eachplatform);
  })

  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
