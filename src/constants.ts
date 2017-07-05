export const WIDTH_CANVAS = 1500;
export const HEIGHT_CANVAS = 600;

export const DIRECTION = {
  UP: "direction_up",
  LEFT: "direction_left",
  RIGHT: "direction_right",
  DOWN: "direction_down",
};

export const LENGTH_PLATFORM = 100;

export const INITIAL_POSITION_BALL = {
  X: WIDTH_CANVAS / 2,
  Y: 505,
};

export const INITIAL_POSITION_PLATFORM = {
  X: INITIAL_POSITION_BALL.X - LENGTH_PLATFORM / 2,
  Y: 515,
};

export const WIDTH_BORDER_GAMES_FIELD = 25;
export const INITIAL_LEVEL_GAME = 0;