import {gameStart} from "./gameStart";
import {GameContext} from "../object/GameContext";
export namespace GameClient {
    export function initGameClient(socket: SocketIOClient.Socket) {
        socket.on('gameContext', (gameContext: GameContext) => {
            console.dir(gameContext);
            gameStart(gameContext)
        });
    }
}