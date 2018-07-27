 const board = [];
    const boardW = 30, boardH = 18;
    var snakeX;
    var snakeY;
    var snakeD;
    var snakeLength;
    var snake;
    var score = 0;
    var start = document.getElementById("start-button");
    const body = document.getElementsByTagName("body")[0];
    console.log(body);
    var boardEl;
    var gameEnded = false;

    function makeGame() {
        body.className = "active"
        // drawing board if this is a new game
        if(!boardEl){
            boardEl = document.getElementById('board');
            for (var y = 0; y < boardH; y++) {
            var row = [];
                for (var x = 0; x < boardW; x++) {
                    var block = {
                        
                    };

                    block.el = document.createElement('div');
                    boardEl.appendChild(block.el);
                    row.push(block);
                }

                board.push(row);
            }
            startGame();
        } else {
            // restarting game
            startGame();
        }
        
        //executing loop
        loop();
    } //end make game

    function makeApple() {
        var appleX = Math.floor(Math.random() * boardW);
        var appleY = Math.floor(Math.random() * boardH);

        board[appleY][appleX].apple = 1;
    }

    function getLength(){
        board[snakeY][snakeX].snake = snakeLength;
    }

    function getScore(){
        score = snakeLength - 5;
        var scoreEntry = document.getElementById("score");
        scoreEntry.innerText = score; 
    }

     function startGame() {
        snakeX = Math.floor(boardW / 2);
        snakeY = Math.floor(boardH / 2);
        snakeLength = 5;
        snakeD = 'Up';

        // reset board and snake length
        clearBoard();
        getLength();
    } // end start game

    function clearBoard () {
        for (var y = 0; y < boardH; ++y) {
            for (var x = 0; x < boardW; ++x) {
                board[y][x].snake = 0;
                board[y][x].apple = 0;
            }
        }

        // reset snake length and make apple
        getLength();
        makeApple();
    }

    function gameOver(){
        body.className = "game-over";
        start.innerHTML = "Game Over<br> Try Again"
        start.className = "game-over";

        gameEnded = true;

    }


    function loop(){

        switch (snakeD) {
            case 'Up':    snakeY--; break;
            case 'Down':  snakeY++; break;
            case 'Left':  snakeX--; break;
            case 'Right': snakeX++; break;
        }


        // border detection
        if (snakeX < 0 || snakeY < 0 || snakeX >= boardW || snakeY >= boardH) {
            score = 0;
            gameOver();
        }

        // snake self collision
        if (gameEnded === false && board[snakeY][snakeX].snake > 0) {
            score = 0;
            gameOver();
        }

        // apple collision
        if (gameEnded === false && board[snakeY][snakeX].apple === 1) {
            snakeLength++;
            board[snakeY][snakeX].apple = 0;
            makeApple()
            getScore();
        }
        
        getLength();

        // template for snake and apple
        for (var y = 0; y < boardH; y++) {
            for (var x = 0; x < boardW; x++) {
                var block = board[y][x];

                if (block.snake > 0) {
                    block.el.className = 'snake-body';
                    block.snake -= 1
                } else if (block.apple === 1) {
                    block.el.className = 'apple';
                }
                else {
                    block.el.className = '';
                }
            }
        }

        setTimeout(loop, 300);
    }

    function enterPressed(event) {
        // Update direction depending on key hit
        switch (event.key) {
            case 'ArrowUp': snakeD = 'Up'; break;
            case 'ArrowDown': snakeD = 'Down'; break;
            case 'ArrowLeft': snakeD = 'Left'; break;
            case 'ArrowRight': snakeD = 'Right'; break;
            default: return;
        }

        // This prevents the arrow keys from scrolling the window
        event.preventDefault();
    }
