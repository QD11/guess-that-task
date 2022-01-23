import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { MdLiveHelp } from 'react-icons/md'

const RoleOverlay = () => {
    const [modal, setModal] = useState(true);

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
                        
                        <span>hey</span>
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
        & span {
            font-family: VCR OSD Mono;
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
