var c = document.getElementById("snakeboard");
var ctx = c.getContext("2d");
var dx = 10;
var dy = 0;
var food;
var skipPop = 0;
var score = 0;
let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
  ]
  RandomFood();
  main();
  document.addEventListener("keydown",changeDirection);
function main() {
    if(check_if_game_ended()){
        alert("U lost");
        location.reload();
    }
    if(got_to_food()){
        RandomFood();
        addScore();
    }
    setTimeout(function onTick() {
    clearCanvas();
    moveSnake();
    drawFood();
    drawSnake();
    main();
    }, 300);
}


function drawSnake(){
    ctx.beginPath();
    for(var i = 0; i < snake.length; ++i){
        ctx.rect(snake[i].x,snake[i].y,10,10);
        ctx.stroke();
    }
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if(skipPop == 0){
    snake.pop()
    }
    skipPop = 0;
}

function clearCanvas(){
    ctx.clearRect(0,0, 400,400);
}

function changeDirection(event){
    var left_key = 37;
    var right_key = 39;
    var down_key = 40;
    var up_key  = 38;

    const pressedKey = event.keyCode;
    const goingleft = dx === -10;
    const goingright = dx === 10;
    const goingdown = dy === 10;
    const goingup = dy === 10;

    if(pressedKey === left_key && !goingright){
        dx = -10;
        dy = 0;
    }

    if(pressedKey === right_key && !goingleft){
        dx = 10;
        dy = 0;
    }

    if(pressedKey === down_key && !goingup){
        dx = 0;
        dy = 10;
    }

    if(pressedKey === up_key && !goingdown){
        dx = 0;
        dy = -10;
    }
}

function check_if_game_ended(){
    for(var i = 4; i < snake.length; ++i){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            return true;
        }
    }
    

    if(snake[0].x < 0 + 10){
        return true;
    }
    if(snake[0].x > 400 - 10){
        return true;
    }
    if(snake[0].y < 0 + 10){
        return true;
    }
    if(snake[0].y > 400 - 10) {
        return true;
    }
}

function RandomFood(){
   var food2 = Math.floor(Math.random()* 39) + 1;
    food = food2 * 10;
}

function drawFood(){
    ctx.rect(food,food,10,10);
    ctx.stroke();
}

function got_to_food(){
    if(snake[0].x == food && snake[0].y == food){
    skipPop = 1;
    return true;
    }
}

function addScore(){
    score+= 10;
    document.getElementById("score").innerHTML = score;
}