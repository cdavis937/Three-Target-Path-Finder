class Grid {

    constructor(){
        
      this.size = 20;
      this.xStart = 0;
      this.yStart = windowHeight/10;
      this.grid = [[]];
      this.gridColor = [[]];
      this.gridNum = [[]];

      this.yShift = 50;

      this.xMax = Math.floor(windowWidth / this.size);
      this.yMax = Math.floor((windowHeight - this.yShift) / this.size);

      this.max = this.xMax > this.yMax ? this.xMax: this.yMax;

      let y = 0;
        

      while(y < this.yMax){

        let x = 0;
        this.gridNum.push([Infinity])
        this.gridColor.push([0])
        while( x < this.xMax){
          this.gridNum[y][x] = Infinity;
          this.gridColor[y][x] = 'w'
          x += 1;
        }
        y += 1; 
        }

        

        
        

    }

    outputGrid(){

      
      
      

      for(let i = 0; i < this.yMax; i++){
        for(let j = 0; j < this.xMax; j++){
          
          if(this.gridColor[i][j] == 'w'){
            fill(255,255,255);
          }else if(this.gridColor[i][j] == 'b'){
            fill(0,0,255);
          }else if(this.gridColor[i][j] == 'r'){
            fill(255,0,0);
          }else if(this.gridColor[i][j] == 'k'){
            fill(50,50,50);
          }else if(this.gridColor[i][j] == 'g'){
            fill(0,255,0);
          }else{
            fill(125,0,255);
          }
            
          

          square(j*this.size, i*this.size + this.yShift, this.size);
        }
        
      }

      

    }

    setColorGrid(x, y, charColor){

      this.gridColor[y][x] = charColor;

    }

    returnColor(x, y){
      return this.gridColor[y][x];
    }

    refreshGrid(){

      for(let i = 0; i < this.gridColor.length; i++){
        for(let j = 0; j < this.gridColor[0].length; j++){
          if(this.gridColor[i][j] != 'k'){
            this.gridColor[i][j] = 'w';
          }
        }
      }

    }
  
    tracePath(start, end){

      

      

    }
    
};