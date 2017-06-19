'use strict';

const WIDTH_CANVAS = 1500;
const HEIGHT_CANVAS = 600;
const DIRECTION_UP = "direction_up";
const DIRECTION_LEFT = "direction_left";
const DIRECTION_RIGHT = "direction_right";
const DIRECTION_DOWN = "direction_down";
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = WIDTH_CANVAS;
canvas.height = HEIGHT_CANVAS;

class GameBackground {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  drawBackground(context) {
    context.beginPath();
    context.fillStyle = "#484848";
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + HEIGHT_CANVAS);
    context.lineTo(this.x + 20, this.y + HEIGHT_CANVAS);
    context.lineTo(this.x + 20, this.y + 20);
    context.lineTo(this.x + WIDTH_CANVAS - 20, this.y + 20);
    context.lineTo(this.x + WIDTH_CANVAS - 20, this.y + HEIGHT_CANVAS);
    context.lineTo(this.x + WIDTH_CANVAS, this.y + HEIGHT_CANVAS + 5);
    context.lineTo(this.x + WIDTH_CANVAS, this.y);
    context.lineTo(this.x, this.y);
    context.fill();
    context.closePath();
  }
}

class Ball {
  constructor(xBall, yBall) {
    this.x = xBall;
    this.y = yBall;
    this.radiusBall = 10;
    this.WIDTH = 10;
    this.HEIGHT = 10;
    this.flyBall = false;
  }

  drawBall(context) {
    context.beginPath();
    context.fillStyle = "#923b13";
    context.strokeStyle = "#cbe307";
    context.arc(this.x, this.y, this.radiusBall, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
    context.beginPath();
    context.fillStyle = "#ffffff";
    context.arc(this.x + 3, this.y - 3, 3, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  setDirectionX(direction) {
    this.directionX = direction;
  }

  setDirectionY(direction) {
    this.directionY = direction;
  }

  moveBall(speed) {
    if (this.flyBall) {
      this.x += (this.directionX === DIRECTION_RIGHT) ? speed : -speed;
      this.y += (this.directionY === DIRECTION_DOWN) ? speed : -speed;
    }
  }

  processBallCollision(platform) {
    const ballLeft = this.x;
    const ballRight = this.x + this.WIDTH;

    if (ballLeft < this.radiusBall + 20) {
      this.setDirectionX(DIRECTION_RIGHT);
      this.x = this.radiusBall + 20;
    } else if (ballRight >= WIDTH_CANVAS - 20) {
      this.setDirectionX(DIRECTION_LEFT);
      this.x = WIDTH_CANVAS - this.WIDTH - 20;
    }

    const ballUp = this.y;
    const ballDown = this.y + this.HEIGHT - 20;

    if (ballUp < this.radiusBall + 20) {
      this.setDirectionY(DIRECTION_DOWN);
      this.y = this.radiusBall + 20;
    } else if (ballDown >= HEIGHT_CANVAS) {
      this.setDirectionY(DIRECTION_UP);
      this.setDirectionX(DIRECTION_LEFT);
      this.flyBall = false;
      this.y = 505;
      this.x = 750;
      platform.x = 700;
      platform.y = 530;
    }
  }
}

class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.directionPlatform = "";
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = "#ff0003";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 3;
    context.arc(this.x, this.y, 10, 0.5 * Math.PI, 1.5 * Math.PI);
    context.moveTo(this.x, this.y + 10);
    context.lineTo(this.x + 100, this.y + 10);
    context.moveTo(this.x + 100, this.y - 10);
    context.arc(this.x + 100, this.y, 10, 1.5 * Math.PI, 2.5 * Math.PI);
    context.moveTo(this.x + 100, this.y - 10);
    context.lineTo(this.x, this.y - 10);
    context.stroke();
    context.fill();
    context.closePath();
    context.beginPath();
    context.fillStyle = "#44ff25";
    context.fillRect(this.x, this.y - 10, 100, 20);
    context.closePath();
  }

  movePlatform(ball) {
    if (this.directionPlatform === "Right") {
      this.x += 15;
      if (!ball.flyBall) {
        ball.x += 15;
      }
      if (this.x > 1370) {
        this.x = 1370;
        ball.x -= 15;
      }
      this.directionPlatform = "";
    } else if (this.directionPlatform === "Left") {
      this.x -= 15;
      if (!ball.flyBall) {
        ball.x -= 15;
      }
      if (this.x < 30) {
        this.x = 30;
        ball.x += 15;
      }
      this.directionPlatform = "";
    }
  }
}

const collisionDetection = function(ball, platform) {
  if (ball.x >= platform.x - 20 && ball.x <= platform.x + 110 && ball.y >= 505 && ball.y < 510) {
    ball.flyBall = false;
    ball.setDirectionY(DIRECTION_UP);
  }
};

const gameContext = {
  gamesBackground: new GameBackground(0, 0),

  balls: new Ball(750, 505),

  platforms: new Platform(700, 530),

};

const keyControl = function(key, ball, platform) {
  let definitionCodeKey = key.code;

  switch(definitionCodeKey) {
    case "ArrowRight": {
      platform.directionPlatform = "Right";
    } break;
    case "ArrowLeft": {
      platform.directionPlatform = "Left";
    } break;
    case "Space": {
      ball.flyBall = true;
     } break;
  }
};

window.addEventListener("keydown", (key) => {keyControl(key, gameContext.balls, gameContext.platforms)});

let start = performance.now();
const gameLoop = function(context, gameContext) {
  let beginAnimate = performance.now();
  let detection = beginAnimate - start;
  context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
  if (detection > 13 && gameContext.balls.flyBall) {
    gameContext.balls.moveBall(5);
    start = beginAnimate;
  }
  gameContext.platforms.movePlatform(gameContext.balls);
  gameContext.balls.processBallCollision(gameContext.platforms);
  collisionDetection(gameContext.balls, gameContext.platforms);

  gameContext.gamesBackground.drawBackground(context);
  gameContext.balls.drawBall(context);
  gameContext.platforms.draw(context);
  requestAnimationFrame(function() {
    gameLoop(context, gameContext);
  });
};

gameLoop(context, gameContext);