//Create variables here
var tony, tonyWantFood, tonyHappy, foodRef, foodStock, database, sky;

function preload() {
  //load images here
  tonyWantFood = loadImage("dogImg.png")
  tonyHappy = loadImage("dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  sky = createSprite(250, 200, 500, 400);
  sky.shapeColor=rgb(25, 217, 253);

  tony = createSprite(350, 350, 10, 10);
  tony.addImage(tonyWantFood);
  tony.scale = 0.35;

  foodStock = 20;

  foodRef = database.ref('food');
  foodRef.on("value", readStock)
}


function draw() {  
  background(0,154,22)

  if(keyWentDown(UP_ARROW)){
    write(foodStock);
    tony.addImage(tonyHappy);
  }

  drawSprites();
  //add styles here
  textSize(30);
  fill(255)
  text("Food left for Tony: " + foodStock, 100, 200);
  text("Press up arrow to feed hungry Tony", 15, 50);
}

function readStock(data){
  foodStock = data.val();
}

function write(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}
