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
function atualizar_matriz(coord, mtrz){
    for(let i in mtrz){
        for(let c in mtrz[i]){        
            mtrz[i][c] = 0
        }
    }
    for(let i in coord){
        matriz[coord[i].x][coord[i].y] = 1
    }
}
class snake {
    size = 2
    body_coord = [
        {x: 5,y: 3},
        {x: 5,y: 2}
    ]
    speed = 2
    direction = 'right'
    constructor(color){
        this.color = color
    }
    get_coord(){
        let copy = JSON.parse(JSON.stringify(this.body_coord))
        return copy
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

var jogo_html = document.querySelector('#snake_game')
var matriz = matriz_jogo(11, 11)
var cobra = new snake('green')
for (let line in matriz){
    linha = document.createElement('div')
    linha.id = `line_${line}`
    linha.className = 'line'
    linha.style.height = `${500 / matriz.length}px`
    for (let col in matriz[line]){
        coluna = document.createElement('div')
        coluna.id = `col_${col}`
        coluna.className = 'column'
        coluna.style.height = `${500 / matriz.length}px`
        //coluna.style.width = `${500 / matriz[0].length}px`
        linha.appendChild(coluna)
    }
    jogo_html.appendChild(linha)    
}