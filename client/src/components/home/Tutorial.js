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
                        <div className="roles">
                            <span>Crewmate</span>
                            <Image 
                                src="/red-among-us-png.png"
                                alt="crewmate"
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className="roles">
                            <span>Imposter</span>
                            <Image 
                                src="/imposter.png"
                                alt="imposter"
                                width={110}
                                height={60}
                            />
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

    .roles {
        display: flex;
        align-items: center;
    }

    .content {
        display: flex;
        justify-content: space-around;
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
        min-width: 600px;
        // min-width: 300px;
        width: fit-content;
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 7px;
    }
`

export default Tutorial
