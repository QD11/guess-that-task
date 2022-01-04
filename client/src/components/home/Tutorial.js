import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { MdLiveHelp } from 'react-icons/md'

const Tutorial = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if(modal) {
            document.body.classList.add('active-modal')
        } else {
            document.body.classList.remove('active-modal')
        }
    }, [modal])

    return (
        <div>
            <HelpButton onClick={toggleModal}/>
            {modal && (
            <ModalDiv className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <div className="content">
                        <div className="rules">
                            <div className="rules-div">
                                <h2>Rules</h2>
                            </div>
                            <p>
                                Guess That Task is a social deduction game where the players are split between two teams, crewmate and imposter. Crewmates are randomly assigned a task that they must fulfill within a time limit. The imposter must correctly guess the crewmates&apos; tasks. The imposters have limited amount of guesses so guess wisely! Additional rules can be added, but that is the gist of this game.
                            </p>
                        </div>
                        <div className="split">
                            <div className="roles">
                                <div className="header">
                                    <h3>Crewmate</h3>
                                    <Image 
                                        src="/red-among-us-png.png"
                                        alt="crewmate"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                {/* <span>Complete your tasks!</span> */}
                                <ul>
                                    <li>The imposters must be aware that you&apos;re doing your task. Do not perform your tasks discreetly!</li>
                                    <li>Try to bait the imposters! Whatever action you&apos;re performing doesn&apos;t have to be your tasks.</li>
                                    <li>Work with each other!</li>
                                </ul>
                            </div>
                            <div className="roles">
                                <div className="header"> 
                                    <h3>Imposter</h3>
                                    <Image 
                                        src="/imposter.png"
                                        alt="imposter"
                                        width={130}
                                        height={90}
                                    />
                                </div>
                                {/* <span>Figure out what the crewmates are doing!</span> */}
                                <ul>
                                    <li>Guess wisely! You have limited guesses!</li>
                                    <li>You are given clues as time goes on! </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button className="close-modal" onClick={toggleModal}>
                    X
                    </button>
                </div>
            </ModalDiv>
        )}
        </div>
    )
}

const HelpButton = styled(MdLiveHelp)`
    font-size: 80px;
    cursor: pointer;
    color: #775312;
    transition-duration: 0.5s;
    &:hover {
        color: #e29100;
    }
`

const ModalDiv = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 1;

    .rules {
        .rules-div {
            display: flex;
            justify-content: center
        }
    }

    .split {
        display: flex;
        flex-direction: row;
    }

    .roles {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-right: 50px;
        .header {
            display: flex;
            align-items: center;
        }
    }

    .content {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    }

    .overlay {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        background: rgba(49,49,49,0.8);
    }

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1.4;
        background: #f1f1f1;
        padding: 14px 28px;
        border-radius: 3px;
        // min-width: 600px;
        // min-width: 300px;
        // width: fit-content;
        width: 700px;
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 10px;
        color: #730707;
        border-color: #730707;
        padding: 5px 7px;
        border-radius: 50%;
        cursor: pointer;
    }
`

export default Tutorial
