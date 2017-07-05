import * as CONSTANT from "../../constants";
import {createLevelGame} from "./createLevelGame"
import {GameContext} from "../../ModulesWithClasses/GameContext";

export function transitionNextLevel(gameContext: GameContext) {
  gameContext.ball._x = CONSTANT.INITIAL_POSITION_BALL.X;
  gameContext.ball._y = CONSTANT.INITIAL_POSITION_BALL.Y;
  gameContext.ball._isFlying = false;
  gameContext.platform._x = CONSTANT.INITIAL_POSITION_PLATFORM.X;
  gameContext.platform._y = CONSTANT.INITIAL_POSITION_PLATFORM.Y;
  gameContext.currentLevel = gameContext.currentLevel % 2 + 1;
  createLevelGame(gameContext);
}