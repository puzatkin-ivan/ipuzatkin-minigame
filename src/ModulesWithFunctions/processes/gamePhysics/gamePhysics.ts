import {collisionBallAndBorder} from "../collision/borderAndBall";
import {collisionBallAndPlatform} from "../collision/platformAndBall";
import {collisionBallAndBrick} from "../collision/brickAndBall";
import {GameContext} from "../../../ModulesWithClasses/GameContext";

export function processGamePhysics(gameContext: GameContext, deltaTime: number) {
  collisionBallAndBorder(gameContext.ball, gameContext.platform);
  collisionBallAndPlatform(gameContext.ball, gameContext.platform);
  for (const brick of gameContext.bricks) {
    collisionBallAndBrick(gameContext.ball, brick);
  }

  gameContext.ball.move(deltaTime);
  gameContext.platform.move(gameContext.ball, deltaTime);
}