let canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d');

canvas.width = 650;
canvas.height = 600;
canvas.style.display = 'block';
canvas.style.margin = '0 auto';
// canvas.style.marginTop = 50 + 'px';
canvas.style.backgroundColor = 'black';

let generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const sprite_width = 264,
  sprite_height = 24,
  rows = 1,
  columns = 11,
  single_width = sprite_width / columns,
  single_height = sprite_height / rows,
  framecount = 11,
  SCORE_OFFSET = 100;

let trackRight = 0,
  trackLeft = 1,
  cutframe = 0,
  srcX = 0,
  srcY = 1,
  left = false,
  right = true,
  ismarioalive = true,
  ismariohammer = false,
  isGamePlaying ,
  isGameOver,
  speed = 3,
  score,
  gameclearance,
  highscore;

  let banner_Image = new Image();
  let orangebarrel_Image = new Image();
  let kong_Image = new Image();
  let hammer_Image = new Image();
  // let mariodead_Image = new Image();

  banner_Image.src = "./images/donkeykongbanner.png";
  orangebarrel_Image.src = "./images/Barrel0.png";
  kong_Image.src = "./images/DKGrin-1.png";
  hammer_Image.src = "./images/Hammermain.png";

  let walkingSound = new Audio('./sounds/walking2.wav'),
    startSound = new Audio('./sounds/theme.wav');
    collisionSound = new Audio('./sounds/death.wav');
  // mariodead_Image.src = "./images/mariodead.png";

let gameLoop = () => {
  gameclearance = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayScore();

    ladderArray.forEach((eachladder, index) => {

      eachladder.draw();
    })

    ladderArraynext.forEach((eachladdernext, index) => {
      eachladdernext.draw();
    })

    platformArray.forEach(( eachplatform, index) => {
      eachplatform.draw();
      // scoreCard(eachplatform);

    })
    hammerArray.forEach((eachhammer,index) =>{
      eachhammer.draw();
      hammerCollision(eachhammer);
    })

    marioPlayer.draw();
    enemy.draw();
    pauline.drawpauline();
    fireimage.draw();
    drumimage.draw();
    gameWon();

    for(let eachbluebarrel of barrelArraynext) {
      eachbluebarrel.updatebluebarrel();
      eachbluebarrel.draw();
      if(collisionDetectionBlue(eachbluebarrel) && !ismariohammer && !ismarioalive){
        setTimeout(()=>{
          clearInterval(gameclearance);
        },500)
          isGameOver = true;
      break;
    }
  }

    for(let eachbarrelladder of barrelArrayLadder) {
      eachbarrelladder.updatebarrelladder();
      eachbarrelladder.draw();
      if(collisionDetection(eachbarrelladder) && ! ismariohammer && !ismarioalive){
        setTimeout(()=>{
          clearInterval(gameclearance);
        },500)
          isGameOver = true;
      break;
    }

    }

  }, 1000 / 8);

}

let gameWon = ()=>{

  if(marioPlayer.positionY  <= 50){
afterGameWon();
score += 100; 
  }
}

let hammerCollision = (eachhammer)=>{
  let index = 0;

  if((marioPlayer.positionX < eachhammer.positionX + hammer_Image.width &&
     marioPlayer.positionX+ single_width >  eachhammer.positionX &&
     marioPlayer.positionY < eachhammer.positionY + hammer_Image.height &&
     marioPlayer.positionY + single_height > eachhammer.positionY )){
       index = hammerArray.indexOf(eachhammer);
       hammerArray.splice(index,1);

       ismariohammer = true;

       setTimeout(()=>{
         ismariohammer = false;

       },9000)
     }

}

