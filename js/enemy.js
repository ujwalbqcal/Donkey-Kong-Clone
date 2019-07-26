let enemy_Image = new Image();
let pauline_Image = new Image();

enemy_Image.src = "./images/enemy-1.png";
pauline_Image.src = "./images/pauline.png";


const sprite_width_enemy = 502,
      sprite_height_enemy = 92,
      sprite_rows = 1,
      sprite_columns = 5,
      enemy_framecount = 5,
      sprite_width_pauline = 97,
      sprite_height_pauline = 27,
      sprite_rows_pauline = 1,
      sprite_columns_pauline = 4,
      pauline_framecount = 4;

let  enemy_single_width ,
    enemy_single_height,
    pauline_single_width ,
    pauline_single_height;

    enemy_Image.addEventListener('load', (e) => {
      enemy_single_width = sprite_width_enemy/sprite_columns;
      enemy_single_height = sprite_height_enemy/sprite_rows;
    });
    pauline_Image.addEventListener('load', (e) => {
      pauline_single_width = sprite_width_pauline/sprite_columns_pauline;
      pauline_single_height = sprite_height_pauline/sprite_rows_pauline;
    });

class ENEMY{
  constructor(positionX,positionY){
    this.positionX = positionX;
    this.positionY = positionY;
    this.index = 0;
    this.secondindex = 0;

    setInterval(() => {
     this.index++;
     if (this.index >= 5) {
       this.index = 0;
     }
   }, 1000)
   setInterval(() => {
    this.secondindex++;
    if (this.secondindex >= 4) {
      this.secondindex = 0;
    }
  }, 1000)
  }

  draw(){
    ctx.drawImage(enemy_Image, this.index * enemy_single_width,0, enemy_single_width, enemy_single_height, this.positionX, this.positionY, enemy_single_width, sprite_height_enemy);      // ctx.fillRect(this.positionX,this.positionY,this.width,this.height);

  }
  drawpauline(){
    ctx.drawImage(pauline_Image, this.secondindex * pauline_single_width,0, pauline_single_width, pauline_single_height, this.positionX, this.positionY, pauline_single_width, sprite_height_pauline);      // ctx.fillRect(this.positionX,this.positionY,this.width,this.height);

  }
}


let enemy = new ENEMY(80,28);
let pauline = new ENEMY(310,35);
