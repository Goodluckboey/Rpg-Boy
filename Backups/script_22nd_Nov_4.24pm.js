// "use strict"
const canvas = document.getElementById('canvas')
const context = canvas.getContext("2d")

// HERO VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const pk1Timer = null;
let heroPosX = 0 //limit = 688
let heroPosY = 0 //limit = 344
let directionChecker = 'right'
const pk1 = {img:null, width:32, height:32, currentframe:0, totalframes:5}
pk1.img = new Image()
pk1.img.src = "char.png"

let heroStats = {
    health: 100,
}
// ---------------------------------------------------

// GAME OVER VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let gameStartTrigger = false
let gameOverTrigger = false
const gameOver = {img:null, width:500, height:500, currentframe:0, totalframes:1}
gameOver.img = new Image()
gameOver.img.src = "game-over.png"

// ---------------------------------------------------

// MONSTER VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const monsterTimer = null;
const monster = {img:null, width:32, height:32, currentframe:0, totalframes:5}
monster.img = new Image()
monster.img.src = "enemy_walk.png"

let monsterStats = {
    health: 20,
}
// ---------------------------------------------------


window.onload = function() {
    pk1 = setInterval(animationFunction,25)
    // monster = setInterval(animatePk1,25)
    footsteps = new sound("footsteps_grass.mp3")
  };
  const randomNum1 = Math.ceil(Math.random() * 1350)
  const randomNum2 = Math.ceil(Math.random() * 700)
  console.log(`${randomNum1},${randomNum2}`)
  function createMonster (whereX,whereY) {
    const madeMonster = context.drawImage(monster.img, monster.currentframe * monster.width , 0 , monster.width , monster.height , whereX ,whereY , monster.width * 2, monster.height * 2)

}

function animationFunction () {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.drawImage(pk1.img, pk1.currentframe * pk1.width , 0 , pk1.width , pk1.height , heroPosX ,heroPosY , pk1.width * 2, pk1.height * 2)
    createMonster(randomNum1,randomNum2)

    if ((((randomNum1 - 30) < heroPosX ) && (heroPosX < (randomNum1 + 30))) && (((randomNum2 - 50) < heroPosY ) && (heroPosY < (randomNum2 + 50))) && (heroStats.health > (-1))) {
        heroStats.health -= 1
        console.log(`Health remaining: ${heroStats.health}`)
    }

    if (heroStats.health < 0){
        context.drawImage(gameOver.img, 5 , 10 , 600 , 500 , 600 , 250 , 350, 300)
        gameOverTrigger = true
        pk1.img.src = 'tombstone_sprite.png'
        pk1.currentframe++;
    }
    
    if(pk1.currentframe>=pk1.totalframes){
        pk1.currentframe = 0
    }
    // console.log(`Hero: ${heroPosX},${heroPosY}`)
}

window.addEventListener("keydown", function(e) {
    // console.log(`You pressed button ${e.key}.`)
    if(e.key === 'Enter'){
        const startLogo = document.getElementById('startLogo')
        startLogo.remove()
        gameStartTrigger = true
        }

    if ((gameOverTrigger === false) && (gameStartTrigger === true)){
        if(((e.key === 'ArrowUp') || (e.key === 'w')) && (heroPosY > 0)){ 
            heroPosY-=8
            pk1.currentframe++;
            if(directionChecker === 'atk-right'){
                pk1.img.src = "char.png"
                directionChecker = 'right'
            }
            if(directionChecker === 'atk-left'){
                pk1.img.src = "reverse_char.png"
                directionChecker = 'left'
            } 
        }
        if (((e.key === 'ArrowDown') || (e.key === 's')) && (heroPosY < 752)){
            heroPosY+=8
            pk1.currentframe++;
            if(directionChecker === 'atk-right'){
                pk1.img.src = "char.png"
                directionChecker = 'right'
            }
            if(directionChecker === 'atk-left'){
                pk1.img.src = "reverse_char.png"
                directionChecker = 'left'
            } 
    
        }
        if(((e.key === 'ArrowLeft') || (e.key === 'a')) && (heroPosX > 0)){
            // myAudio.play();
            heroPosX-=8
            pk1.currentframe++;
            if ( directionChecker !== 'left'){
                pk1.img.src = "reverse_char.png"
                directionChecker = 'left'
            }
        }
        if (((e.key === 'ArrowRight') || (e.key === 'd')) && (heroPosX < 1408)){
            heroPosX+=8
            pk1.currentframe++;
            if ( directionChecker !== 'right'){
                console.log
                pk1.img.src = "char.png"
                directionChecker = 'right'
            }
        }
        if ((e.key === ' ') && ((directionChecker === 'right') || (directionChecker === 'atk-right'))){
            if ((pk1.img.src === "atk-advanced.png") === false){
                pk1.img.src = "atk-advanced.png"
                pk1.currentframe++;
                directionChecker = 'atk-right'
                const atkDiv = document.createElement('div')
                atkDiv.setAttribute('id','damage')
                canvas.append(atkDiv)

                if ((((randomNum1 - 55) < heroPosX ) && (heroPosX < (randomNum1 + 5))) && (((randomNum2 - 70) < heroPosY ) && (heroPosY < (randomNum2 + 70))) && (monsterStats.health > (0))) {
                    monsterStats.health -= 1
                    console.log(`Health remaining: ${monsterStats.health}`)
                } // Checks if within range. If so, minus health from monster.
            } else {
                pk1.currentframe++;
            }
    
            }
        if ((e.key === ' ') && ((directionChecker === 'left') || (directionChecker === 'atk-left'))){
            if ((pk1.img.src === "atk-advanced-reversed.png") === false){
                pk1.img.src = "atk-advanced-reversed.png"
                pk1.currentframe++;
                directionChecker = 'atk-left'
            } else {
                pk1.currentframe++;
            }
    }
  
        }

    // If 'SPACE' is pressed, and heroPosX/Y coincides with EnemyPosX/y, deal damage. else if heroPosX/Y coincides with EnemyPosX/y receive damage.
    // posX += 8
    // console.log(`You pressed button ${e.key}.`)

  });
