let hammermario_Image = new Image();
hammermario_Image.src = "./images/Hammer.png";

class HAMMER{
  constructor(positionX,positionY){
    this.positionX = positionX;
    this.positionY = positionY;

  }

  draw(){
    ctx.beginPath();
    ctx.drawImage(hammermario_Image,this.positionX,this.positionY);
    ctx.closePath();
    }
}

let hammerone = new HAMMER(500,390);
let hammertwo = new HAMMER(80,310);
let hammerthree = new HAMMER(540,210);

let hammerArray = [hammerone,hammertwo,hammerthree];
