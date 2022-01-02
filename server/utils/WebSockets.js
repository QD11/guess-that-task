class WebSockets {
    players = [];
    connection(client) {
    // event fired when the chat lobby is disconnected
    client.on("disconnect", () => {
        this.players = this.players.filter((player) => player.socketId !== client.id);
    });
    // add identity of player mapped to the socket id
    client.on("identity", (playerId) => {
        this.players.push({
        socketId: client.id,
        playerId: playerId,
        });
    });
    // subscribe person to chat & other player as well
    client.on("subscribe", (lobby, otherPlayerId = "") => {
        this.subscribeOtherPlayer(lobby, otherPlayerId);
        client.join(lobby);
    });
    // mute a chat lobby
    client.on("unsubscribe", (lobby) => {
        client.leave(lobby);
    });
    }

    subscribeOtherPlayer(lobby, otherPlayerId) {
    const playerSockets = this.players.filter(
        (player) => player.playerId === otherPlayerId
    );
    playerSockets.map((playerInfo) => {
        const socketConn = global.io.sockets.connected(playerInfo.socketId);
        if (socketConn) {
        socketConn.join(lobby);
        }
    });
    }
}

export default new WebSockets();