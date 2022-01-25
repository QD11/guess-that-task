import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import RoleOverlay from './RoleOverlay'
import Countdown from 'react-countdown';

const Game = ({socket, imposters, user, rules}) => {
    const [role, setRole] = useState(imposters.some(player => player._id === user._id)? "imposter" : "crewmate")

    const Completionist = () => <span>TIME!</span>;
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
            return <Completionist />;
        } else {
          // Render a countdown
            return <span>{minutes}:{seconds}</span>;
        }
    };

    return(
        <MainContainer>
            <div className="header">
                <span className="role">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                <Countdown date={Date.now() + 1000*60*rules.duration} renderer={renderer} />
                <RoleOverlay role={role}/>
            </div>
            <button onClick={() => socket?.emit("endGame")}>
                End Game
            </button>
        </MainContainer>
    )
};

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    @media (min-width:320px){
        width: 98%;
    }
    @media (min-width:600px){
        width: 75%;
    }
    @media (min-width:900px){
        // margin-top: 50px;
        width: 80%;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .role {
            font-family: VCR OSD Mono;
            font-weight: bold;
            font-size: 50px;
        }
    }
`

export default Game;
