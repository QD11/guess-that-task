import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components'
import React, {useState, useEffect, useRef} from 'react'
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { getUserID, changeUserName } from '../src/redux/userSlice'
import cookie from 'js-cookie'

import Tutorial from '../src/components/home/Tutorial'

const production = 'https://guess-that-task-server.herokuapp.com';
const development = 'http://localhost:4000'
const url = process.env.NODE_ENV === 'development' ? development : production;

const Home = ({user, getUserID, changeUserName}) => {
    const router = useRouter()
    const [id, setId] = useState('')
    const [name, setName] = useState(uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        length: 2,
        style: 'capital',
        separator: ' ',
    }))
    const [toggleJoinLobby, setToggleJoinLobby] = useState(false)
    const [lobbyCode, setLobbyCode] = useState('')
    const [errorCode, setErrorCode] = useState(false)
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (!user.message ) {
            setId(user._id)
            setName(user.name)
            // getUserID({info: user})
            getUserID(user)
            // fetch(`${url}/players/${user.id}`)
            // .then(res => res.json())
            // .then(player => {
            //     dispatch(getUserID({
            //         info: player
            //     }))
            // })
        } else {
            fetch(`${url}/players`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: name})
            })
            .then(res => res.json())
            .then(player => {
                setId(player._id)
                cookie.set("user", player._id)
                // getUserID({info: player})
                getUserID(player)
            })}
    }, [])
    // cookie.remove("user") //remove user cookie
    
    const createLobby = () => {
        const newCode = uuid().slice(0,6).toUpperCase()
        fetch(`${url}/lobbies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: newCode,
                owner: id,
            })
        })
        .then(res => res.json())
        .then(lobby => router.push(`/${lobby.code}`))
    }

    const joinLobby = () => {
        //check if lobby code exists
        fetch(`${url}/lobbies/${lobbyCode}`)
        .then(res => res.json())
        .then(lobby => {
            if (lobby) {
                if (lobby.players.length === 10) {
                    setErrorCode(true)
                    console.log('No Code Found')
                }
                else if (!lobby.players.find(player => player._id === id)) {
                    fetch(`${url}/lobbies/${lobbyCode}/${id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            playerId: id,
                        })
                    })
                    .then(res => res.json())
                    .then(lobby => {
                        setErrorCode(false)
                        router.push(`/${lobby.code}`)
                    })
                } else {
                    setErrorCode(false)
                    router.push(`/${lobby.code}`)
                }
            } else {
                setErrorCode(true)
                console.log('No Code Found')
            }
        })
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            fetch(`${url}/players/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: name})
            })
            changeUserName(name)
        }
    })

    return (
        <>
            <Head>
                <title>Guess That Task</title>
                <link rel="shortcut icon" href="/red-among-us-png.png" />
            </Head>
            {/* <Title>
                Guess That Task!
            </Title> */}
            <Container>
                <Tutorial />
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
                                maxLength="15"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <div className="bottom-container">
                                <div className="create-container">
                                    <button className="back-button" onClick={() => setToggleJoinLobby(false)}>Back</button>
                                </div>
                                <div className="create-container">
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
                            maxLength="15"
                            onChange={e => setName(e.target.value)}
                        />
                        <div className="bottom-container">
                            <div className="create-container">
                                <button onClick={createLobby} >Create Lobby</button>
                            </div>
                            <div className="create-container">
                                <button onClick={() => setToggleJoinLobby(true)}>Join Lobby</button>
                            </div>
                        </div>
                    </>
                    }
                </Center>
            </Container>
        </>
    )
}

export async function getServerSideProps({req, res}) {

    let data = {message: 'test'}
    if (req.cookies.user) {
        const response = await fetch(`${url}/players/${req.cookies.user}`)
        if (response.ok){
            data = await response.json()
        }
    }

    return { props: {user: data}}
}

const mapDispatchToProps = (dispatch) => {
    return {
        // logout: (id) => {
        //     dispatch(logout(id));
        //     dispatch(clearOnLogout());
        // },
        getUserID: (id) => {
            dispatch(getUserID(id));
        },
        changeUserName: (name) => {
            dispatch(changeUserName(name))
        }
    };
};

export default connect(null, mapDispatchToProps)(Home);

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h1`
    font-family: VCR OSD Mono;
    color: black;
    font-size: 60px;
    margin-block-start: 0em;
    // position: absolute;
    // left: 50%;
`

const Center = styled.div`
    background: #ffd892;
    // position: fixed;
    margin: auto auto;
    margin-bottom: 50px;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%, -50%);
    border-radius: 6px;
    padding: 50px;
    // min-height: 450px;
    @media (min-width:320px){
        width: 90%;
    }
    @media (min-width:600px){
        width: 75%;
    }
    @media (min-width:900px){
        margin-top: 50px;
        width: 35%;
    }

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
        // width: 300px;
        width: 100%;
        text-align: center;
        font-weight: 200;
        font-size: 40px;
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
        // width: 300px;
        width: 100%;
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
            // color: #404136;
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
`

// export default Home