/* DOM selectors */
const movementDisplay = document.getElementById('movement')
const canvas = document.getElementById('canvas')



/* canvas serup / gane state */

const ctx = canvas.getContext('2d')

// you always set the canvas width/height

canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

let gameLoopInterval = setInterval(gameLoop, 60) 



// ctx.fillStyle = 'white'
// ctx.strokeStyle = 'red'
// ctx.lineWidth = 5;

// ctx.fillRect(10, 10, 100, 100)
// ctx.strokeRect(10, 10, 100, 100)

function drawBox(x, y, height, width, color){
    ctx.fillStyle = color
    ctx.fillRect(x, y, height, width)

}


// drawBox(50, 50, 100, 100, 'purple')
// drawBox(100, 50, 100, 100, 'green')


/* Class*/

class Crawler {
    constructor(x, y, color, height, width){
        this.x = x 
        this.y = y 
        this.color = color
        this.width = width
        this.height = height 
        this.alive = true
    }
    render() {
        ctx.fillStyle = this.color 
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}

// let myCrawler = new Crawler (100, 100, 'orange', 100, 100)


let hero = new Crawler(0, 0, 'hotpink', 20, 20)
let ogre = new Crawler(200, 100, 'green', 120, 60)


/* game functions */



//listen for keypresses
function movementHandler(e) {
    const speed = 10
    switch (e.key){
        case ('w'):
            hero.y = hero.y - speed
            break
        case ('s'):
            hero.y = hero.y + speed
            break
        case ('a'):
            hero.x = hero.x - speed
            break
        case ('d'):
            hero.x = hero.x + speed
            break            
    }
}

function detectHit() {
    //check for collisions on each side, one by one 
    // let ogreLeft = hero.x + hero.width >= ogre.x
    

    // let ogreRight = hero.x <= ogre.x + ogre.width

    // let checkX = ogreLeft && ogreRight 
    

    // // let check = ogreLeft && ogreRight
    // // console.log(check)
    // let ogreTop = hero.y + hero.height >= ogre.y
    
    // let ogreBottom = hero.y <= ogre.y + ogre.height

    // let checkY = ogreTop && ogreBottom

    // let checkXY = checkX && checkY
    // console.log(checkXY)

    if(hero.x + hero.width >= ogre.x && hero.x <= ogre.x + ogre.width && hero.y + hero.height >= ogre.y &&
        hero.y <= ogre.y + ogre.height){
            endGame()

        }
}

function endGame(){
    ogre.alive = false 
    clearInterval(gameLoopInterval)
    movementDisplay.innerText = 'YOU KILLED THE OGRE!'

}






/* main game loop */

function gameLoop(){
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //check for collisions 
    detectHit()
    // render out game objects
    if(ogre.alive){
    ogre.render()
    }
    hero.render()


}



/* event listeners*/

canvas.addEventListener('click', e => {
    drawBox(e.offsetX, e.offsetY, 50, 50, 'red')
    movementDisplay.innerText = `X; ${e.offsetX} Y: ${e.offsetY}`
    console.log(e);
})


document.addEventListener('keydown', movementHandler)

