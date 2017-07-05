import * as CONSTANT from "../../../constants";
import {Ball} from "../../../ModulesWithClasses/Ball";
import {Platform} from "../../../ModulesWithClasses/Platform";


export function collisionBallAndBorder(ball: Ball, platform: Platform) {
  const ballLeft = ball._x;
  const ballRight = ball._x + ball._radius;

  if (ballLeft < ball._radius + CONSTANT.WIDTH_BORDER_GAMES_FIELD) {
    ball.setDirectionX(CONSTANT.DIRECTION.RIGHT);
    ball._x = ball._radius + CONSTANT.WIDTH_BORDER_GAMES_FIELD;
  } else if (ballRight >= CONSTANT.WIDTH_CANVAS - CONSTANT.WIDTH_BORDER_GAMES_FIELD) {
    ball.setDirectionX(CONSTANT.DIRECTION.LEFT);
    ball._x = CONSTANT.WIDTH_CANVAS - ball._radius - CONSTANT.WIDTH_BORDER_GAMES_FIELD;
  }

  const ballUp = ball._y;
  const ballDown = ball._y + ball._radius - CONSTANT.WIDTH_BORDER_GAMES_FIELD;

  if (ballUp < ball._radius + CONSTANT.WIDTH_BORDER_GAMES_FIELD) {
    ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
    ball._y = ball._radius + CONSTANT.WIDTH_BORDER_GAMES_FIELD;
  } else if (ballDown >= CONSTANT.HEIGHT_CANVAS) {
    ball.setDirectionY(CONSTANT.DIRECTION.UP);
    ball.setDirectionX(CONSTANT.DIRECTION.LEFT);
    ball._isFlying = false;
    ball._x = CONSTANT.INITIAL_POSITION_BALL.X;
    ball._y = CONSTANT.INITIAL_POSITION_BALL.Y;
    platform._x = CONSTANT.INITIAL_POSITION_PLATFORM.X;
    platform._y = CONSTANT.INITIAL_POSITION_PLATFORM.Y;
  }
}