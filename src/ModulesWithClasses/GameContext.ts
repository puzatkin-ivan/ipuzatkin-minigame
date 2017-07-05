import {Ball} from "./Ball";
import {INITIAL_LEVEL_GAME, INITIAL_POSITION_BALL, INITIAL_POSITION_PLATFORM} from "../constants";
import {Brick} from "./Brick";
import {Platform} from "./Platform";

export class GameContext {
  public ball = new Ball(INITIAL_POSITION_BALL.X, INITIAL_POSITION_BALL.Y);
  public platform = new Platform(INITIAL_POSITION_PLATFORM.X, INITIAL_POSITION_PLATFORM.Y);
  public bricks: Brick[] = [];
  public keyMap = {
    KEY_LEFT: false,
    KEY_RIGHT: false,
    KEY_SPACE: false,
  };
  public lastTimeFrame = Date.now();
  public currentLevel = INITIAL_LEVEL_GAME;

  public isLevelOver() {
    for (const brick of this.bricks) {
      if (!brick._isBroken) {
        return false
      }
    }
    return true;
  }
}