//create variables here
var dog,dogImg,happyDog,database,foodS,foodStock
var feed ,addFoods;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images
  dogImg=loadImage("dogImg.png")
  happyDog=loadImage("dogImg1.png")

}

function setup(){
      database = firebase.database()
      createCanvas(1000, 500);

  foodObj=new Food()
     
      dog=createSprite(800,220,150,150)
      dog.addImage(dogImg)
      dog.scale=0.20;

      feed=createButton("Feed the Dog")
      feed.position(700,95)
      feed.mousePressed(feedDog)
     
      addFood=createButton("Add Food")
      addFood.position(800,95)
      addFood.mousePressed(addFoods)

     var input=createInput("pet's name")
     input.position(1190,70)     
}

function draw() {  
      background("brown")
      
      fedTime=database.ref("FeedTime")
      fedTime.on("value",function(data){
        lastFed=data.val()
      })
drawSprites()
      fill("black")
      textSize(20)
       if(lastFed>=12){
        text("Last Feed : "+lastFed%12+"PM",350,30)
       }else if(lastFed==0){
         text("Last Feed : 12 AM",350,30)
       }else{
         text("Last Feed : "+lastFed+"AM",350,30)
       }
       
foodObj.display()
 }

function readStock(data)
 {
    foodS = data.val()
    foodObj.updateFoodStock(foodS)
 }

function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodObj.updateFoodStock(foodObj.getFoodStock()+1)
  foodStock++
  database.ref('/').update({
    Food:foodObj.getFoodStock()
  })
}