let collisionDetection = (eachbarrelladder)=>{
  let index = 0;

  if(marioPlayer.positionX < eachbarrelladder.positionX + ladder_Image.width &&
     marioPlayer.positionX+ single_width >  eachbarrelladder.positionX &&
     marioPlayer.positionY < eachbarrelladder.positionY + ladder_Image.height &&
     marioPlayer.positionY + single_height > eachbarrelladder.positionY )
{
  if (localStorage.getItem('highscore') < score) {
      localStorage.setItem('highscore', score);
    }
    eachbarrelladder.isbarrelcollision = true;
    index = barrelArray.indexOf(eachbarrelladder);
    barrelArray.splice(index,1);
    if(barrelArray.splice){
      score += 10;
    }

  if(!ismariohammer){
    collisionSound.play();
    afterCollision();
  }
  if(ismariohammer)
  ismarioalive = true;
  return true;
}
return false;
}
let collisionDetectionBlue = (eachbluebarrel)=>{
  let index = 0;
  if(marioPlayer.positionX < eachbluebarrel.positionX + ladder_Image.width &&
        marioPlayer.positionX+ single_width >  eachbluebarrel.positionX &&
        marioPlayer.positionY < eachbluebarrel.positionY + ladder_Image.height &&
        marioPlayer.positionY + single_height > eachbluebarrel.positionY )
{
  if (localStorage.getItem('highscore') < score) {
      localStorage.setItem('highscore', score);
    }

    eachbluebarrel.isbarrelcollision = true;
    index = barrelArraynext.indexOf(eachbluebarrel);
    barrelArraynext.splice(index,1);
    if(barrelArray.splice){
      score += 10;
    }

  if(!ismariohammer){
    collisionSound.play();
    afterCollision();
  }
  if(ismariohammer)
  ismarioalive = true;
  return true;
}
return false;
}

let storeScore = [];
    score = 0;
// let scoreCard = (eachbarrelladder)=>{
//   if(eachbarrelladder.positionX + barrel_single_width > marioPlayer.positionX){
//     if(storeScore.indexOf(eachbarrelladder)){
//       storeScore.push(eachbarrelladder);
//     }
//     score = storeScore.length;
//   }
//
// }
let displayScore = ()=>{
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.font = "20px Arial";
  ctx.fillText("Score : " + score ,500,40);
  ctx.closePath();
}


let barrelArray = [];
let barrelArrayLadder = [];
let barrelArraynext = [];
let barrelpositionanimate,
verticalbarrelanimate;

let barrelAnimation = ()=>{
  barrelpositionanimate = setInterval(() => {
  barrelArrayLadder.push(new BARREL(180, 92));

  if (barrelArrayLadder.length > 10 ) {
    barrelArrayLadder.splice(0, 4);
  }
}, 4000);

verticalbarrelanimate = setInterval(() => {
  barrelArraynext.push(new BARREL(140, 100, blue_barrel_Image));
  if(barrelArraynext.length > 7){
    barrelArraynext.splice(0,1);
  }

}, 3000);
}

let afterCollision = ()=>{
  ismarioalive = false;

    setTimeout(()=>{
      stopGameCanvas();
      hammerArray = [new HAMMER(500,390),new HAMMER(80,310)];

    },3500);

  clearInterval(barrelpositionanimate);
  clearInterval(verticalbarrelanimate);

  window.cancelAnimationFrame(loop);
  barrelArrayLadder = [];
  barrelArraynext = [];
}

let afterGameWon = ()=>{
  setTimeout(()=>{
    gameWonCanvas();
    hammerArray = [new HAMMER(500,390),new HAMMER(80,310)];

  },2000);

  clearInterval(gameclearance);
  clearInterval(barrelpositionanimate);
  clearInterval(verticalbarrelanimate);

  window.cancelAnimationFrame(loop);
  barrelArrayLadder = [];
  barrelArraynext = [];

}

let updateAll = ()=>{
  marioPlayer.positionX = 150 ;
  marioPlayer.positionY = 517;
  score = 0;
}

let startGameCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  window.addEventListener('load', (e) => {
    startSound.play();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width,canvas.height);
    ctx.drawImage(banner_Image, canvas.width/2 - banner_Image.width/2 ,canvas.height / 2 - banner_Image.height / 2 - 200);
    ctx.drawImage(orangebarrel_Image, canvas.width/2 - banner_Image.width + 100 ,canvas.height / 2 - banner_Image.height / 2 );
    ctx.drawImage(orangebarrel_Image, canvas.width - 200 ,canvas.height / 2 - banner_Image.height / 2 );
    ctx.drawImage(kong_Image, canvas.width - kong_Image.width * 3.7 ,canvas.height / 2 - banner_Image.height / 2 );
    ctx.drawImage(hammer_Image, canvas.width - 430,canvas.height / 2 +  35 );

    ctx.save();
    ctx.font = '24px START GAME';
    ctx.fillStyle = 'red';

    ctx.strokeText(`START GAME`, canvas.width / 2  , canvas.height / 2);
    ctx.fillText(`START GAME`, canvas.width / 2 - 60  , canvas.height / 2 + 50);
    ctx.restore();

    ctx.save();
    ctx.font = '18px START GAME';
    ctx.fillStyle = 'white';
    ctx.fillText(`Press Enter.`, canvas.width / 2 -30  , canvas.height / 2 + 130);
    ctx.restore();
  })

  document.onkeypress = (e) => {
    if (e.keyCode == 13 && !isGamePlaying) {
      startGame();
      isGamePlaying = true;
    }
  }
}
let startGame = ()=>{
  startSound.pause();
  barrelAnimation();
  gameLoop();
}

