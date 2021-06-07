class Target {

    constructor(n){

        this.num = n;

        this.size = 20;

        this.yShift = 50;

        //Place the target in the first box or the last box
        if(n==3){
            this.x = Math.floor(windowWidth/this.size) - 1;
            this.y = Math.floor((windowHeight-this.yShift)/this.size) - 1;
        }else if(n == 1){
            this.x = 0;
            this.y = 0;
        }else if(n == 2){
            this.x = Math.floor(windowWidth/this.size) - 1;
            this.y = 0;
        }
        
        this.xMax = Math.floor(windowWidth / this.size);
        this.yMax = Math.floor((windowHeight - this.yShift) / this.size);

        this.pressed = false;

        this.canMove = true;

        this.gridNum = [[]];

        let yNum = 0;

        while(yNum < this.yMax){

            let xNum = 0;
            this.gridNum.push([Infinity])
            while( xNum < this.xMax){
              this.gridNum[yNum][xNum] = Infinity;
              xNum += 1;
            }
            yNum += 1; 
        }

    }

    /*
    * Create three circles to make a target look alike
    */
    draw(){

        if(this.num == 1){
            fill(0,255,0);
            ellipse((this.x + .5) * this.size, (this.y + .5) * this.size + this.yShift, this.size, this.size);
        
            fill(255,255,255)
            ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/1.5, this.size/1.5);
    
            fill(0,255,0);
            ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/2.5, this.size/2.5);
        }else if(this.num == 2){
            fill(150,50,150);
            ellipse((this.x + .5) * this.size, (this.y + .5) * this.size + this.yShift, this.size, this.size);
        
            fill(255,255,255)
            ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/1.5, this.size/1.5);
            
            fill(150,50,150);
            ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/2.5, this.size/2.5);
        }else if(this.num == 3){
            fill(100,100,175);
            ellipse((this.x + .5) * this.size, (this.y + .5) * this.size + this.yShift, this.size, this.size);
        
            fill(255,255,255)
            ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/1.5, this.size/1.5);
    
            fill(100,100,175);
            ellipse((this.x + .5)* this.size, (this.y + .5)* this.size + this.yShift, this.size/2.5, this.size/2.5);
        }

    }

    /*
    * Updates the position of the target in the object
    */
    updatePos(tar1, tar2){

        if(mouseIsPressed && this.canMove){
            
            let xPrev = this.x;
            let yPrev = this.y;

            let xCur = Math.floor(mouseX/this.size);
            let yCur = Math.floor((mouseY - this.yShift)/this.size);

            //As long as the cursor is pressed over the target
            if (yPrev == yCur){
                if(xPrev == xCur){
                    this.pressed = true;
                }
            }
        }else{
            this.pressed = false;
        }

        if(this.pressed){
            
            //As long as the mouse is in the grid move it around
            if(mouseY > this.yShift && mouseY < this.yMax * this.size + this.yShift && mouseX < this.xMax * this.size && mouseX > 0){
                
                let pos1 = [...tar1.returnPos()];
                let pos2 = [...tar2.returnPos()]

                let x = Math.floor((mouseX)/this.size);
                let y = Math.floor((mouseY - this.yShift)/this.size);

                //Move it to any postion as long as it is not over the other target
                if(pos1[0] != x || pos1[1] != y){
                    if(pos2[0] != x || pos2[1] != y){
                        this.x = x;
                        this.y = y;
                    } 
                }

            }
            
        }

        


    }

    /*
    * Calculates a distance between two targets
    */
    distance(grid, tar){

        for(let i = 0; i < this.gridNum.length; i++){
            for(let j = 0; j < this.gridNum[0].length; j++){
              this.gridNum[i][j] = Infinity;
            }
          }
    
          let pos = this.returnPos();
    
          this.gridNum[pos[1]][pos[0]] = 0;
    
          let endPos = [...tar.returnPos()];
    
          let n = 0;
    
          while(n < this.xMax * this.yMax){
    
          for(let i = 0; i < this.gridNum.length - 1; i++){
            for(let j = 0; j < this.gridNum[0].length; j++){
              if(this.gridNum[i][j] == n){
                if(endPos[0] == j && endPos[1] == i){
                  return n;
                }
    
                if(j < this.gridNum[0].length-1){
                  if(this.gridNum[i][j+1] > n && grid.returnColor(j+1, i) != 'k'){
                    this.gridNum[i][j+1] = n + 1;
                    
                    if(grid.returnColor(j+1, i) != 'r'){
                        grid.setColorGrid(j+1, i, 'b');
                    }
                    
                  }
                }
    
                if(i > 0){
                  if(this.gridNum[i-1][j] > n && grid.returnColor(j, i-1) != 'k'){
                    this.gridNum[i-1][j] = n + 1;
                    if(grid.returnColor(j , i-1) != 'r'){
                        grid.setColorGrid(j, i-1, 'b');
                    }
                  }
                }
    
                if(i < this.gridNum.length - 1){
                  if(this.gridNum[i+1][j] > n && grid.returnColor(j, i+1) != 'k'){
                    this.gridNum[i+1][j] = n + 1;
                    if(grid.returnColor(j, i+1) != 'r'){
                        grid.setColorGrid(j, i+1, 'b');
                    }
                  }
                }
    
                if(j > 0){
                  if(this.gridNum[i][j-1] > n && grid.returnColor(j-1, i) != 'k'){
                    this.gridNum[i][j-1] = n + 1;
                    if(grid.returnColor(j-1,i) != 'r'){
                        grid.setColorGrid(j-1, i, 'b');
                    }
                  }
                }
    
                
                
              }
            }
          }
          n += 1;
        }
    
        return 0;

    }

    /*
    * Traces a path between one target and another
    */
    path(grid, tar){

        let pos = tar.returnPos();

        let length = this.distance(grid, tar);

        if(length == 0){

            textSize(20);
            fill(0,0,0);
            text("No Path Found", 0, 45)

        }else{
            let num = this.gridNum[pos[1]][pos[0]];

            while(num >= 0){

                let nextNum = num - 1;
                let x = pos[0];
                let y = pos[1];

                grid.setColorGrid(x, y, 'r');

                if(x < this.gridNum[0].length - 1){
                    if(this.gridNum[y][x+1] == nextNum){
                        pos = [x+1, y];
                    }
                }
        
                if(x > 0){
                    if(this.gridNum[y][x-1] == nextNum){
                        pos = [x-1,y];
                    }
                }
        
                if(y < this.gridNum.length - 1){
                    if(this.gridNum[y+1][x] == nextNum){
                        pos = [x, y+1];
                    }
                }
        

                if(y > 0){
                    if(this.gridNum[y-1][x] == nextNum){
                    pos = [x,y-1];
                    }
  
                }
        
                num = nextNum;

            }

        return true;
      }

    }

    /*
    * Return the x and y of the target
    */
    returnPos(){
        return [this.x, this.y];
    }

};