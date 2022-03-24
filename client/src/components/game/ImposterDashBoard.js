import React, {useEffect, useContext, useState} from 'react';
import {SocketContext} from '../../../pages/_app'
import styled from 'styled-components'
import { connect } from 'react-redux'
import GuessModal from './GuessModal'
import Countdown from 'react-countdown';
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
    const [numClues, setNumClues] = useState(rules.duration/5 - 1)
    const [currentTime, setCurrentTime] = useState(Date.now() + 1000*60*5)

    console.log(numClues)

    const Completionist = () => <span>TIME!</span>;
    const restartFunction = () => {
        if (numClues === 0) return;
        setNumClues(numClues => numClues - 1)
        setCurrentTime(Date.now() + 1000*60*5)
    }
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
        socket.on('useGuess', () => {
            setGuesses(guesses => guesses - 1)
        })
        socket.on('rewindGuess', () => {
            setGuesses(guesses => guesses - 1)
        })
        socket.on('crewmateResponse', data => {
            if (data.userResponse === true) {
                setCrewmatesInfo(crewmatesInfo => crewmatesInfo.map(crewmate => {
                    if (crewmate._id === data.user._id) {
                        return({...crewmate, alive: false})
                    } else {
                        return(crewmate)
                    }
                }))
            }
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
        const crewmateAlive = crewmatesInfo.find(crewmate => crewmate._id === crewmate_id).alive
        if (guesses > 0 && crewmateAlive === true) {
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
            <GuessDiv className="guess-div">
                <span>Guess: {guesses > 1 ? `You have ${guesses} left`: "NO MORE"} </span>
                {clues && <div>
                    <span>Next Clue: </span>
                    <Countdown date={currentTime} key={numClues} renderer={renderer} onComplete={restartFunction} />
                </div>}
            </GuessDiv>
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

const GuessDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #faf158;
    border-radius: 10px;
    min-height: 7em;
    width: 60%;
    margin: auto auto;
    }
`

const mapStateToProps = (state) => {
    return {
        user: state.user.info,
    };
};

export default connect(mapStateToProps, null)(ImposterDashBoard);
