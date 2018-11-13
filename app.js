var w = window.innerWidth-100;
var h = window.innerHeight-100;

document.querySelector('#canvas').width = w;
document.querySelector('#canvas').height = h;
var c = document.querySelector('#canvas').getContext('2d');
var snake = [250250, 250300, 250350, 250400, 250450, 250500];
var head = snake.length - 1;
var d = -50000; // direction:- down: 50; up: -50; right: 50000; left: -50000;
var r = 25;

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
        d = t;
    }
});

function update() {

  //clear the canvas
  c.clearRect(0, 0, w, h);

  // update the snake body
  temp = head;
  head = (head+1)%snake.length;
  snake[head] = snake[temp] + d;


  // draw the whole snake body from the snake array
  for(let i = 0; i<snake.length; i++) {
    let x = Math.floor(snake[i]/1000) + r/2;
    let y = Math.floor(snake[i]%1000) + r/2;
    c.fillStyle = 'green';
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI*2, true);
    c.fill();
  }
}

setInterval(update, 200);
