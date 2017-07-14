export namespace GameServer {
    export function initGameServer(socketServer: SocketIO.Server) {
        socketServer.on("connection", (socket: SocketIO.Socket) => {
           console.log(socket.id);
        })
    }
}