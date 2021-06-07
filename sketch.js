//Global variable creation
let grid;
let header;
let target1;
let target2;
let target3;
let currTime;
let prevTime;


function setup() {
  createCanvas(windowWidth,windowHeight);

  grid = new Grid();

  header = new Header();

  target1 = new Target(1);
  target2 = new Target(2);
  target3 = new Target(3);

  //Set the time variables
  prevTime = 0;
  currTime = 0;

}

function draw() {

  //Print the grid square colors out
  grid.outputGrid();
  grid.refreshGrid();

  //Draw the start target and move it if needed
  target1.draw();
  target1.updatePos(target2, target3);

  //Draw the end target and move it if needed
  target2.draw();
  target2.updatePos(target1, target3);

  target3.draw();
  target3.updatePos(target1, target2);

  //Read in the current time
  currTime = millis();

  
  
  
  

  //Either draw or erase the board

  //Return a time same as current time if the draw/ erase button is pressed
  prevTime = header.drawOrErase(grid, target1, target2, target3, currTime, prevTime);

  let distances = [];

  distances.push(target1.distance(grid, target2));
  distances.push(target2.distance(grid, target3));
  distances.push(target3.distance(grid, target1));

  console.log(distances);

  let sum1 = distances[0] + distances[1];
  let sum2 = distances[2] + distances[0];
  let sum3 = distances[1] + distances[2];

  if(sum1 < sum2 && sum1 < sum3){
    target1.path(grid, target2);
    target2.path(grid, target3);
  }else if(sum2 < sum3){
    target1.path(grid, target2);
    target1.path(grid, target3);
  }else{
    target2.path(grid, target3);
    target3.path(grid, target1);
  }
  

}

/*
* If the window is resized, create a new canvas and reset the board
*/
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  grid = new Grid();

  header = new Header();

  target1 = new Target(1);
  target2 = new Target(2);
  target3 = new Target(3);

}
