var database;
var dog,sadDog,happyDog;
var foodS,foodStock;
var fedTime,lastFed;
var foodObj;
var milk,milkImage;
var input,play,name,feed,addFood;



function preload(){

  sadDog=loadImage("Dog.png");
  happyDog=loadImage("Happy dog.png");
  milkImage=loadImage("Milk.png");
}



function setup() {

  //updating firebase's database with "database"
  database = firebase.database();

  //create drawing area
  createCanvas(1345, 601);

  //create foodObj
  foodObj = new Food();

  //foodstock will read stock
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  //create dog
  dog=createSprite(1090,320,10,10);
  dog.addImage(sadDog);
  dog.scale=0.30;
  
   //create input for typing dog's name
   input = createInput("Dog Name");
   input.position(610,70);
 
   //create play button 
   play = createButton("Play");
   play.position(665,100);
   play.mousePressed(function(){
 
   var name = input.value();
   database.ref("/").update({Name:name});  
 
   //create button for Add Food
   addFood=createButton("Add Food");
   addFood.position(590,130);
   addFood.mousePressed(addFoods);
 
   //create button for Feed and display dog's name
   feed=createButton("Feed " + name);
   feed.position(710,130);
   feed.mousePressed(feedDog);  
   })

   //create milk 
   milk = createSprite(1010,385,90,90);
   milk.addImage("milk",milkImage);
   milk.scale = 0.1;
   milk.visible = false;

}



function draw() {

  background(30,200,200);

  foodObj.display();

  //read lastFed time from database
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  //text lastFed 
  fill("gold");
  stroke("gold");
  textSize(30);
  textFont("Bradley Hand ITC");
  if(lastFed >= 12){
    text("Last Feed : "+ lastFed % 12 + " PM", 580,30);
   }else if(lastFed == 0){
     text("Last Feed : 12 AM",580,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 580,30);
   }
 
  drawSprites();
}



//function to read food Stock
function readStock(data){

  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}



//function to update food stock and last fed time
function feedDog(){

  dog.addImage(happyDog);
  milk.visible = true;
  
  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



//function to add food in stock
function addFoods(){

  dog.addImage(sadDog);
  milk.visible = false;
  foodS++;

  database.ref('/').update({
    Food:foodS
  })
}