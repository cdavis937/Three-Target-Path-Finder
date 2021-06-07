class Header {

    constructor(){
        
        this.targetPressed = false;

        this.yShift = 50;

        this.targetSize = 20;
        this.size = 20;
        
        //Number of boxes in y and x direction
        this.xMax = Math.floor(windowWidth / this.size);
        this.yMax = Math.floor((windowHeight - this.yShift) / this.size);

        this.isDrawing = true;

    }

    /*
    * Either draw or erase on the board
    */
    drawOrErase(grid, tar1, tar2, tar3, currTime, prevTime){

        //Create rectangle on the top of the screen
        fill(50,150,255);
        rect(0,0,windowWidth, 50);
        fill(255,255,255);

        textSize(35);

        //Switch Draw/Erase if pressed and has been at least .5 seconds sice last click
        if(mouseIsPressed && currTime - prevTime > 500){

            if(!this.isDrawing){
                //If erasing then check to see if box hit, if so then set drawing true
                if(mouseX > windowWidth/2 - 40 && mouseX < windowWidth/2 + 53){
                    if(mouseY > 5 && mouseY < 45){
                        this.isDrawing = true;
                        
                    }
                }
            }else{
                //If drawing then check to see if box is hit, if so change to erasing
                if(mouseX > windowWidth/2 - 40 && mouseX < (windowWidth/2 + 73)){
                    if(mouseY > 5 && mouseY < 45){
                        this.isDrawing = false;
                        
                    }
                }
            }
            //Set previous time to current time to create time gap between pressed
            prevTime = currTime;
        }

        

        if(this.isDrawing){

            //Print out draw button
            noStroke();
            fill(0,0,0);
            text("Draw", windowWidth/2 - 35, 35);

            stroke(0);
            strokeWeight(5);
            noFill();
            rect(windowWidth/2 - 40, 5, 93, 40);

            //Draw wall
            this.drawWall(grid, tar1, tar2, tar3);
        }else{
            
            //Print out the erase button
            noStroke();
            fill(255,100,100);
            text("Erase", windowWidth/2 - 35, 35);

            strokeWeight(5);
            noFill();
            stroke(255,100,100);
            rect(windowWidth/2 - 40, 5, 103, 40);

            //Erase wall
            this.eraseWall(grid, tar1, tar2, tar3);
        }

        //Reset stroke color and weight
        stroke(51);
        strokeWeight(1);

        //Return the time
        return prevTime;
    }

    eraseWall(grid, tar1, tar2, tar3){

        //As long as targets are not pressed reset box to white
        if(mouseIsPressed && !tar1.pressed && !tar2.pressed && !tar3.pressed){
   
            let x = Math.floor((mouseX)/this.targetSize);
            let y = Math.floor((mouseY - this.yShift)/this.targetSize);
        
            if(y >= 0){
                grid.setColorGrid(x,y,'w');
            }
            

        }

    }

    drawWall(grid, tar1, tar2, tar3){

        //As long as mouse is pressed and the targets are not pressed
        if(mouseIsPressed && !tar1.pressed && !tar2.pressed && !tar3.pressed){
   
            let x = Math.floor((mouseX)/this.targetSize);
            let y = Math.floor((mouseY - this.yShift)/this.targetSize);
        
            if(y >= 0){
                grid.setColorGrid(x,y,'k');
            }
            

        }
        

    }

};