let stopGameCanvas = () => {

    collisionSound.pause();
    startSound.play();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width,canvas.height);
    ctx.drawImage(kong_Image, canvas.width - kong_Image.width * 3.7 ,canvas.height / 2 - banner_Image.height);
    ctx.drawImage(hammer_Image, canvas.width / 2 - 70,canvas.height / 2 - 15 );

    ctx.save();
    ctx.font = '24px GAME GAME';
    ctx.fillStyle = 'green';
    ctx.strokeText(`GAME OVER`, canvas.width / 2   , canvas.height / 2 );
    ctx.fillText(`GAME OVER`, canvas.width / 2 - 60  , canvas.height / 2 - 80 );
    ctx.restore();

    ctx.save();
    ctx.font = '18px STOP GAME';
    ctx.fillStyle = 'white';
    ctx.fillText(`Scored : ` + score, canvas.width / 2 - 30   , canvas.height / 2 - 50);
    // ctx.fillText(`High Score : ${localStorage.getItem('highscore') || 0}`, canvas.width / 2 + 50   , canvas.height / 2 - 50);

    ctx.restore();

    ctx.save();
    ctx.font = '24px STOP GAME';
    ctx.fillStyle = 'red';

    ctx.strokeText(`RETRY`, canvas.width / 2   , canvas.height / 2);
    ctx.fillText(`RETRY`, canvas.width / 2 - 20  , canvas.height / 2 );
    ctx.restore();

    ctx.save();
    ctx.font = '18px STOP GAME';
    ctx.fillStyle = 'white';
    ctx.fillText(`Press Enter.`, canvas.width / 2 - 30  , canvas.height / 2 + 130);
    ctx.restore();


  document.onkeypress = (e) => {
    if (e.keyCode == 13 && isGameOver) {
      startGame();

      updateAll();
      isGameOver = false;
      ismarioalive = true;

    }
  }
}

let gameWonCanvas = () => {
  isGameOver = true;

    startSound.play();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width,canvas.height);
    ctx.drawImage(kong_Image, canvas.width - kong_Image.width * 3.7 ,canvas.height / 2 - banner_Image.height);
    ctx.drawImage(hammer_Image, canvas.width / 2 - 70,canvas.height / 2 - 15 );

    ctx.save();
    ctx.font = '24px YOU WON';
    ctx.fillStyle = 'green';
    ctx.strokeText(`YOU WON`, canvas.width / 2   , canvas.height / 2 );
    ctx.fillText(`YOU WON`, canvas.width / 2 - 60  , canvas.height / 2 - 80 );
    ctx.restore();

    ctx.save();
    ctx.font = '18px STOP GAME';
    ctx.fillStyle = 'white';
    ctx.fillText(`Scored : ` + score, canvas.width / 2 - 30   , canvas.height / 2 - 50);
    // ctx.fillText(`High Score : ${localStorage.getItem('highscore') || 0}`, canvas.width / 2 + 50   , canvas.height / 2 - 50);

    ctx.restore();

    ctx.save();
    ctx.font = '24px STOP GAME';
    ctx.fillStyle = 'red';

    ctx.strokeText(`REPLAY`, canvas.width / 2   , canvas.height / 2);
    ctx.fillText(`REPLAY`, canvas.width / 2 - 20  , canvas.height / 2 );
    ctx.restore();

    ctx.save();
    ctx.font = '18px STOP GAME';
    ctx.fillStyle = 'white';
    ctx.fillText(`Press Enter.`, canvas.width / 2 -30  , canvas.height / 2 + 130);
    ctx.restore();


  document.onkeypress = (e) => {
    if (e.keyCode == 13 && isGameOver) {
      startGame();
      // afterCollision();
      updateAll();
      // afterGameWon();

      isGameOver = false;
    }
  }
}

startGameCanvas();
