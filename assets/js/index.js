document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const squareGrid = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('.span')
    const startBtn = document.querySelector('.start')
    const scoreMessage = document.querySelector('.spanMessage')
    const bodyColors = document.querySelector('.bodyColors')


    const colorsArr = ['red', 'pink', 'black', 'yellow', 'green', 'blue'];
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

    const width = 22
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 1 //so first div in our grid
    let currentSnake = [2, 1, 0] //so the div in our grid being 2 (or the Head), and 0 being the end (TAIL, with all 1's being the body from now on)
    let direction;
    let score = scoreDisplay.innerText
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    let gridColors = 0;
    


    //to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0

        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)

    }

    //function that deals w/ ALL the above outcomes of the snake
    function moveOutcomes() {
        //deals with snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom 
            (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits rigth wall 
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall 
            (currentSnake[0] + width - width < 0 && direction === -width) //if snake hits top 

        ) {
            snakeMessage(scoreMessage.textContent = "Game Over!")
            changeColors()
            

            //return clearInterval(interval) 
            //this will clear the interval if any of the above happen
        } else if (squares[currentSnake[0] + direction].classList.contains('snake')) { //if snake goes into itself
            // gameOver()
        };

        const tail = currentSnake.pop()//removes last ite of the array and shows it 
        squares[tail].classList.remove('snake')//removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        //deals with the snake getting apple 
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            snakeMessage(scoreMessage.textContent = "Got it!")
            console.log(score)
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)

        }
        squares[currentSnake[0]].classList.add('snake')
    }


    //Changenging colors every time it restart
    function changeColors() {

        squares[appleIndex].classList.remove('apple')
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squareGrid.style.background = `${colorsArr[gridColors]}`
        

        if (gridColors < colorsArr.length) {
            gridColors++
        } else {
            gridColors = 0
            bodyColors.style.background = `${colorsArr[gridColors]}`
            changeColors()
        }
        gameOver()
    }

    
//generate an instant message
function snakeMessage() {
    setTimeout(() => {
        scoreMessage.innerHTML = ""
    }, 1000)
}
//restart game 
function gameOver() {
    setTimeout(() => {
        startGame()
    }, 2000)
}

//generate new apple once apple is eaten
function randomApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake')) //making sure apples 
    squares[appleIndex].classList.add('apple')
}


//assign functions to keycodes

function control(e) {
    squares[currentIndex].classList.remove('snake') //we are removing the class snake

    if (e.keyCode === 39) {
        //console.log('rigth');
        direction = 1 //if we press the rigth arrow on our keyboard, the snake will go rigth one 
    } else if (e.keyCode === 38) {
        //console.log('up');
        direction = -width //if we press the up arrow, the snake will go back ten divs, appering to go up
    } else if (e.keyCode === 37) {
        //console.log('left');
        direction = -1 //if we press left, the snkae will go left one div
    } else if (e.keyCode === 40) {
        //console.log('down');
        direction = width //if we press down, the snake will instantly appear in the div ten divs from where you are now
    }
    //console.log(direction);


    //Random COlors
    //Working on it   
    const getRandomNumberHex = () => Math.floor(Math.random() * hex.length); 
    function randomColors() {
        // const randomNumberHex = getRandomNumberHex(); 
        let hexColor = '#';
        for (let i = 0; i < 6; i++) {

            hexColor += hex[getRandomNumberHex()] //concating # wi/ values in array
        };
        
        bodyColors.style.backgroundColor = hexColor;
    };


}
document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)

})

