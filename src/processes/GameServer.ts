import {GameContext} from "../object/GameContext";
export namespace GameServer {
  let gameContext = new GameContext;

  export function initGameServer(socketServer: SocketIO.Server) {
    socketServer.on("connection", (socket: SocketIO.Socket) => {
      socket.emit('gameContext', gameContext);
    })
  }
}