var w = window.innerWidth-100;
var h = window.innerHeight-100;

document.querySelector('#canvas').width = w;
document.querySelector('#canvas').height = h;
var c = document.querySelector('#canvas').getContext('2d');
var snake = [250250, 250300, 250350, 250400, 250450, 250500];
var head = snake.length - 1;
var d = -50000; // direction:- down: 50; up: -50; right: 50000; left: -50000;
var r = 25;
var food = 450200;
let prev = 0; // required when increasing the length of snake - this stores the tail location of snake the time snake eats food

// adding event listeners
// for directing the snake
window.addEventListener('keypress', e => {
    console.log(e.keyCode);
    let t = 0;
    switch(e.keyCode) {
        case 37:
            t = -50000;
            break;
        case 38:
            t = -50;
            break;
        case 39:
            t = 50000;
            break;
        case 40:
            t = 50;
            break;
    }
    if(t!==0 && t+d!==0) {
        if(snake[head]+t !== snake[(head-1+snake.length)%snake.length]) {
        d = t;
        }
    }
});

// generates the new location of food
function newFood() {
    food = Math.random()*500+50;
    food -= food%50;
    let temp = Math.random()*500+50;
    temp -= temp%50;
    food = food*1000+temp;
}

function update() {

  //clear the canvas
  c.clearRect(0, 0, w, h);

  // update the snake body
  temp = head;
  head = (head+1)%snake.length;
  snake[head] = snake[temp] + d;
    
    // check if the snake collided
    let count = 0;
    for(let i = 0; i<snake.length; i++) {
        if(snake[i]===snake[head]) {
            count++;
        }
    }
    if(count === 2) {
        window.alert("You lost.");
        window.location.reload();
    }
    
    // check if the snake ate food
    prev = 0;
    if(snake[head] === food) {
        newFood();
        prev = snake[(head+1)%snake.length];
    }
    
    // add the snake body if food was eaten previously
    if(prev !== 0) {
        snake.push(prev);
        let temp = snake.length-2;
        while(temp !== head) {
            let swap = snake[temp];
            snake[temp] = snake[temp+1];
            snake[temp+1] = swap;
            temp--;
        }
    }

    // draw the food
    c.beginPath();
    c.fillStyle = 'red';
    c.fillRect(food/1000+10, food%1000+10, 30, 30);


  // draw the whole snake body from the snake array
  for(let i = 0; i<snake.length; i++) {
    let x = Math.floor(snake[i]/1000) + r;
    let y = Math.floor(snake[i]%1000) + r;
    c.fillStyle = 'green';
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI*2, true);
    c.fill();
  }
}

setInterval(update, 200);
