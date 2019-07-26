class PLATFORM {
  constructor(positionX, positionY, width = 35) {
    // this.width = 250;
    // this.height = 5;
    this.positionX = positionX;
    this.positionY = positionY;
    // this.platformangle = platformangle;
    this.width = width;
    this.platform_Image = new Image();
    this.platform_Image.src = 'images/Floor.png';

  }
  draw() {
    ctx.beginPath();
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
    var pattern = ctx.createPattern(this.platform_Image, "repeat-x");
    ctx.fillStyle = pattern;
    // ctx.fillStyle='green'
    ctx.save();
    ctx.translate(this.positionX, this.positionY);
    // ctx.rotate(Math.PI / 180 * this.platformangle);
    ctx.fillRect(0, 0, this.platform_Image.width * this.width, this.platform_Image.height);
    ctx.translate(-this.positionX, -this.positionY);
    ctx.restore();

  }
}


let platform = new PLATFORM(300, 60,  8);
let platformSix = new PLATFORM(40, 110);

let platformFive = new PLATFORM(40, 190);
let platformFour = new PLATFORM(50, 280, 33);
let platformOne = new PLATFORM(40, 370);
let platformTwo = new PLATFORM(50, 450,33);
let platformThree = new PLATFORM(40, 540);
let platformArray = [platform, platformSix, platformFive, platformFour, platformOne, platformTwo, platformThree];
