//board
var blocksize = 25;
//20 square
var rows = 20;
//20 squares
var columns = 20;
var board;
var context; //drawing object

//Snake head, where the snake will start
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

//Give snake speed, to move
var velocityX = 0;
var velocityY = 0;

//Snake body
var snakeBody = [];

//Snake food
var foodX;
var foodY;

//When is the game over
var gameOver = false;

//When Page Loads
window.onload = function(){
    //get the board
    board = document.getElementById("board");
    //set the heigth
    board.height = rows * blocksize;
    //set the width
    board.width = columns * blocksize;
    //drawing on the board
    context = board.getContext("2d");

    //place snake food on canvas
    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update the board
    //update();
    //Running the update function 10 times a second
    setInterval(update, 1000/10);//100 milliseconds update function will run
}

function update(){
    //when the game is over
    if(gameOver){
        return;
    }
    //Change color of pen to black
    context.fillStyle = "black";
    //Fill the canvas
    //filling with the width and heigth of 500(20*25), which is 500px
    context.fillRect(0, 0, board.width, board.height);

    //Color of snake food
    context.fillStyle = "Red";
    //Location of snake food on canvas at coordinates {10; 10}
    context.fillRect(foodX, foodY, blocksize, blocksize);

    //Snake colliding or eating the food
    //check if snake collided with food, the x and y coordinates
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood();
    }
    //starting from the end of the tail, moving each snake segment to move to the next segment
    for (let i = snakeBody.length -1; i > 0; i--) {
       snakeBody[i] = snakeBody[i-1];
    }
    //update the secon segment to the location of the head
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //Color of snake
    context.fillStyle = "Lime";
    //update snake location when direction in clicked
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    //location of snake on canvas at coordinates {5; 5}
    context.fillRect(snakeX, snakeY, blocksize, blocksize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    //game over conditiions
    if (snakeX < 0 || snakeY > columns*blocksize || snakeY < 0 || snakeY > rows*blocksize ) {
        gameOver = true;
        alert("GAME OVER!");
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("GAME OVER!");
        }
    }
}

function changeDirection(e){
   //kepUp will wait for user to click on button (up, down, left or right) 

   //change snake speed/velocity
   //snake can not move in the reverse direction of the current direction
   if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
   }
   else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
   }
   else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}


//Randomise Snake food
function placeFood(){
    //place on x-coordinate
    foodX = Math.floor(Math.random() * columns) * blocksize;
    //place on y-coordinate
    foodY = Math.floor(Math.random() * rows) * blocksize;
}