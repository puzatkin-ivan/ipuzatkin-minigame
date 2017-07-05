import * as CONSTANT from "../../../constants";
import {Ball} from "../../../ModulesWithClasses/Ball";
import {Brick} from "../../../ModulesWithClasses/Brick";

export function collisionBallAndBrick(ball: Ball, brick: Brick) {
  const coordX = ball._x + ball._radius;
  const coordY = ball._y + ball._radius;
  const coordX2 = ball._x - ball._radius;
  const coordY2 = ball._y - ball._radius;

  if (!brick._isBroken) {
    if (coordX >= brick._x && coordX2 <= brick._x + Brick._WIDTH) {
      if (ball._directionX === CONSTANT.DIRECTION.RIGHT) {
        if (ball._directionY === CONSTANT.DIRECTION.DOWN) {
          if (coordY >= brick._y && coordY <= brick._y && coordX >= brick._x && coordX <= brick._x) {
            ball.setDirectionX(CONSTANT.DIRECTION.LEFT);
            ball.setDirectionY(CONSTANT.DIRECTION.UP);
            brick._isBroken = true;
          } else if (coordY >= brick._y && coordY <= brick._y) {
            ball.setDirectionY(CONSTANT.DIRECTION.UP);
            brick._isBroken = true;
          } else if (ball._y > brick._y && ball._y <= brick._y + Brick._HEIGHT) {
            ball.setDirectionX(CONSTANT.DIRECTION.LEFT);
            ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
            brick._isBroken = true;
          }
        } else if (ball._directionY === CONSTANT.DIRECTION.UP) {
          if (coordY2 >= brick._y && coordY2 <= brick._y && coordX >= brick._x && coordX <= brick._x) {
            ball.setDirectionX(CONSTANT.DIRECTION.LEFT);
            ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
            brick._isBroken = true;
          } else if (coordY2 >= brick._y && coordY2 <= brick._y) {
            ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
            brick._isBroken = true;
          } else if (ball._y > brick._y && ball._y <= brick._y + Brick._HEIGHT) {
            ball.setDirectionX(CONSTANT.DIRECTION.RIGHT);
            ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
            brick._isBroken = true;
          }
        }
      } else if (ball._directionX === CONSTANT.DIRECTION.LEFT) {
        if (ball._directionY === CONSTANT.DIRECTION.DOWN) {
          if (coordY >= brick._y && coordY <= brick._y && coordX2 >= brick._x && coordX2 <= brick._x) {
            ball.setDirectionX(CONSTANT.DIRECTION.RIGHT);
            ball.setDirectionY(CONSTANT.DIRECTION.UP);
            brick._isBroken = true;
          } else if (coordY >= brick._y && coordY <= brick._y) {
            ball.setDirectionY(CONSTANT.DIRECTION.UP);
            brick._isBroken = true;
          } else if (ball._y > brick._y && ball._y <= brick._y + Brick._HEIGHT) {
            ball.setDirectionX(CONSTANT.DIRECTION.RIGHT);
            ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
            brick._isBroken = true;
          }
        } else if (ball._directionY === CONSTANT.DIRECTION.UP) {
          if (coordY2 >= brick._y && coordY2 <= brick._y && coordX >= brick._x && coordX <= brick._x) {
            ball.setDirectionX(CONSTANT.DIRECTION.RIGHT);
            ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
            brick._isBroken = true;
          } else if (coordY2 >= brick._y && coordY2 <= brick._y) {
            ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
            brick._isBroken = true;
          } else if (ball._y > brick._y && ball._y <= brick._y + Brick._HEIGHT) {
            ball.setDirectionX(CONSTANT.DIRECTION.LEFT);
            ball.setDirectionY(CONSTANT.DIRECTION.DOWN);
            brick._isBroken = true;
          }
        }
      }
    }
  }
}