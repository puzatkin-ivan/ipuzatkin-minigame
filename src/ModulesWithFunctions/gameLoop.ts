import {GameContext} from "../ModulesWithClasses/GameContext";
import * as constant from "../constants";
import {processDraw} from "./processes/draw/draw";
import {processGamePhysics} from './processes/gamePhysics/gamePhysics';
import {transitionNextLevel} from "./transitionBetweenLevels/transitionNextLevel";

export function gameLoop(canvasContext: CanvasRenderingContext2D, gameContext: GameContext) {
  if (gameContext.keyMap.KEY_LEFT) {
    gameContext.platform._directionPlatform = constant.DIRECTION.LEFT;
  } else if (gameContext.keyMap.KEY_RIGHT) {
    gameContext.platform._directionPlatform = constant.DIRECTION.RIGHT;
  }
  if (gameContext.keyMap.KEY_SPACE) {
    if (!gameContext.ball._isFlying) {
      gameContext.ball._directionX = constant.DIRECTION.LEFT;
      gameContext.ball._directionY = constant.DIRECTION.UP;
    }
    gameContext.ball._isFlying = true;
  }

  let currentTimeFrame = Date.now();
  let deltaTime = currentTimeFrame - gameContext.lastTimeFrame;
  gameContext.lastTimeFrame = currentTimeFrame;

  processGamePhysics(gameContext, deltaTime);
  if (gameContext.isLevelOver()) {
    transitionNextLevel(gameContext);
  }
  processDraw(canvasContext, gameContext);
  requestAnimationFrame(function() {
    gameLoop(canvasContext, gameContext);
  });
}