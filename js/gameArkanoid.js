'use strict';

const WIDTH_CANVAS = 1500;
const HEIGHT_CANVAS = 600;
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
    context.strokeStyle = "#484848";
    context.lineWidth = 10;
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + HEIGHT_CANVAS);
    context.lineTo(this.x + 20, this.y + HEIGHT_CANVAS);
    context.lineTo(this.x + 20, this.y + 20);
    context.lineTo(this.x + WIDTH_CANVAS - 20, this.y + 20);
    context.lineTo(this.x + WIDTH_CANVAS - 20, this.y + HEIGHT_CANVAS);
    context.lineTo(this.x + WIDTH_CANVAS, this.y + HEIGHT_CANVAS + 5);
    context.lineTo(this.x + WIDTH_CANVAS, this.y);
    context.lineTo(this.x, this.y);
    context.stroke();
    context.closePath();
  }
}

class Ball {
  constructor(xBall, yBall) {
    this.x = xBall;
    this.y = yBall;
    this.radiusBall = 15;
    this.WIDTH = 15;
    this.HEIGHT = 15;
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
    context.arc(this.x + 5, this.y - 7, 3, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  moveBall(speed) {
    this.x += (this.directionX === DIRECTION_RIGHT) ? speed : -speed;
    this.y += (this.directionY === DIRECTION_DOWN) ? speed : -speed;
  }
}

class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
    context.fillStyle = "#44ff25";
    context.fillRect(this.x, this.y - 10, 100, 20);
  }
}

const gameContext = {
  gamesBackground: [
    new GameBackground(0, 0),
  ],

  balls: [
    new Ball(750, 500),
  ],

  platforms: [
    new Platform(700, 530),
  ],

};

const gameLoop = function(context, gameContext) {
  for (const gameBackground of gameContext.gamesBackground) {
    gameBackground.drawBackground(context);
  }
  for (const ball of gameContext.balls) {
    ball.drawBall(context);
  }
  for (const platform of gameContext.platforms) {
    platform.draw(context);
  }
};

gameLoop(context, gameContext);