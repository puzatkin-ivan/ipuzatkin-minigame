'use strict';

const WIDTH_CANVAS = 1500;
const HEIGHT_CANVAS = 600;
const DIRECTION_UP = "direction_up";
const DIRECTION_LEFT = "direction_left";
const DIRECTION_RIGHT = "direction_right";
const DIRECTION_DOWN = "direction_down";
const widthBorderGamesField = 20;
const xBall = WIDTH_CANVAS / 2;
const yBall = 505;
const lengthPlatform = 100;
const xPlatform = xBall - lengthPlatform / 2;
const yPlatform = 515;
let startGame = Date.now();

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(context) {
    this.radius = 10;
    context.beginPath();
    context.lineWidth = 2;
    context.fillStyle = "#923b13";
    context.strokeStyle = "#cbe307";
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
    context.beginPath();
    const radiusSmallBall = 3;
    const xSmallBall = this.x + 3;
    const ySmallBall = this.y - 3;
    context.fillStyle = "#ffffff";
    context.arc(xSmallBall, ySmallBall, radiusSmallBall, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  setDirectionX(direction) {
    this.directionX = direction;
  }

  setDirectionY(direction) {
    this.directionY = direction;
  }

  move(speed) {
    if (Ball.isFlying) {
      this.x += (this.directionX === DIRECTION_RIGHT) ? speed * Math.cos(Math.PI / 6) : -speed * Math.cos(Math.PI / 6);
      this.y += (this.directionY === DIRECTION_DOWN) ? speed * Math.sin(Math.PI / 6) : -speed * Math.sin(Math.PI / 6);
    }
  }
}


class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(context) {
    this.height = 20;
    const radiusSemicircle = this.height / 2;
    context.beginPath();
    context.fillStyle = "#3ac40f";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 3;
    context.arc(this.x + radiusSemicircle, this.y + radiusSemicircle, radiusSemicircle, 0.5 * Math.PI, 1.5 * Math.PI);
    context.moveTo(this.x + radiusSemicircle, this.y);
    context.lineTo(this.x + lengthPlatform - radiusSemicircle, this.y);
    context.arc(this.x + lengthPlatform - radiusSemicircle, this.y + radiusSemicircle, radiusSemicircle, 1.5 * Math.PI, 2.5 * Math.PI);
    context.lineTo(this.x + radiusSemicircle, this.y + this.height);
    context.stroke();
    context.fill();
    context.closePath();
  }

  move(ball) {
    this.step = 15;
    this.maxPosition = WIDTH_CANVAS - lengthPlatform - widthBorderGamesField;
    this.minPosition = widthBorderGamesField;
    if (this.directionPlatform === DIRECTION_RIGHT) {
      this.x += this.step;
      if (this.x > this.maxPosition) {
        this.x = this.maxPosition;
      }
    } else if (this.directionPlatform === DIRECTION_LEFT) {
      this.x -= this.step;
      if (this.x < this.minPosition) {
        this.x = this.minPosition;
      }
    }
    if  (!Ball.isFlying) {
      ball.x = this.x + lengthPlatform / 2;
    }
    this.directionPlatform = "";
  }
}

class Brick {
  constructor(x, y, colorBrick) {
    this.x = x;
    this.y = y;
    this.colorBrick = colorBrick;
    this.isBroken = false;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.colorBrick;
    context.strokeStyle = "#000000";
    context.lineWidth = 1;
    context.fillRect(this.x, this.y, Brick.WIDTH, Brick.HEIGHT);
    context.strokeRect(this.x, this.y, Brick.WIDTH, Brick.HEIGHT);
    context.closePath();
  }
}

gameStart();

function gameStart() {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  canvas.width = WIDTH_CANVAS;
  canvas.height = HEIGHT_CANVAS;

  const gameContext = {
    balls: new Ball(xBall, yBall, 10),

    platforms: new Platform(xPlatform, yPlatform),

    bricks: [
      new Brick(700, 120, "#0d1dab"),
      new Brick(750, 120, "#3fab12"), //нарисовать красивую фигурку используя минимум цветов
      new Brick(700, 140, "#ab2c33"),
      new Brick(750, 160, "#fffa82"),
      new Brick(650, 120, "#3fab12"),
      new Brick(650, 160, "#fffa82"),
      new Brick(700, 180, "#0d1dab"),
      new Brick(700, 100, "#093714"),
      new Brick(750, 100, "#aba326"),
      new Brick(650, 180, "#ab2a22"),
      new Brick(650, 100, "#a541ab"),
      new Brick(650, 140, "#ab1085"),
      new Brick(700, 160, "#3e0030"),
      new Brick(750, 180, "#1b0015"),
      new Brick(750, 140, "#530b0e"),
    ],
  };

  Ball.isFlying = false;
  Ball.speed = 5;
  Brick.WIDTH = 50;
  Brick.HEIGHT = 20;

  window.addEventListener("keydown", (key) => {keyControl(key, gameContext.platforms)});

  gameLoop(context, gameContext, startGame);
}

