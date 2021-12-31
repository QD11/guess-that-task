import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import React, {useState} from 'react'
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router'

const Home = () => {
    const router = useRouter()
    const [name, setName] = useState(uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2,
        style: 'capital',
        separator: ' ',
    }))
    const [toggleJoinLobby, setToggleJoinLobby] = useState(false)
    const [lobbyCode, setLobbyCode] = useState('')
    
    const createLobby = () => {
        const newCode = uuid().slice(0,6).toUpperCase()
        //create the lobby in the backend
        router.push(`/${newCode}`)
    }

    const joinLobby = () => {
        //check if lobby code exists
        router.push(`/${lobbyCode}`)
    }

    return (
        <>
            <Head>
                <title>Guess That Task</title>
                <link rel="shortcut icon" href="/tasks.png" />
            </Head>
            {/* <Title>
                Guess That Task!
            </Title> */}
            <Center>
                {toggleJoinLobby ? 
                    <>
                        <input 
                            className="input-code"
                            maxLength="6"
                            value={lobbyCode}
                            onChange={e => setLobbyCode(e.target.value.toUpperCase())}
                        />
                        <input 
                            className="name-input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div className="bottom-container">
                            <div className="create-container">
                                <button className="back-button" onClick={() => setToggleJoinLobby(false)}>Back</button>
                            </div>
                            <div className="join-container">
                                <button disabled={lobbyCode.length !== 6} onClick={joinLobby}>Join</button>
                            </div>
                        </div>
                    </>
                :
                <>
                    <Title>Guess That Task!</Title>
                    <input 
                        className="name-input"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <div className="bottom-container">
                        <div className="create-container">
                            <button onClick={createLobby} >Create a Lobby</button>
                        </div>
                        <div className="join-container">
                            <button onClick={() => setToggleJoinLobby(true)}>Join a Lobby</button>
                        </div>
                    </div>
                </>
                }
            </Center>
        </>
    )
}

const Title = styled.h1`
    color: black;
    font-size: 60px;
    margin-block-start: 0em;
    // position: absolute;
    // left: 50%;
`

const Center = styled.div`
background: #ffd892;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
border-radius: 6px;
padding: 50px;
// min-height: 450px;
min-width: 500px;
& h1 {
    text-align: center;
}
.name-input {
    display: block;
    margin-bottom: 1rem;
    margin-right: auto;
    margin-left: auto;
    background: none;
    outline: none;
    width: 300px;
    text-align: center;
    font-weight: 200;
    font-size: 25px;
    border: none;
    border-bottom: 2px solid #b17822;
}
.input-code {
    display: block;
    margin-bottom: 1rem;
    margin-right: auto;
    margin-left: auto;
    margin-block-end: 0.67em;
    background: #fff;
    outline: none;
    width: 300px;
    text-align: center;
    font-weight: 200;
    font-size: 50px;
    // border: none;
}
.bottom-container {
    display: flex;
    justify-content: space-between;
    .middle-container {
        border-right: 3px solid #1a141466;
    }
    .create-container {
        .back-button{
            background: red;
            color: white;
        }
    }
    & button {
        font-size: 20px;
        background: #fff no-repeat 50%;
        background-size: 40px 40px;
        // color: #404136;
        padding: 10px 25px;
        position: relative;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 600;
        border: 0;
        width: 100%;
        // width: 10rem;
        cursor: pointer;
        outline: none;
        transition: .3s ease-out;
        :hover {
            transform: scale(1.05);
        }
    }
}
`

export default Home