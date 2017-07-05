import * as CONSTANT from "../../../constants";
import {Ball} from "../../../ModulesWithClasses/Ball";
import {Platform} from "../../../ModulesWithClasses/Platform";

export function collisionBallAndPlatform(ball: Ball, platform: Platform) {
  const coordXBall = ball._x + ball._radius;
  const coordYBall = ball._y + ball._radius;
  const coordXPlatform = platform._x + CONSTANT.LENGTH_PLATFORM;
  const coordYPlatform= platform._y + platform._height;

  if (coordXBall >= platform._x && coordXBall <= coordXPlatform && coordYBall >= platform._y && coordYBall < coordYPlatform) {
    ball.setDirectionY(CONSTANT.DIRECTION.UP);
  }
}