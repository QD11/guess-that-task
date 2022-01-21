import React from 'react'
import styled from 'styled-components'

const PlayerList = ({players}) => {
    

    return (
        <PlayerContainer>
            {players.map(player => 
                <li key={player._id}>
                    {player.name}
                </li>)}
        </PlayerContainer>
    )
}

const PlayerContainer = styled.ul`
    display: flex;
    flex-direction: column;
    width: 35%;
    // height: 70%;
    //border: 3px solid black;
    border-radius: 10px;
    background-color: #ffd892;
    // margin: auto;
    padding: 20px;
    margin-right: 20px;
    & li {
        list-style: none;
        border: 1px solid black;
        margin-bottom: 10px;
        font-size: 20px;
    }
`

export default PlayerList
