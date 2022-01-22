import React, {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PlayerList from '../src/components/lobby/PlayerList'
import Rules from '../src/components/lobby/Rules'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {io} from 'socket.io-client'
import Error from 'next/error'
import { useBeforeunload } from 'react-beforeunload';
import { IoArrowBackCircleSharp } from 'react-icons/io5'

import Tutorial from '../src/components/home/Tutorial'
import Game from '../src/components/game/Game'

const production = 'https://guess-that-task-server.herokuapp.com';
const development = 'http://localhost:4000'
const url = process.env.NODE_ENV === 'development' ? development : production;

const Lobby = ({ errorCode, lobby }) => {
    const router = useRouter()
    const { lobby_code } = router.query
    const user = useSelector(state => state.user)
    const owner = lobby.owner._id === user.info._id ? true: false
    const [socket, setSocket] = useState(null)
    const [players, setPlayers] = useState(lobby.players)
    const [startGame, setStartGame] = useState(false)
    
    useEffect(() => {
        setSocket(io(url))
    }, [])

    useEffect(() => {
        socket?.emit("room", lobby_code, user.info)
        socket?.on("playerJoined", data => {
            if (!players.map(player => player._id).includes(data._id)) {
                setPlayers(players => [...players, data])
            }
        })
        socket?.on("playerLeft", data => {
            setPlayers(players => players.filter(player => player._id !== data._id))
        })
        socket?.on("message", data => {
            console.log(data)
        })
        socket?.on("goBack", data => {
            if (data) {
                socket?.emit('leaveRoom', user.info)
                router.push('/')
            }
        })
        socket?.on('startGame', () => {
            setStartGame(true)
        })
        socket?.on('endGame', () => {
            setStartGame(false)
        })
    }, [socket])

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }
    else if (!lobby.players.find(player => player._id === user.info._id)) {
        return <Error statusCode={404}/>
    }

    const leaveLobby = () => {
        if (owner) {
            fetch(`${url}/lobbies/${lobby_code}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            socket?.emit('roomCanceled', true)
        } 
        else{
            fetch(`${url}/lobbies/${lobby_code}/${user.info._id}/remove`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playerId: user.info._id,
                })
            })
            socket?.emit('leaveRoom', user.info)
            router.push('/')
        }
    }

    if (!startGame) {
        return (
            <>
                <Head>
                    <title>Guess That Task</title>
                    <link rel="shortcut icon" href="/red-among-us-png.png" />
                </Head>
                <div>
                    <Header>
                        <BackButton onClick={leaveLobby}/>
                        <h1>Lobby Code: {lobby_code}</h1>
                        <Tutorial />
                    </Header>
                    <MainContainer>
                        <PlayerList players={players}/>
                        <Rules />
                    </MainContainer>
                </div>
                <ButtonDiv>
                    <button onClick={() => socket?.emit("startGame")}>
                        Start Game
                    </button>
                </ButtonDiv>
            </>
        )
    } else return <Game socket={socket} />

}

export async function getServerSideProps(context, req) {
    // const router = useRouter()
    // const { lobby_code } = router.query
    const lobby_code = context.params.lobby_code
    //
    const res = await fetch(`${url}/lobbies/${lobby_code}`);
    const errorCode = res.ok ? false : res.status;
    let json = null
    if (errorCode === false) {
        json = await res.json()
    }

    return {
        props: { errorCode, lobby: json}
    };
}

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & button {
        background: #fff no-repeat 50%;
        background-size: 40px 40px;
        padding: 10px 25px;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: .3s ease-out;
        :hover {
            transform: scale(1.05);
        }
    }
`

const BackButton = styled(IoArrowBackCircleSharp)`
    font-size: 80px;
    cursor: pointer;
    color: #775312;
    transition-duration: 0.5s;
    &:hover {
        color: #e29100;
    }
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const MainContainer = styled.div`
    display: flex;
    margin: auto;
    // width: 65%;
    @media (min-width:320px){
        width: 98%;
    }
    @media (min-width:600px){
        width: 75%;
    }
    @media (min-width:900px){
        margin-top: 100px;
        width: 80%;
    }
`

export default Lobby
