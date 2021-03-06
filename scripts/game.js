

function matriz_jogo(x, y){
    let matriz = []
    for(let i=0;i<x; i++){
        matriz[i] = Array(y)
        for(let col=0 ;col<y; col++){
            matriz[i][col] = 0
        } 
    }
    return matriz
}
function atualizar_matriz(coord_snake, coord_food, mtrz){
    for(let i in mtrz){
        for(let c in mtrz[i]){        
            mtrz[i][c] = 0
        }
    }
    for(let i in coord){
        mtrz[coord_snake[i].x][coord_snake[i].y] = 1
    }
    mtrz[coord_food.x][coord_food.y] = 2
}
function box_size(width, mtrz){
    let size = width / mtrz.length
    return size
}

class snake {
    size = 2
    body_coord = [
        {x: 5,y: 3},
        {x: 5,y: 2}
    ]
    speed = 2
    direction = 'right'
    constructor(color, posX){
        this.color = color
        this.body_coord[0].x = posX
        this.body_coord[1].x = posX
    }
    switch_direction(new_direction){
        if(new_direction != this.direction){
            this.direction = new_direction
        }
    }
    walk(){
        if(this.direction === 'right'){
            for(let i=this.body_coord.length - 1; i>-1; i--){
                if(i === 0){    
                    this.body_coord[i].y += 1
                } else {
                    this.body_coord[i].x = this.body_coord[i - 1].x
                    this.body_coord[i].y = this.body_coord[i - 1].y
                }
            }
        }else if (this.direction === 'left'){
            for(let i=this.body_coord.length - 1; i>-1; i--){
                if(i === 0){    
                    this.body_coord[i].y -= 1
                } else {
                    this.body_coord[i].x = this.body_coord[i - 1].x
                    this.body_coord[i].y = this.body_coord[i - 1].y
                }
            }
        }else if (this.direction === 'up'){
            for(let i=this.body_coord.length - 1; i>-1; i--){
                if(i === 0){    
                    this.body_coord[i].x -= 1
                } else {
                    this.body_coord[i].x = this.body_coord[i - 1].x
                    this.body_coord[i].y = this.body_coord[i - 1].y
                }
            }
        }else if (this.direction === 'down'){
            for(let i=this.body_coord.length - 1; i>-1; i--){
                if(i === 0){    
                    this.body_coord[i].x += 1
                } else {
                    this.body_coord[i].x = this.body_coord[i - 1].x
                    this.body_coord[i].y = this.body_coord[i - 1].y
                }
            }
        }
    }
    eat(){
        this.size += 1
        if(this.body_coord[this.body_coord.length - 1].x === this.body_coord[this.body_coord.length - 2].x){
            if(this.body_coord[this.body_coord.length - 2].y > this.body_coord[this.body_coord.length - 1].y){
                this.body_coord[this.body_coord.length] = {
                    x: this.body_coord[this.body_coord.length - 1].x,
                    y: this.body_coord[this.body_coord.length - 1].y - 1
                }
            } else {
                this.body_coord[this.body_coord.length] = {
                    x: this.body_coord[this.body_coord.length - 1].x,
                    y: this.body_coord[this.body_coord.length - 1].y + 1
                }
            }
        }else if(this.body_coord[this.body_coord.length - 1].y === this.body_coord[this.body_coord.length - 2].y){
            if(this.body_coord[this.body_coord.length - 2].x > this.body_coord[this.body_coord.length - 1].x){
                this.body_coord[this.body_coord.length] = {
                    x: this.body_coord[this.body_coord.length - 1].x - 1,
                    y: this.body_coord[this.body_coord.length - 1].y
                }
            } else {
                this.body_coord[this.body_coord.length] = {
                    x: this.body_coord[this.body_coord.length - 1].x + 1,
                    y: this.body_coord[this.body_coord.length - 1].y 
                }
            }
        } 
    }
}
//------------------------------------------------------------
var jogo_html = document.getElementById('snake_game')
var contexto_jogo = jogo_html.getContext('2d')
var matriz = matriz_jogo(21, 21)

