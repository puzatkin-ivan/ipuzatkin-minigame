import * as CONSTANT from "../constants";
import {Ball} from "./Ball";

export class Platform {
  public _x: number;
  public _y: number;
  public _height: number;
  public _directionPlatform: string;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  draw(context: CanvasRenderingContext2D) {
    this._height = 20;
    const radiusSemicircle = this._height / 2;
    context.beginPath();
    context.fillStyle = "#3ac40f";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 3;
    context.arc(this._x + radiusSemicircle, this._y + radiusSemicircle, radiusSemicircle, 0.5 * Math.PI, 1.5 * Math.PI);
    context.moveTo(this._x + radiusSemicircle, this._y);
    context.lineTo(this._x + CONSTANT.LENGTH_PLATFORM - radiusSemicircle, this._y);
    context.arc(this._x + CONSTANT.LENGTH_PLATFORM - radiusSemicircle, this._y + radiusSemicircle, radiusSemicircle, 1.5 * Math.PI, 2.5 * Math.PI);
    context.lineTo(this._x + radiusSemicircle, this._y + this._height);
    context.stroke();
    context.fill();
    context.closePath();
  }

  move(ball: Ball, deltaTime: number) {
    const STEP: number = 500;
    const DELTA_MOVE: number = STEP * deltaTime / 1000;
    const MAX_POSITION: number = CONSTANT.WIDTH_CANVAS - CONSTANT.LENGTH_PLATFORM - CONSTANT.WIDTH_BORDER_GAMES_FIELD;
    const MIN_POSITION: number = CONSTANT.WIDTH_BORDER_GAMES_FIELD;
    if (this._directionPlatform === CONSTANT.DIRECTION.RIGHT) {
      this._x += DELTA_MOVE;
      if (this._x > MAX_POSITION) {
        this._x = MAX_POSITION;
      }
    } else if (this._directionPlatform === CONSTANT.DIRECTION.LEFT) {
      this._x -= DELTA_MOVE;
      if (this._x < MIN_POSITION) {
        this._x = MIN_POSITION;
      }
    }
    if  (!ball._isFlying) {
      ball._x = this._x + CONSTANT.LENGTH_PLATFORM / 2;
    }
    this._directionPlatform = "";
  }
}