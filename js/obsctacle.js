let fire_Image = new Image();
let drum_Image = new Image();
fire_Image.src = "./images/fire.png";
drum_Image.src = "./images/drum-1.png";

let  fire_single_width ,
    fire_single_height,
    image_columns = 2,
    image_rows = 1,
    sprite_width_fire = 43 ,
    sprite_height_fire = 23;

    fire_Image.addEventListener('load', (e) => {
      fire_single_width = sprite_width_fire/image_columns;
      fire_single_height = sprite_height_fire/image_rows;
    });

class FIRE{
  constructor(positionX,positionY){
    this.positionX = positionX;
    this.positionY = positionY;

    this.index = 0;

    setInterval(() => {
     this.index++;
     if (this.index >= 2) {
       this.index = 0;
     }
   }, 1000)
  }
  draw(){
    ctx.drawImage(fire_Image, this.index * fire_single_width,0, fire_single_width, fire_single_height, this.positionX, this.positionY, fire_single_width, sprite_height_fire);      // ctx.fillRect(this.positionX,this.positionY,this.width,this.height);
  }
}

let fireimage = new FIRE(87,500);

class DRUM{
  constructor(positionX,positionY){
    this.positionX = positionX;
    this.positionY = positionY;
}
  draw(){
    ctx.drawImage(drum_Image,this.positionX,this.positionY);
  }
}
let drumimage = new DRUM(90,520);
