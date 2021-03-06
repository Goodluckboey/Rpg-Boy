// HERO VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const pk1Timer = null;
let heroPosX = 0 //limit = 688
let heroPosY = 0 //limit = 344
let directionChecker = 'right'
const pk1 = {img:null, width:32, height:32, currentframe:0, totalframes:5}
pk1.img = new Image()
pk1.img.src = "assets/char.png"
let heroHealthBar = document.getElementById("health")
let Herosize = 2;
let heroStats = {
    health: 100
}

function drawHero () {
  context.drawImage(pk1.img, pk1.currentframe * 32 , 0 , 32 , 32 , heroPosX ,heroPosY , 32 * Herosize, 32 * Herosize) // Draws Hero on canvas at heroPosX and heroPosY coordinates.
  if(pk1.currentframe>=pk1.totalframes){
    pk1.currentframe = 0
  }
}

window.addEventListener("keydown", function(e) {
  // console.log(`You pressed button ${e.key}.`)
  if(e.key === 'Enter'){
    const startLogo = document.getElementById('startLogo')
    startLogo.remove()
    gameStartTrigger = true
  }
  if ((gameOverTrigger === false) && (gameStartTrigger === true)){
    if(((e.key === 'ArrowUp') || (e.key === 'w'))){ 
        heroPosY-=12
        if(heroPosY < -48){
          heroPosY = 824
        }
        pk1.currentframe++;
        if(directionChecker === 'atk-right'){
            pk1.img.src = "assets/char.png"
            directionChecker = 'right'
        }
        if(directionChecker === 'atk-left'){
            pk1.img.src = "assets/reverse_char.png"
            directionChecker = 'left'
        } 
    }
    if (((e.key === 'ArrowDown') || (e.key === 's'))){
        heroPosY+=12
        if(heroPosY > 824){
          heroPosY = -48
        }
        pk1.currentframe++;
        if(directionChecker === 'atk-right'){
            pk1.img.src = "assets/char.png"
            directionChecker = 'right'
        }
        if(directionChecker === 'atk-left'){
            pk1.img.src = "assets/reverse_char.png"
            directionChecker = 'left'
        } 

    }
    if(((e.key === 'ArrowLeft') || (e.key === 'a'))){
        // myAudio.play();
        heroPosX-=12
        if(heroPosX < -48){
          heroPosX = 1464
        }

        pk1.currentframe++;
        if ( directionChecker !== 'left'){
            pk1.img.src = "assets/reverse_char.png"
            directionChecker = 'left'
        }
    }
    if (((e.key === 'ArrowRight') || (e.key === 'd'))){
        heroPosX+=12
        if(heroPosX > 1464){
          heroPosX = -48
        }
        pk1.currentframe++;
        if ( directionChecker !== 'right'){
            pk1.img.src = "assets/char.png"
            directionChecker = 'right'
        }
    }
    if ((e.key === ' ') && ((directionChecker === 'right') || (directionChecker === 'atk-right'))){
        if ((pk1.img.src === "assets/atk-advanced.png") === false){
            pk1.img.src = "assets/atk-advanced.png"
            pk1.currentframe++;
            directionChecker = 'atk-right'
            const atkDiv = document.createElement('div')
            atkDiv.setAttribute('id','damage')
            canvas.append(atkDiv)

            // if ((((randomNum1 - 55) < heroPosX ) && (heroPosX < (randomNum1 + 5))) && (((randomNum2 - 70) < heroPosY ) && (heroPosY < (randomNum2 + 70))) && (monsterStats.health > (0))) {
            //     monsterStats.health -= 1
            //     console.log(`Health remaining: ${monsterStats.health}`)
            // } // Checks if within range. If so, minus health from monster.
        }

        }
    if ((e.key === ' ') && ((directionChecker === 'left') || (directionChecker === 'atk-left'))){
        if ((pk1.img.src === "assets/atk-advanced-reversed.png") === false){
            pk1.img.src = "assets/atk-advanced-reversed.png"
            pk1.currentframe++;
            directionChecker = 'atk-left'
        }
}

    }

// If 'SPACE' is pressed, and heroPosX/Y coincides with EnemyPosX/y, deal damage. else if heroPosX/Y coincides with EnemyPosX/y receive damage.
// posX += 8
// console.log(`You pressed button ${e.key}.`)

}
);

