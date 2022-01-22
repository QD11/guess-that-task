import React, {useEffect} from 'react';

const Game = ({socket}) => {

    useEffect(() => {
        socket?.on("playersInRoom", data => {
            console.log(data)
        })
    }, [socket])

    return(
        <div>
            <button onClick={() => socket?.emit("endGame")}>
                End Game
            </button>
        </div>
    )
};

export default Game;
