import {GameContext} from "./GameContext";

export class GameField {
  public WIDTH_CANVAS: number;
  public HEIGHT_CANVAS: number;
  public WIDTH_BORDER_GAMES_FIELD: number;

  constructor() {
    this.WIDTH_CANVAS = 1500;
    this.HEIGHT_CANVAS = 600;
    this.WIDTH_BORDER_GAMES_FIELD = 25;
  }

  drawBorderGamesField(context: CanvasRenderingContext2D) {
    const x = 0;
    const y = 0;
    context.beginPath();
    context.fillStyle = "#484848";
    context.moveTo(x, y);
    context.lineTo(x, y + this.HEIGHT_CANVAS);
    context.lineTo(x + this.WIDTH_BORDER_GAMES_FIELD, y + this.HEIGHT_CANVAS);
    context.lineTo(x + this.WIDTH_BORDER_GAMES_FIELD, y + this.WIDTH_BORDER_GAMES_FIELD);
    context.lineTo(x + this.WIDTH_CANVAS - this.WIDTH_BORDER_GAMES_FIELD, y + this.WIDTH_BORDER_GAMES_FIELD);
    context.lineTo(x + this.WIDTH_CANVAS - this.WIDTH_BORDER_GAMES_FIELD, y + this.HEIGHT_CANVAS);
    context.lineTo(x + this.WIDTH_CANVAS, y + this.HEIGHT_CANVAS);
    context.lineTo(x + this.WIDTH_CANVAS, y);
    context.lineTo(x, y);
    context.fill();
    context.closePath();
  }

  draw(canvasContext: CanvasRenderingContext2D, gameContext: GameContext) {
    canvasContext.clearRect(0, 0, this.WIDTH_CANVAS, this.HEIGHT_CANVAS);
    this.drawBorderGamesField(canvasContext);
    gameContext.ball.draw(canvasContext);
    gameContext.platform.draw(canvasContext);
    for (const brick of gameContext.bricks) {
      if (!brick._isBroken){
        brick.draw(canvasContext);
      }
    }
  }
}