import React, {useEffect} from 'react';

const Game = ({socket, owner}) => {
    
    useEffect(() => {
        socket.on('playersInRoom', data => {
            console.log(data)
        })
    }, [])


    return(
        <div>
            <button onClick={() => socket?.emit("endGame")}>
                End Game
            </button>
        </div>
    )
};

export default Game;
