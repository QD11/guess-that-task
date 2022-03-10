import React, {useEffect, useContext, useState} from 'react';
import {SocketContext} from '../../../pages/_app'
import styled from 'styled-components'
import { connect } from 'react-redux'
import GuessModal from './GuessModal'
import { FaSkull } from 'react-icons/fa'
import Image from 'next/image'

const ImposterDashBoard = ({imposters, crewmates, user, rules}) => {
    const socket = useContext(SocketContext)
    const clues = rules.clues
    const [guesses, setGuesses] = useState(rules.guesses)
    const [modal, setModal] = useState(false)
    const [clickedCrewmate, setClickedCrewmate] = useState(null)
    const [crewmatesInfo, setCrewmatesInfo] = useState(crewmates.map(crewmate => ({
        name: crewmate.name,
        _id: crewmate._id,
        alive: true
    })))

    useEffect(() => {
        socket.on('useGuess', () => {
            setGuesses(guesses => guesses - 1)
        })
        socket.on('rewindGuess', () => {
            setGuesses(guesses => guesses - 1)
        })
        socket.on('crewmateResponse', data => {
            setCrewmatesInfo(crewmatesInfo => crewmatesInfo.map(crewmate => {
                if (crewmate._id === data._id) {
                    return({...crewmate, alive: false})
                } else {
                    return(crewmate)
                }
            }))
        })

        return () => {
            socket.removeAllListeners("useGuess");
            socket.removeAllListeners("rewindGuess");
            socket.removeAllListeners("crewmateResponse");
        }
    }, [socket])

    const toggleModal = () => {
        setModal(modal => !modal);
    };

    const handleGuess = (crewmate_id) => {
        if (guesses > 0) {
            setGuesses(guesses => guesses - 1)
            socket.emit('decreaseOtherGuesses')
            socket.emit('checkGuess', crewmate_id)
            setModal(modal => !modal);
        }
    }

    const handleClick = (crewmate) => {
        if (guesses > 0) {
            setClickedCrewmate(crewmate)
            setModal(modal => !modal)
        }
    }
    
    //add a condition to make it unclickable if dead

    return(
        <MainDiv>
            <GuessModal handleGuess={handleGuess} modal={modal} toggleModal={toggleModal} clickedCrewmate={clickedCrewmate} guesses={guesses}/>
            <PlayersDiv guesses={guesses}>
                {crewmatesInfo?.map(crewmate => <span onClick={() => handleClick(crewmate)} key={crewmate._id} className="player-status">{crewmate.name}{crewmate.alive? "😃":"☠️"}</span>)}
            </PlayersDiv>
            <div className="guess-div">
                <span>Guess: You have {guesses} {guesses > 1 ? "guesses":"guess"} left</span>
            </div>
        </MainDiv>
    )
};

const MainDiv = styled.div`
    display: flex;
    margin: 20px 0px;
    .guess-div {
        display: flex;
        flex-direction: column;
        padding: 10px;
        //border: 0.5px solid black;
        background-color: #faf158;
        border-radius: 10px;
        min-height: 3em;
    }
`

const PlayersDiv = styled.div`
    display: flex;
    flex-direction: column;
    // width: 20%;
    background-color: #faf158;
    border-radius: 10px;
    padding: 10px;
    .player-status {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
    }
    & span {
        margin: 5px 0 0 0;
        background: #fff no-repeat 50%;
        background-size: 40px 40px;
        padding: 10px 25px;
        border: 2px solid black;
        border-radius: 4px;
        transition: .3s ease-out;
        cursor: ${props => props.guesses && "pointer"}
    }
    overflow: auto;
`

const TaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    //border: 0.5px solid black;
    background-color: #faf158;
    border-radius: 10px;
    min-height: 7em;
    width: 60%;
    margin: auto auto;
    .title {
        margin: 0 auto;
        font-weight: bold;
        font-size: 20px;
    }
    .task {
        margin: 10px 0px;
        display: flex;
        font-size: 25px;
    }
    .task-image {
        margin: 20px 0px;
    }
    .extra {
        margin: 5px 0px;
    }
    .toggle-task {
        margin: 20px 0 0 0;
        background: #fff no-repeat 50%;
        background-size: 40px 40px;
        padding: 10px 25px;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: .3s ease-out;
        // :hover {
        //     transform: scale(1.05);
        // }
    }
`

const mapStateToProps = (state) => {
    return {
        user: state.user.info,
    };
};

export default connect(mapStateToProps, null)(ImposterDashBoard);
