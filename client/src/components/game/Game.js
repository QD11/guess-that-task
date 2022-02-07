import React, {useEffect, useContext} from 'react';
import styled from 'styled-components'
import RoleOverlay from './RoleOverlay'
import Countdown from 'react-countdown';
import CrewmateDashBoard from './CrewmateDashBoard'
import ImposterDashBoard from './ImposterDashBoard'

import {SocketContext} from '../../../pages/_app'

const Game = ({imposters, user, rules, owner, players}) => {
    const role = imposters.some(player => player._id === user._id)? "imposter" : "crewmate"
    const crewmates = players.filter(player => !imposters.some(imposter => imposter._id === player._id) && player._id !== user._id)
    const socket = useContext(SocketContext)

    console.log(crewmates)

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
    
    useEffect(() => {
        if (owner) {
            socket.emit('sendTask', players)
        }
    }, [])
    console.log(role)

    return(
        <MainContainer>
            <div className="header">
                <span className="role">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                <Countdown date={Date.now() + 1000*60*rules.duration} renderer={renderer} />
                <RoleOverlay role={role}/>
            </div>
            {role === 'crewmate' ? 
                <CrewmateDashBoard imposters={imposters} crewmates={crewmates}/> 
                : 
                <ImposterDashBoard imposters={imposters} crewmates={crewmates}/>
            }
            <button className="endgame" onClick={() => socket?.emit("endGame")}>
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
    .endgame {
        background: #fff no-repeat 50%;
        background-size: 40px 40px;
        padding: 10px 25px;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: .3s ease-out;
    }
`

export default Game;
