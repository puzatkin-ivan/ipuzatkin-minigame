'use strict';

const WIDTH_CANVAS = 1500;
const HEIGHT_CANVAS = 600;
const DIRECTION_UP = "direction_up";
const DIRECTION_LEFT = "direction_left";
const DIRECTION_RIGHT = "direction_right";
const DIRECTION_DOWN = "direction_down";
const WIDTH_BORDER_GAMES_FIELD = 20;
const INITIAL_POSITION_BALL_X = WIDTH_CANVAS / 2;
const INITIAL_POSITION_BALL_Y = 505;
const LENGTH_PLATFORM = 100;
const INITIAL_POSITION_PLATFORM_X = INITIAL_POSITION_BALL_X - LENGTH_PLATFORM / 2;
const INITIAL_POSITION_PLATFORM_Y = 515;
const TIME_BETWEEN_FRAMES = 1000 / 60;

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isFlying = false;
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

  move(deltaTime) { //сделать првильную физику
    const SPEED = 200;
    const DELTA_MOVE = SPEED * deltaTime / 1000;
    if (this.isFlying) {
      this.x += (this.directionX === DIRECTION_RIGHT) ? DELTA_MOVE : -DELTA_MOVE;
      this.y += (this.directionY === DIRECTION_DOWN) ? DELTA_MOVE : -DELTA_MOVE;
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
    context.lineTo(this.x + LENGTH_PLATFORM - radiusSemicircle, this.y);
    context.arc(this.x + LENGTH_PLATFORM - radiusSemicircle, this.y + radiusSemicircle, radiusSemicircle, 1.5 * Math.PI, 2.5 * Math.PI);
    context.lineTo(this.x + radiusSemicircle, this.y + this.height);
    context.stroke();
    context.fill();
    context.closePath();
  }

  move(ball, deltaTime) {
    const STEP = 500;
    const DELTA_MOVE = STEP * deltaTime / 1000;
    const MAX_POSITION = WIDTH_CANVAS - LENGTH_PLATFORM - WIDTH_BORDER_GAMES_FIELD;
    const MIN_POSITION = WIDTH_BORDER_GAMES_FIELD;
    if (this.directionPlatform === DIRECTION_RIGHT) {
      this.x += DELTA_MOVE;
      if (this.x > MAX_POSITION) {
        this.x = MAX_POSITION;
      }
    } else if (this.directionPlatform === DIRECTION_LEFT) {
      this.x -= DELTA_MOVE;
      if (this.x < MIN_POSITION) {
        this.x = MIN_POSITION;
      }
    }
    if  (!ball.isFlying) {
      ball.x = this.x + LENGTH_PLATFORM / 2;
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

class ConrolLevelGame{
  constructor() {
  }

  transitionNextLevel(bricks) {
    for (const brick of bricks) {
      if (!brick.isBroken) {
        this.isTransition = false;
        break;
      } else {
        this.isTransition = true;
      }
    }
  }
}

function gameStart() {
  const CANVAS = document.getElementById("canvas");
  const context = CANVAS.getContext("2d");

  CANVAS.width = WIDTH_CANVAS;
  CANVAS.height = HEIGHT_CANVAS;

  const gameContext = {
    ball: new Ball(INITIAL_POSITION_BALL_X, INITIAL_POSITION_BALL_Y),

    platform: new Platform(INITIAL_POSITION_PLATFORM_X, INITIAL_POSITION_PLATFORM_Y),

    bricks: [
      new Brick(20, 20, "#0d1dab"),
      new Brick(70, 40, "#3fab12"),
      new Brick(120, 60, "#ab2c33"),
      new Brick(170, 80, "#fffa82"),
      new Brick(220, 100, "#3fab12"),
      new Brick(270, 120, "#fffa82"),
      new Brick(320, 140, "#0d1dab"),
      new Brick(370, 160, "#093714"),
      new Brick(420, 180, "#aba326"),
      new Brick(470, 200, "#ab2a22"),
      new Brick(70, 20, "#fffa82"),
      new Brick(120, 20, "#ab2c33"),
      new Brick(120, 40, "#fffa82"),
      new Brick(170, 20, "#3fab12"),
      new Brick(170,  40, "#fffa82"),
      new Brick(170, 60, "#0d1dab"),
      new Brick(220, 60, "#093714"),
      new Brick(220, 80, "#aba326"),
      new Brick(220, 20, "#ab2a22"),
      new Brick(220, 40, "#aba326"),
      new Brick(270, 20, "#0d1dab"),
      new Brick(270, 40, "#3fab12"),
      new Brick(270, 60, "#ab2c33"),
      new Brick(270, 80, "#fffa82"),
      new Brick(270, 100, "#3fab12"),
      new Brick(270, 120, "#fffa82"),
      new Brick(320, 20, "#0d1dab"),
      new Brick(320, 40, "#093714"),
      new Brick(320, 60, "#aba326"),
      new Brick(320, 80, "#ab2a22"),
      new Brick(320, 100, "#fffa82"),
      new Brick(320, 120, "#ab2c33"),
      new Brick(370, 20, "#0d1dab"),
      new Brick(370, 40, "#093714"),
      new Brick(370, 60, "#aba326"),
      new Brick(370, 80, "#ab2a22"),
      new Brick(370, 100, "#fffa82"),
      new Brick(370, 120, "#ab2c33"),
      new Brick(370, 140, "#ab2c33"),


    ],

    bricksLevel2: [
      new Brick(700, 120, "#0d1dab"),
      new Brick(750, 120, "#3fab12"),
      new Brick(700, 140, "#ab2c33"),
      new Brick(750, 160, "#fffa82"),
      new Brick(650, 120, "#3fab12"),
      new Brick(650, 160, "#fffa82"),
      new Brick(700, 180, "#0d1dab"),
    ],

    controlGame: new ConrolLevelGame(),
  };

  Brick.WIDTH = 50;
  Brick.HEIGHT = 20;

  window.addEventListener("keydown", (key) => {keyControl(key, true)});
  window.addEventListener("keyup", (key) => {keyControl(key, false)});

  const bunchKey = {
    KEY_LEFT: false,
    KEY_RIGHT: false,
    KEY_SPACE: false,
  };

  const keyControl = function(key, isPressed) {
    const definitionCodeKey = key.code;

    switch(definitionCodeKey) {
      case "ArrowRight":
        bunchKey.KEY_RIGHT = isPressed;
       break;
      case "ArrowLeft":
        bunchKey.KEY_LEFT = isPressed;
       break;
      case "Space":
        bunchKey.KEY_SPACE = isPressed;
      break;
    }
  };

  let lastTimeFrame = Date.now();
  const gameLoop = function(canvasContext, gameContext) {
    context.clearRect(0, 0, WIDTH_CANVAS, HEIGHT_CANVAS);

    if (bunchKey.KEY_LEFT) {
      gameContext.platform.directionPlatform = DIRECTION_LEFT;
    } else if (bunchKey.KEY_RIGHT) {
      gameContext.platform.directionPlatform = DIRECTION_RIGHT;
    }
    if (bunchKey.KEY_SPACE) {
      gameContext.ball.isFlying = true;
    }

    let currentTimeFrame = Date.now();
    let deltaTime = currentTimeFrame - lastTimeFrame;
    if (deltaTime > TIME_BETWEEN_FRAMES) {
      lastTimeFrame = currentTimeFrame;
    }
    gameContext.ball.move(deltaTime);
    gameContext.platform.move(gameContext.ball, deltaTime);
    collisionBallAndBorder(gameContext.ball, gameContext.platform);
    collisionBallAndPlatform(gameContext.ball, gameContext.platform);
    drawBorderGamesField(canvasContext);
    gameContext.controlGame.transitionNextLevel(gameContext.bricks);
    for (const brick of gameContext.bricks) {
      collisionBallAndBrick(gameContext.ball, brick);
    }
    if (gameContext.controlGame.isTransition) {
      gameContext.bricks = gameContext.bricksLevel2;
    }

    gameContext.ball.draw(canvasContext);
    gameContext.platform.draw(canvasContext);
    for (const brick of gameContext.bricks) {
      if (!brick.isBroken){
        brick.draw(canvasContext);
      }
    }

    requestAnimationFrame(function() {
      gameLoop(canvasContext, gameContext);
    });
  };

  gameLoop(context, gameContext);
}

gameStart();

function drawBorderGamesField(context) {
  const x = 0;
  const y = 0;
  context.beginPath();
  context.fillStyle = "#484848";
  context.moveTo(x, y);
  context.lineTo(x, y + HEIGHT_CANVAS);
  context.lineTo(x + WIDTH_BORDER_GAMES_FIELD, y + HEIGHT_CANVAS);
  context.lineTo(x + WIDTH_BORDER_GAMES_FIELD, y + WIDTH_BORDER_GAMES_FIELD);
  context.lineTo(x + WIDTH_CANVAS - WIDTH_BORDER_GAMES_FIELD, y + WIDTH_BORDER_GAMES_FIELD);
  context.lineTo(x + WIDTH_CANVAS - WIDTH_BORDER_GAMES_FIELD, y + HEIGHT_CANVAS);
  context.lineTo(x + WIDTH_CANVAS, y + HEIGHT_CANVAS);
  context.lineTo(x + WIDTH_CANVAS, y);
  context.lineTo(x, y);
  context.fill();
  context.closePath();
}

function collisionBallAndBorder(ball, platform) {
  const ballLeft = ball.x;
  const ballRight = ball.x + ball.radius;

  if (ballLeft < ball.radius + WIDTH_BORDER_GAMES_FIELD) {
    ball.setDirectionX(DIRECTION_RIGHT);
    ball.x = ball.radius + WIDTH_BORDER_GAMES_FIELD;
  } else if (ballRight >= WIDTH_CANVAS - WIDTH_BORDER_GAMES_FIELD) {
    ball.setDirectionX(DIRECTION_LEFT);
    ball.x = WIDTH_CANVAS - ball.radius - WIDTH_BORDER_GAMES_FIELD;
  }

  const ballUp = ball.y;
  const ballDown = ball.y + ball.radius - WIDTH_BORDER_GAMES_FIELD;

  if (ballUp < ball.radius + WIDTH_BORDER_GAMES_FIELD) {
    ball.setDirectionY(DIRECTION_DOWN);
    ball.y = ball.radius + WIDTH_BORDER_GAMES_FIELD;
  } else if (ballDown >= HEIGHT_CANVAS) {
    ball.setDirectionY(DIRECTION_UP);
    ball.setDirectionX(DIRECTION_LEFT);
    ball.isFlying = false;
    ball.x = INITIAL_POSITION_BALL_X;
    ball.y = INITIAL_POSITION_BALL_Y;
    platform.x = INITIAL_POSITION_PLATFORM_X;
    platform.y = INITIAL_POSITION_PLATFORM_Y;
  }
}

function collisionBallAndPlatform(ball, platform) {
  const coordX = ball.x + ball.radius;
  const coordY = ball.y + ball.radius;

  if (coordX >= platform.x && coordX <= platform.x + LENGTH_PLATFORM && coordY >= INITIAL_POSITION_PLATFORM_Y && coordY < INITIAL_POSITION_PLATFORM_Y + platform.height) {
    ball.setDirectionY(DIRECTION_UP);
  }
}

function collisionBallAndBrick(ball, brick) {//доделать физику попытаться сделать так чтобы коллизию мячика с платфоромй и с кирпичиками одинаково(хотя бы попытаться)
  const coordX = ball.x + ball.radius;
  const coordY = ball.y + ball.radius;
  const coordXbelow = ball.x - ball.radius;
  const coordYbelow = ball.y - ball.radius;

  if (!brick.isBroken) {
    if (coordX >= brick.x && coordXbelow <= brick.x + Brick.WIDTH) {
      if (ball.directionX === DIRECTION_RIGHT) {
        if (ball.directionY === DIRECTION_DOWN) {
          if (coordY >= brick.y && coordY <= brick.y + 5 && coordX >= brick.x && coordX <= brick.x + 3) {
            ball.setDirectionX(DIRECTION_LEFT);
            ball.setDirectionY(DIRECTION_UP);
            brick.isBroken = true;
          } else if (coordY >= brick.y && coordY <= brick.y + 5) {
            ball.setDirectionY(DIRECTION_UP);
            brick.isBroken = true;
          } else if (ball.y > brick.y && ball.y <= brick.y + Brick.HEIGHT) {
            ball.setDirectionX(DIRECTION_LEFT);
            ball.setDirectionY(DIRECTION_DOWN);
            brick.isBroken = true;
          }
        } else if (ball.directionY === DIRECTION_UP) {
          if (coordYbelow >= brick.y && coordYbelow <= brick.y + 5 && coordX >= brick.x && coordX <= brick.x + 3) {
            ball.setDirectionX(DIRECTION_LEFT);
            ball.setDirectionY(DIRECTION_DOWN);
            brick.isBroken = true;
          } else if (coordYbelow >= brick.y && coordYbelow <= brick.y + 5) {
            ball.setDirectionY(DIRECTION_DOWN);
            brick.isBroken = true;
          } else if (ball.y > brick.y && ball.y <= brick.y + Brick.HEIGHT) {
            ball.setDirectionX(DIRECTION_RIGHT);
            ball.setDirectionY(DIRECTION_DOWN);
            brick.isBroken = true;
          }
        }
      } else if (ball.directionX === DIRECTION_LEFT) {
        if (ball.directionY === DIRECTION_DOWN) {
          if (coordY >= brick.y && coordY <= brick.y + 5 && coordXbelow >= brick.x && coordXbelow <= brick.x + 3) {
            ball.setDirectionX(DIRECTION_RIGHT);
            ball.setDirectionY(DIRECTION_UP);
            brick.isBroken = true;
          } else if (coordY >= brick.y && coordY <= brick.y + 5) {
            ball.setDirectionY(DIRECTION_UP);
            brick.isBroken = true;
          } else if (ball.y > brick.y && ball.y <= brick.y + Brick.HEIGHT) {
            ball.setDirectionX(DIRECTION_RIGHT);
            ball.setDirectionY(DIRECTION_DOWN);
            brick.isBroken = true;
          }
        } else if (ball.directionY === DIRECTION_UP) {
          if (coordYbelow >= brick.y && coordYbelow <= brick.y + 5 && coordX >= brick.x && coordX <= brick.x + 3) {
            ball.setDirectionX(DIRECTION_RIGHT);
            ball.setDirectionY(DIRECTION_DOWN);
            brick.isBroken = true;
          } else if (coordYbelow >= brick.y && coordYbelow <= brick.y + 5) {
            ball.setDirectionY(DIRECTION_DOWN);
            brick.isBroken = true;
          } else if (ball.y > brick.y && ball.y <= brick.y + Brick.HEIGHT) {
            ball.setDirectionX(DIRECTION_LEFT);
            ball.setDirectionY(DIRECTION_DOWN);
            brick.isBroken = true;
          }
        }
      }
    }
  }
}