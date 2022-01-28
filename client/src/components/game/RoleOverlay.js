import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { MdLiveHelp } from 'react-icons/md'

const RoleOverlay = ({role}) => {
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
        <AllDiv>
            <HelpButton onClick={toggleModal}/>
            {modal && (
            <ModalDiv className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <div className="content">
                        <div className="info">
                        {role === 'imposter' ? 
                            <>
                                <span>Imposter</span>
                                <Image 
                                    src="/imposter.png"
                                    alt="imposter"
                                    width={140}
                                    height={140}
                                /> 
                            </>
                            :
                            <>
                                <span>Crewmate</span>
                                <Image 
                                    src="/red-among-us-png.png"
                                    alt="crewmate"
                                    width={80}
                                    height={170}
                                />
                            </>}
                        </div>
                        <div>
                            {role === 'imposter' ? 
                            <>
                                <p>
                                    Work with fellow imposters to correctly guess what the crewmates' tasks are within the time limit. 
                                </p>
                                <span>Win Condition:</span>
                                <ul>
                                    <li>Prevent the crewmates from completing their tasks.</li>
                                    <li>Kill crewmates by guessing their tasks. Their contributions to the required amount of tasks are gone once taken out.</li>
                                </ul>
                                <span>Rules:</span>
                                <ul>
                                    <li>You have limited amount of guesses.</li>
                                    <li>You don't have to guess exactly. Example: One of the tasks is to compliment another person multiple times. You guess correctly if you say the task is "To give compliments"</li>
                                    {/* <li>If the crewmates finish their required number of tasks, and you still have available guesses, then you can use them as last ditch efforts.</li> */}
                                    <li>Clues will be given throughout the game to either help you or sabotage the crewmates!</li>
                                </ul>
                                <span>Tips:</span>
                                <ul>
                                    <li>Guess wisely!</li>
                                    <li>Don't be baited by the crewmate's fake tasks!</li>
                                </ul>
                            </>
                            :
                            <>
                                <p>
                                    Complete your tasks with in the time limit! Work with each other to complete the required amount of tasks by the end of the game to win!
                                </p>
                                <span>Win Condition:</span>
                                <ul>
                                    <li>Complete your tasks. The crewmates must complete a certain number of tasks by the end of the game to win.</li>
                                </ul>
                                <span>Rules:</span>
                                <ul>
                                    <li>You MUST perform your task in front of the imposters. Do NOT perform it discreetly to give the imposters a chance.</li>
                                    <li>You are allowed to show your crewmates your tasks.</li>
                                </ul>
                                <span>Tips:</span>
                                <ul>
                                    <li>Try to bait the imposters into using up their guesses!</li>
                                </ul>
                            </>}
                        </div>
                    </div>
                    <button className="close-modal" onClick={toggleModal}>
                    X
                    </button>
                </div>
            </ModalDiv>
        )}
        </AllDiv>
    )
}

const AllDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`

const HelpButton = styled(MdLiveHelp)`
    font-size: 80px;
    // position: fixed;
    cursor: pointer;
    color: #775312;
    transition-duration: 0.5s;
    &:hover {
        color: #e29100;
    }

    // @media (min-width:320px){
    //     margin-bottom: 60px;
    // }
    // @media (min-width:600px){
    //     margin-bottom: 60px;
    // }
    // @media (min-width:1024px){
    //     width: 50%;
    // }
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
        width: 50%;
        .header {
            display: flex;
            align-items: center;
        }
    }

    .content {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        .info {
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin: auto;
            & span {
                display: flex; 
                justify-content: center;
                font-size: 50px;
                font-family: VCR OSD Mono;
            }
        }
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
        overflow-y: auto;
        // min-width: 600px;
        // min-width: 300px;
        // width: fit-content;
        // width: 700px;

        @media (min-width:320px){
            width: 90%;
            height: 70%;
        }
        @media (min-width:600px){
            width: 75%;
            height: 70%;
        }
        @media (min-width:1024px){
            width: 50%;
        }
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

export default RoleOverlay;
