class Food {

    constructor(){

      this.foodStock = 0;
      this.lastFed;
      this.image = loadImage('Milk.png');
    }


    //update foodStock from database
   updateFoodStock(foodStock){
    this.foodStock = foodStock;
   }


   //getFedTime from lastFed
   getFedTime(lastFed){
     this.lastFed = lastFed;
   }


   //reduce the food
   deductFood(){
     if(this.foodStock > 0){
      this.foodStock = this.foodStock - 1;
     }
    }


    //read data from database
    getFoodStock(){
      return this.foodStock;
    }

    
    display(){

      var x=80,y=100;
            
      //display foodStock in +50 display bottles in groups of 10
      if(this.foodStock != 0){
        for(var f=0; f < this.foodStock; f++){
          if(f % 10 == 0){
            x = 80;
            y = y + 50;
          }
          image(this.image,x,y,50,50);
          x = x + 30;
        }
      }
    }
}
