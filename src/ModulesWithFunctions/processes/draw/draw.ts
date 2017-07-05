import * as CONSTANT from "../../../constants";
import {GameContext} from "../../../ModulesWithClasses/GameContext";

export function processDraw(canvasContext: CanvasRenderingContext2D, gameContext: GameContext) {
  canvasContext.clearRect(0, 0, CONSTANT.WIDTH_CANVAS, CONSTANT.HEIGHT_CANVAS);
  drawBorderGamesField(canvasContext);
  gameContext.ball.draw(canvasContext);
  gameContext.platform.draw(canvasContext);
  for (const brick of gameContext.bricks) {
    if (!brick._isBroken){
      brick.draw(canvasContext);
    }
  }
}

function drawBorderGamesField(context: CanvasRenderingContext2D) {
  const x = 0;
  const y = 0;
  context.beginPath();
  context.fillStyle = "#484848";
  context.moveTo(x, y);
  context.lineTo(x, y + CONSTANT.HEIGHT_CANVAS);
  context.lineTo(x + CONSTANT.WIDTH_BORDER_GAMES_FIELD, y + CONSTANT.HEIGHT_CANVAS);
  context.lineTo(x + CONSTANT.WIDTH_BORDER_GAMES_FIELD, y + CONSTANT.WIDTH_BORDER_GAMES_FIELD);
  context.lineTo(x + CONSTANT.WIDTH_CANVAS - CONSTANT.WIDTH_BORDER_GAMES_FIELD, y + CONSTANT.WIDTH_BORDER_GAMES_FIELD);
  context.lineTo(x + CONSTANT.WIDTH_CANVAS - CONSTANT.WIDTH_BORDER_GAMES_FIELD, y + CONSTANT.HEIGHT_CANVAS);
  context.lineTo(x + CONSTANT.WIDTH_CANVAS, y + CONSTANT.HEIGHT_CANVAS);
  context.lineTo(x + CONSTANT.WIDTH_CANVAS, y);
  context.lineTo(x, y);
  context.fill();
  context.closePath();
}