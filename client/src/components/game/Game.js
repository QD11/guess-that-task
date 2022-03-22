import React, {useEffect, useContext} from 'react';
import styled from 'styled-components'
import RoleOverlay from './RoleOverlay'
import Countdown from 'react-countdown';
import CrewmateDashBoard from './CrewmateDashBoard'
import ImposterDashBoard from './ImposterDashBoard'
import { connect } from 'react-redux'
import {SocketContext} from '../../../pages/_app'

const Game = ({imposters, user, rules, owner, players}) => {
    const role = imposters.some(player => player._id === user._id)? "imposter" : "crewmate"
    const crewmates = players.filter(player => !imposters.some(imposter => imposter._id === player._id) && player._id !== user._id)
    const socket = useContext(SocketContext)

    const Completionist = () => <TimeSpan>TIME!</TimeSpan>;
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
            return <Completionist />;
        } else {
          // Render a countdown
            return <TimeSpan>{minutes < 10? "0" + minutes: minutes}:{seconds < 10? "0" + seconds : seconds}</TimeSpan>;
        }
    };
    
    useEffect(() => {
        if (owner) {
            socket.emit('sendTask', players)
        }
    }, [])

    return(
        <MainContainer>
            <div className="header">
                <span className="role">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                <Countdown date={Date.now() + 1000*60*rules.duration} renderer={renderer} precision={2} />
                <RoleOverlay role={role}/>
            </div>
            {role === 'crewmate' ? 
                <CrewmateDashBoard imposters={imposters} crewmates={crewmates}/> 
                : 
                <ImposterDashBoard imposters={imposters} crewmates={crewmates} rules={rules}/>
            }
            <button className="endgame" onClick={() => socket?.emit("endGame")}>
                End Game
            </button>
        </MainContainer>
    )
};

const TimeSpan = styled.span`
    font-family: VCR OSD Mono;
    font-weight: bold;
    font-size: 50px;
`

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
        width: 90%;
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

const mapStateToProps = (state) => {
    return {
        user: state.user.info,
    };
};

export default connect(mapStateToProps, null)(Game);

// export default Game