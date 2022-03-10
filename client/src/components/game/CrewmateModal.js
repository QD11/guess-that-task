import React, {useEffect, useContext} from 'react'
import styled from 'styled-components'
import {SocketContext} from '../../../pages/_app'
import { connect } from 'react-redux'

const CrewmateModal = ({modal, toggleModal, user, setAlive}) => {
    const socket = useContext(SocketContext)
    useEffect(() => {
        if(modal) {
            document.body.classList.add('active-modal')
        } else {
            document.body.classList.remove('active-modal')
        }
    }, [modal])

    const closeModal = (userResponse, user) => {
        const data = {userResponse: userResponse, user: user}
        socket.emit('respondToGuess', (data))
        if (userResponse === true) {
            // setAlive(alive => !alive)
            console.log("He dead")
            setAlive(false)
        }
        toggleModal()
    }

    return (
        <>
        {modal && (
            <ModalDiv className="modal">
                <div className="overlay"></div>
                <div className="modal-content">
                    <div className="content">
                        <Title>
                            Did the imposters guess your task correctly?
                        </Title>
                        <div className="bottom-container">
                            <div className="create-container">
                                <button onClick={() => closeModal(true, user)}>Yes</button>
                            </div>
                            <div className="create-container">
                                <button onClick={() => closeModal(false, user)}>No</button>
                            </div>
                        </div>
                    </div>
                    {/* <button className="close-modal" onClick={toggleModal}>
                    X
                    </button> */}
                </div>
            </ModalDiv>
        )}
        </>
    )
}

const Title = styled.h1`
    //font-family: VCR OSD Mono;
    //margin: auto auto;
    text-align: center;
    color: black;
    font-size: 30px;
    margin-block-start: 0em;
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

    .content {
        justify-content: space-around;
        flex-direction: column;
        background: #ffd892;
        .bottom-container {
            display: flex;
            justify-content: space-between;
            .middle-container {
                border-right: 3px solid #1a141466;
            }
            .create-container {
                width: 48%;
                .back-button{
                    background: red;
                    color: white;
                }
            }
            & button {
                font-size: 20px;
                background: #fff no-repeat 50%;
                background-size: 40px 40px;
                padding: 10px 25px;
                position: relative;
                border-radius: 4px;
                font-size: 20px;
                font-weight: 600;
                border: 0;
                width: 100%;
                height: 150%;
                // width: 10rem;
                cursor: pointer;
                outline: none;
                transition: .3s ease-out;
                :hover {
                    transform: scale(1.05);
                }
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1.4;
        background: #ffd892;
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

const mapStateToProps = (state) => {
    return {
        user: state.user.info,
    };
};

export default connect(mapStateToProps, null)(CrewmateModal);
