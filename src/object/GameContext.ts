import {Ball} from "./Ball";
import {Brick} from "./Brick";
import {Platform} from "./Platform";
import {GameField} from "./GameField";

export class GameContext {
  public ball = new Ball();
  public platform = new Platform();
  public gameField = new GameField();
  public bricks: Brick[] = [];
  public keyMap = {
    KEY_LEFT: false,
    KEY_RIGHT: false,
    KEY_SPACE: false,
  };
  public lastTimeFrame = Date.now();
  private INITIAL_LEVEL_GAME = 0;
  public currentLevel = this.INITIAL_LEVEL_GAME;

  public isLevelOver() {
    for (const brick of this.bricks) {
      if (!brick._isBroken) {
        return false
      }
    }
    return true;
  }
}