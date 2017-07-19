import {GameContext} from "../object/GameContext";
import {GameField} from "../object/GameField";

export function gameLoop(canvasContext: CanvasRenderingContext2D, gameContext: GameContext) {
  GameField.draw(canvasContext);
  gameContext.ball.draw(canvasContext);
  gameContext.platform.draw(canvasContext);
}
