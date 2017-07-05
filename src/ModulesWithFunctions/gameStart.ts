import {GameContext} from "../ModulesWithClasses/GameContext";
import * as constant from "../constants";
import {gameLoop} from "./gameLoop";

export function gameStart(gameContext: GameContext) {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const context: CanvasRenderingContext2D = canvas.getContext("2d");

  canvas.width = constant.WIDTH_CANVAS;
  canvas.height = constant.HEIGHT_CANVAS;

  const keyControl = function(key, isPressed) {
    const definitionCodeKey = key.code;

    switch(definitionCodeKey) {
      case "ArrowRight":
        gameContext.keyMap.KEY_RIGHT = isPressed;
        break;
      case "ArrowLeft":
        gameContext.keyMap.KEY_LEFT = isPressed;
        break;
      case "Space":
        gameContext.keyMap.KEY_SPACE = isPressed;
        break;
    }
  };

  window.addEventListener("keydown", (key) => {keyControl(key, true)});
  window.addEventListener("keyup", (key) => {keyControl(key, false)});

  gameLoop(context, gameContext);
}