function getDamage (){
  let item = null;
  for (let i = 0; i < monList.length; i++){ // => For every object in monList
    item = monList[i];
    if((heroPosX < item.position.x + 50) && (heroPosX > item.position.x - 50) && (heroPosY < item.position.y + 50) && (heroPosY > item.position.y - 50)){

    console.log('You got hit!')}
    }
  // }
}
// ---------------------------------------------------

// MONSTER VARIABLES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const monsterTimer = null;
const monster = {img:null, width:32, height:32, currentframe:0, totalframes:5}
monster.img = new Image()
monster.img.src = "assets/enemy_walk.png"
let monList = [];
// let monsterStats = {
//     health: 20,
// }

function produceMonsterLocationX () {
  return Math.round(Math.random() * 1300)
}
function produceMonsterLocationY () {
  return Math.round(Math.random() * 500)
}
function produceRandomVelocity(){
  let num = Math.round(Math.random()*1) + 1; // get random number
  num *= Math.round(Math.random()) ? 1 : -1; // it will either return it as it is, or turn it negative bcos of -1
  return num
}

function makeMonster (){ // creates an object with position, velocity and health. But wont show up on canvas as it hasnt been drawn yet.
  for (let i = 0; i < NUMBER_OF_MONSTERS; i++){
  monList.push({
    position: {
      x: produceMonsterLocationX(),
      y: produceMonsterLocationY()
      },
      velocity: {
      x: produceRandomVelocity(),
      y: produceRandomVelocity()
      },
      health: 20
    }
  )}
} // Number of objects created is limited to variable NUMBER_OF_MONSTERS in initialization.

function drawMonster (item) { // Actually draws the monster out, using coordinates from makeMonster()
  context.drawImage(monster.img, monster.currentframe * 32 , 0 , 32 , 32 , item.position.x ,item.position.y , 32 * 2, 32 * 2) // Draws Monster on canvas at monsterPosX and monsterPosY coordinates.

}

function drawMonsterS(){ // Draws all the monsters out, according to the number of objects in monList.
  let item;
  for (let i = 0; i < monList.length;i++){
    item = monList[i]
    drawMonster(item)
  }
}

function moveMonster(){
  let item;
  for (let i =0; i < monList.length; i++){ // => For every object in monList
    item = monList[i];
    item.position.x += item.velocity.x;
      if (item.position.x > 1464){
        item.position.x = 0;
      } else if (item.position.x < 0){
        item.position.x = 1464
      }
      if (item.position.y > 824){
        item.position.y = 0;
      } else if (item.position.x < 0){
        item.position.y = 824
      }
    item.position.y += item.velocity.y
  }
}
// ---------------------------------------------------

// INITIALIZING  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const ANIMATION_INTERVAL = 25
const NUMBER_OF_MONSTERS = 12
const canvas = document.getElementById('canvas')
const context = canvas.getContext("2d")
let gameStartTrigger = false
let gameOverTrigger = false
const gameOver = {img:null, width:500, height:500, currentframe:0, totalframes:1}
gameOver.img = new Image()
gameOver.img.src = "assets/game-over.png"

window.onload = function() {
  setInterval(renderAll,ANIMATION_INTERVAL)
  setInterval(getDamage,ANIMATION_INTERVAL)
  
};

function renderAll (){ // Clears the canvas, then draws everything every 25miliseconds.
if(gameStartTrigger === true)
{ context.clearRect(0,0,canvas.width, canvas.height);
  
  drawMonsterS()
  drawHero()
  moveMonster()

  }
}

makeMonster()


// ---------------------------------------------------







/* Moving the monsters: 
Function that chooses between +10 & -10. Then adds it to X or Y.

create a div that floats around the screen.
Where the div floats, a monster is formed as well.


*/



/* 
const things = []

function makeThings(){
  creates a square, with a random position, and a random velocity
}//this function is called outside of the renderAll

function drawThing(item){
define how this item will look.
define "item"'s parameters
e.g context.fillRect(item.position.x, item.position.y, item.width, item.height);
}

function drawThings() {
const item
for(let i = 0; i < things.length; i++) {
    item = things[i];
    drawThing(item);
  }
}

function moveThings() {
  const item = null;
  for (let i = 0; i < things.length; i++) { // For as many objects as there are in the array-object, add the velocity to the items position.
    item = things[i];
    item.position.x = item.position.x + item.velocity.x;
    item.position.y = item.position.y + item.velocity.y;

    thingRangeCheck(item); // this could be the function to check if the position is out of the canvas or not.
  }
}

renderAll() simply needs to call the moveThings(), and drawThings()
setInterval(renderAll, 25)

*/