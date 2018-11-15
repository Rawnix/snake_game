var w = window.innerWidth-50;
var h = window.innerHeight-50;

document.querySelector('#canvas').width = w;
document.querySelector('#canvas').height = h;
var c = document.querySelector('#canvas').getContext('2d');
var snake = [];
let initialLength = 4;
var head = initialLength-1;
var d = -50; // direction:- down: 50; up: -50; right: 50000; left: -50000;
var r = 25;
var food = 450200;
let prev = 0; // required when increasing the length of snake - this stores the tail location of snake the time snake eats food
let lb = 0, rb = 900, ub = 0, bb = 700; // defines the border of the playarea
let speed = 150;

function init() {

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

  // snake body
  snake = [];
  let x = (lb+rb)/2;
  let y = (ub+bb)/2;
  let num = 1000*x+y;
  num += (initialLength-1)*2*r;
  for(let i=0; i<initialLength; i++) {
    snake.push(num);
    num-=2*r;
  }
  // set head
  head = initialLength-1;

  newFood();
}

// generates the new location of food
function newFood() {

  let safe = false;
  // keep generating new food locations untill it is not on the snake
  while(!safe) {
    food = Math.random()*rb+50;
    food -= food%50;
    food -= 50;
    let temp = Math.random()*bb+50;
    temp -= temp%50;
    temp -= 50;
    food = food*1000+temp;

    safe = true;

    // check if the food is not spawned on the snake body
    for(let i=0; i<snake.length; i++) {
      if(food === snake[i]) {
        safe = false;
        break;
      }
    }
  }
}

function update() {

  //clear the canvas
  c.clearRect(0, 0, w, h);

  // update the snake body
  temp = head;
  head = (head+1)%snake.length;
  snake[head] = snake[temp] + d;

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


  let collided = false;
  // check if the snake collided with itself
  let count = 0;
  for(let i = 0; i<snake.length; i++) {
    if(snake[i]===snake[head]) {
      count++;
    }
  }
  if(count === 2) {
    collided = true;
  }

  //check if the snake collided with the walls
  let x = parseInt(snake[head]/1000);
  let y = snake[head]%1000;
  if(x<lb || x>=rb || y<ub || y>=bb) {
    collided = true;
  }

  // abort the game if the snake collided
  if(collided) {
    window.alert("You lost.");
    window.location.reload();
  }

  // check if the snake ate food
  prev = 0;
  if(snake[head] === food) {
    newFood();
    prev = snake[(head+1)%snake.length];
    //increase the speed
    // speed -= 100;
  }

  // draw the play area
  c.beginPath();
  c.strokeStyle = '1px red solid';
  c.strokeRect(lb, ub, rb-lb, bb-ub);

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

init();

setInterval(update, speed);
