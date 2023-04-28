var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 10;
var dx = 4;
var dy = -4;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX1 = (canvas.width - paddleWidth) / 2;
var paddleX2 = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score1 = 0;
var score2 = 0;
var bgImage = new Image();
bgImage.src = "st.jpg";
var rightP2 = false;
var leftP2 = false;
var paddleImage = new Image();
paddleImage.src = "trait.png";
var paddleImagee = new Image();
paddleImagee.src = "t2.png";


var speedInput = document.getElementById("speed");
speedInput.addEventListener("input", function () {
    var speed = parseInt(speedInput.value);
    dx = speed * 2;
    dy = -speed * 2;
});

bgImage.onload = function () {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
};

function reset() {
    paddleX1 = (canvas.width - paddleWidth) / 2;
    paddleX2 = paddleX1;
    x = canvas.width / 2;
    y = canvas.height - 10;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(paddleX1, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(paddleImage, paddleX1, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}
function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddleX2, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(paddleImagee, paddleX2, 0, paddleWidth, paddleHeight);
}

function drawScores() {
    ctx.font = "16px 'MarioFont'";
    ctx.fillStyle = "white";
    ctx.fillText("Player 1: " + score1, 8, 280);
    ctx.fillText("Player 2: " + score2, 8, 260);
}

function draw(e) {

    ctx.clearRect(0, 0, 1280, 595);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle1();
    drawPaddle2();
    drawScores();

    if (score1 >= 5 || score2 >= 5) {
        reset();
        score1 = 0;
        score2 = 0;
    }



    if (rightPressed && paddleX1 < canvas.width - paddleWidth) {
        paddleX1 += 7;
    } else if (leftPressed && paddleX1 > 0) {
        paddleX1 -= 7;
    }

    if (rightP2 && paddleX2 < canvas.width - paddleWidth) {
        paddleX2 += 7;
    } else if (leftP2 && paddleX2 > 0) {
        paddleX2 -= 7;
    }

    if (y + dy < 0 + ballRadius) {
        if (x > paddleX2 && x < paddleX2 + paddleWidth) {
            dy = -dy + Math.random() * 2;
            score2++;
        } else {
            reset();
            score2 = 0;
            score1++;
        }
    }

    if (score1 >= 5 || score2 >= 5) {
        clearInterval(intervalId);
        if (score1 >= 5) {
            console.log("ddd")
            alert("Player 1 wins!");
            e.preventDefault();
        } else {
            alert("Player 2 wins!");
            e.preventDefault();
        }
        return;


    }

    if (x + dx > canvas.width - ballRadius) {
        dx = -dx;
    } if (x + dx < 0 + ballRadius) {
        dx = -dx;
    } if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX1 && x < paddleX1 + paddleWidth) {
            dy = -dy + Math.random() * 2;
            score1++;
        } else {

            reset();
            score1 = d0;
            score2 = d0;
        }

    }
    x += dx;
    y += dy;


}
var intervalId = setInterval(draw, 10);
reset();
document.addEventListener("keydown", keydownhandle, false);
document.addEventListener("keyup", keyuphandle, false);
function keydownhandle(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 68) {
        rightP2 = true;

    } else if (e.keyCode == 65) {
        leftP2 = true;
    }
    if (rightPressed && paddleX1 < canvas.width - paddleWidth) {
        paddleX1 += 7;
    } else if (leftPressed && paddleX1 > 0) {
        paddleX1 -= 7;
    }
}
function keyuphandle(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
    if (e.keyCode == 68) {
        rightP2 = false;

    } else if (e.keyCode == 65) {
        leftP2 = false;
    }

    if (rightP2 && paddleX2 < canvas.width - paddleWidth) {
        paddleX2 += 7;
    } else if (leftP2 && paddleX2 > 0) {
        paddleX2 -= 7;
    }
}


setInterval(draw, 10);