function gameLoop(context, gameContext) {
  let beginAnimate = Date.now();
  let detection = beginAnimate - startGame;
  context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);
  if (detection > 18 && Ball.isFlying) {
    gameContext.balls.move(Ball.speed);
    startGame = beginAnimate;
  }
  gameContext.platforms.move(gameContext.balls);
  processBallCollision(gameContext.balls, gameContext.platforms);
  collisionDetection(gameContext.balls, gameContext.platforms);
  drawBorderGamesField(context);
  for (const brick of gameContext.bricks) {
    collisionBallAndBrick(gameContext.balls, brick);
  }
  gameContext.balls.draw(context);
  gameContext.platforms.draw(context);
  for (const brick of gameContext.bricks) {
    if (!brick.isBroken){
      brick.draw(context);
    }
  }
  requestAnimationFrame(function() {
    gameLoop(context, gameContext);
  });
}

function drawBorderGamesField(context) {
  const x = 0;
  const y = 0;
  context.beginPath();
  context.fillStyle = "#484848";
  context.moveTo(x, y);
  context.lineTo(x, y + HEIGHT_CANVAS);
  context.lineTo(x + widthBorderGamesField, y + HEIGHT_CANVAS);
  context.lineTo(x + widthBorderGamesField, y + widthBorderGamesField);
  context.lineTo(x + WIDTH_CANVAS - widthBorderGamesField, y + widthBorderGamesField);
  context.lineTo(x + WIDTH_CANVAS - widthBorderGamesField, y + HEIGHT_CANVAS);
  context.lineTo(x + WIDTH_CANVAS, y + HEIGHT_CANVAS);
  context.lineTo(x + WIDTH_CANVAS, y);
  context.lineTo(x, y);
  context.fill();
  context.closePath();
}

function keyControl(key, platform) {
  const definitionCodeKey = key.code;

  switch(definitionCodeKey) {
    case "ArrowRight": {
      platform.directionPlatform = DIRECTION_RIGHT;
    } break;
    case "ArrowLeft": {
      platform.directionPlatform = DIRECTION_LEFT;
    } break;
    case "Space": {
      Ball.isFlying = true;
    } break;
  }
}

function processBallCollision(ball, platform) {
  const ballLeft = ball.x;
  const ballRight = ball.x + ball.radius;

  if (ballLeft < ball.radius + widthBorderGamesField) {
    ball.setDirectionX(DIRECTION_RIGHT);
    ball.x = ball.radius + widthBorderGamesField;
  } else if (ballRight >= WIDTH_CANVAS - widthBorderGamesField) {
    ball.setDirectionX(DIRECTION_LEFT);
    ball.x = WIDTH_CANVAS - ball.radius - widthBorderGamesField;
  }

  const ballUp = ball.y;
  const ballDown = ball.y + ball.radius - widthBorderGamesField;

  if (ballUp < ball.radius + widthBorderGamesField) {
    ball.setDirectionY(DIRECTION_DOWN);
    ball.y = ball.radius + widthBorderGamesField;
  } else if (ballDown >= HEIGHT_CANVAS) {
    ball.setDirectionY(DIRECTION_UP);
    ball.setDirectionX(DIRECTION_LEFT);
    Ball.isFlying = false;
    ball.x = xBall;
    ball.y = yBall;
    platform.x = xPlatform;
    platform.y = yPlatform;
  }
}

function collisionDetection(ball, platform) {
  const coordX = ball.x + ball.radius;
  const coordY = ball.y + ball.radius;

  if (coordX >= platform.x && coordX <= platform.x + lengthPlatform && coordY >= yPlatform && coordY < yPlatform + platform.height) {
    ball.setDirectionY(DIRECTION_UP);
  }
}

function collisionBallAndBrick(ball, brick) {
  const coordX = ball.x + ball.radius;
  const coordY = ball.y + ball.radius;
  const coordXbelow = ball.x - ball.radius;
  const coordYbelow = ball.y - ball.radius;
  if (!brick.isBroken) {
    if (coordY >= brick.y && coordY <= brick.y + Brick.HEIGHT) {
      if (coordX > brick.x && coordX < brick.x + Brick.WIDTH) {
        ball.setDirectionY(DIRECTION_UP);
        brick.isBroken = true;
      }
    } else if (coordYbelow >= brick.y && coordYbelow <= brick.y + Brick.HEIGHT) {
      if (coordXbelow > brick.x && coordXbelow < brick.x + Brick.WIDTH) {
        ball.setDirectionY(DIRECTION_DOWN);
        brick.isBroken = true;
      }
    }
  }
}