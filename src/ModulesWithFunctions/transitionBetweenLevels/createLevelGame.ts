import {createGameLevel1} from "./gameLevel1";
import {createGameLevel2} from "./gameLevel2";
import {GameContext} from "../../ModulesWithClasses/GameContext";

export function createLevelGame(gameContext: GameContext) {
  switch (gameContext.currentLevel) {
    case 1:
      gameContext.bricks = createGameLevel1();
      break;
    case 2:
      gameContext.bricks = createGameLevel2();
      break;
  }
}