const blue      = document.getElementById('blue')
const yellow    = document.getElementById('yellow')
const green     = document.getElementById('green')
const red       = document.getElementById('red')
const btnStart  = document.getElementById('btnStart')
const lastLevel = 3
const levelGame = document.getElementById('levelG')
const scoreGame = document.getElementById('score')
let countLevel = 1;
let countScore = 0;
let booleanColor = true;

const clickColor = document.getElementById('clickColor')
const light      = document.getElementById('light')
const loseGameM  = document.getElementById('loseGameM')
const winGameM   = document.getElementById('winGameM')





class Game {
    constructor(){
        
        this.start()
        this.generateSequence()
        setTimeout(()=>{this.nextLevel()},400)       
        
        
    }
    start(){
       
        this.toggleBtnStart()
        this.start=this.start.bind(this)
        this.nextLevel=this.nextLevel.bind(this)
        this.chooseColor= this.chooseColor.bind(this)
        this.level= 1;
        this.colors={
            blue,
            yellow,
            green,
            red            
        }      

       
                   
    }

    toggleBtnStart(){
        if(btnStart.classList.contains('hide')){
            btnStart.classList.remove('hide')
        }else {
            btnStart.classList.add('hide')
        }


    }
    generateSequence(){
        this.sequence =  new Array(lastLevel).fill(0).map(n => Math.floor(Math.random()*4))
    }

    nextLevel(){
        booleanColor=true;
        this.sublevel= 0
        this.illuminateSequence()
        this.addEventsClick()

     
        
    }

    numberToColor(number){
        
        switch (number){
            case 0:
                
                return 'blue'
            case 1:
                return 'yellow'     
            case 2:
                return 'green'
            case 3:
                return 'red'  
        }
    }
    ColorToNumber(color){
        
        switch (color){
            case 'blue':
                return 0
                
            case 'yellow':
                return 1     
            case 'green':
                return 2
            case 'red':
                return 3  
        }
    }

    illuminateSequence(){
        
        for (let i=0;i<this.level;i++){
            const color = this.numberToColor(this.sequence[i]);          
            
            levelGame.innerText=[i+1];
            console.log(color)
             setTimeout(()=> this.illuminateColor(color)
             ,1000*i) 

            
             

        }
        
      
    }

    illuminateColor(color){
        if (booleanColor===true){
         light.play()

        }
        
        this.colors[color].classList.add('light')              
        setTimeout(()=> this.offColor(color),350)
        
        
      
    }

    offColor(color){
        this.colors[color].classList.remove('light')
        
     
    }

    addEventsClick(){
        
        this.colors.blue.addEventListener('click',this.chooseColor)
        this.colors.yellow.addEventListener('click',this.chooseColor)
        this.colors.green.addEventListener('click',this.chooseColor)
        this.colors.red.addEventListener('click',this.chooseColor)
        

    }
    deleteEventsClick(){
        this.colors.blue.removeEventListener('click',this.chooseColor)
        this.colors.yellow.removeEventListener('click',this.chooseColor)
        this.colors.green.removeEventListener('click',this.chooseColor) 
        this.colors.red.removeEventListener('click',this.chooseColor)
        
        


    }
    chooseColor(ev){

     
      
      const nameColor   = ev.target.dataset.color;
      const numberColor = this.ColorToNumber(nameColor)
      booleanColor=false;
      this.illuminateColor(nameColor)
      if(numberColor === this.sequence[this.sublevel]){
          this.sublevel++;          
          countScore+=5;
          clickColor.play()
          
          if(this.sublevel===this.level){
              this.level++             
              
                           
            
              this.deleteEventsClick()
            if(this.level === (lastLevel+1)){
                this.winGame()

            }else {
                setTimeout( this.nextLevel,1500)
            }
          }
      }else {
         
          this.loseGame()
          
       }
      scoreGame.innerText = countScore;
    }   
    winGame(){
        winGameM.play();
        swal('Congratulations','You Win 🤩!!','success')
          .then(()=>{
            this.start()
            levelGame.innerText=0;
            scoreGame.innerText = 0;
            
              
          })
    }

    loseGame(){
        loseGameM.play();
        swal('Sorry','You lose 😢 !','error')
          .then(()=>{
            this.deleteEventsClick()
            levelGame.innerText=0;
            countScore = 0;
            scoreGame.innerText = 0;
            this.start();
            
            
              
          })
    }
    
    

}

function startGame (){
   
   countScore=0;
   window.game = new Game ()
}