var bloco = box_size(jogo_html.width, matriz)
var cobra = new snake('green', (Math.floor(matriz.length/2)))
var food = {
    x: (Math.floor(matriz.length/2)),
    y: (matriz[0].length - 2)
}
//-------------------------------------------------------------

var btn_start = document.getElementById("START")
btn_start.addEventListener('click', start_game)
var btn_restart = document.getElementById("RESTART")

//--------------------------------------------------
var btn_size15x = document.getElementById("15x")
btn_size15x.addEventListener('click', newsize)
var btn_size31x = document.getElementById("31x")
btn_size31x.addEventListener('click', newsize)
function newsize(event){
    if(event.path[0].id == '15x'){
        switchsizecoord(15)
    }else if(event.path[0].id == '31x'){
        switchsizecoord(31)
    }
    alert('tamanho trocado')
}
function switchsizecoord(size){
    matriz = matriz_jogo(size, size)
    bloco = box_size(jogo_html.width, matriz)
    food = {
        x: (Math.floor(matriz.length/2)),
        y: (matriz[0].length - 2)
    }
    cobra.body_coord[0].x = (Math.floor(matriz.length/2))
    cobra.body_coord[1].x = (Math.floor(matriz.length/2))
}
//--------------------------------------------------

//---------botoes cores --------------------------
var botoes = document.getElementsByClassName('btncolor')
for(let btn=0; btn<6 ; btn++){
    botoes[btn].addEventListener('click', ()=>{
        cobra.color = botoes[btn].classList[1]
        alert('cor trocada')   
    })
}
//------------------------------------------------

document.addEventListener('keydown', update)
function update(event){
    if (event.keyCode == 37 && cobra.direction != 'right') cobra.switch_direction('left');
    if (event.keyCode == 38 && cobra.direction != 'down') cobra.switch_direction('up');
    if (event.keyCode == 39 && cobra.direction != 'left') cobra.switch_direction('right');
    if (event.keyCode == 40 && cobra.direction != 'up') cobra.switch_direction('down');
}
function construct_window(){
    contexto_jogo.fillStyle = 'white'
    contexto_jogo.fillRect(0, 0, 500, 500)
    contexto_jogo.stroke()
    for(let cord in cobra.body_coord){
        contexto_jogo.fillStyle = cobra.color
        contexto_jogo.fillRect(bloco * cobra.body_coord[cord].y,bloco * cobra.body_coord[cord].x, bloco, bloco)
        contexto_jogo.stroke()
    }
    contexto_jogo.fillStyle = 'red'
    contexto_jogo.fillRect(bloco * food.y,bloco * food.x, bloco, bloco)
    contexto_jogo.stroke()
}
function check_action(){
    if(cobra.body_coord[0].x > matriz.length - 1 || cobra.body_coord[0].x < 0 || cobra.body_coord[0].y > matriz[0].length - 1 || cobra.body_coord[0].y < 0){
        clearInterval(game)
        alert('Game Over')
    }
    if(cobra.body_coord[0].x === food.x && cobra.body_coord[0].y === food.y){
        cobra.eat()
        food.x = Math.floor(Math.random() * matriz.length)
        food.y = Math.floor(Math.random() * matriz.length)
        while(cobra.body_coord[0].x === food.x && cobra.body_coord[0].y === food.y){
            food.x = Math.floor(Math.random() * matriz.length)
            food.y = Math.floor(Math.random() * matriz.length)
        }
        
    }
    for(let i in cobra.body_coord){
        if(i!= 0 && cobra.body_coord[0].x === cobra.body_coord[i].x && cobra.body_coord[0].y === cobra.body_coord[i].y){
            clearInterval(game)
            alert('Game Over')
        }
    }
}

function start_loop(){
    cobra.walk()
    check_action()
    construct_window()
}
game = ''
function start_game(){
    btn_start.style.display = 'none'
    btn_restart.style.display = 'block'
    game = setInterval(start_loop, 200)
}//inicia o looping do jogo