import React, {useState, useEffect, useRef} from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PlayerList from '../src/components/lobby/PlayerList'
import Rules from '../src/components/lobby/Rules'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {io} from 'socket.io-client'
import Error from 'next/error'

import Tutorial from '../src/components/home/Tutorial'

const Lobby = ({ errorCode, lobby }) => {
    const router = useRouter()
    const { lobby_code } = router.query
    const user = useSelector(state => state.user)
    // const [socket, setSocket] = useState(null)
    const socket = useRef(io("https://guess-that-task-server.herokuapp.com/"))

    // useEffect(() => {
    //     setSocket(io("https://guess-that-task-server.herokuapp.com/"))
    // }, [])

    useEffect(() => {
        socket?.on("room", lobby_code)
        socket.on("message", data => {
            console.log(data)
        })
    }, [socket])

    if (errorCode) {
        return <Error statusCode={errorCode} />
    }
    else if (!lobby.players.find(player => player._id === user.id)) {
        return <Error statusCode={404}/>
    }
    

    // const router = useRouter()
    // const { lobby_code } = router.query

    return (
        <>
            <Head>
                <title>Guess That Task - Lobby</title>
                <link rel="shortcut icon" href="/red-among-us-png.png" />
            </Head>
            <div>
                <Header>
                    <Tutorial />
                    <h1>Lobby Code: {lobby_code}</h1>
                </Header>
                <MainContainer>
                    <PlayerList />
                    <Rules />
                </MainContainer>
            </div>
        </>
    )
}

export async function getServerSideProps(context, req) {
    // const router = useRouter()
    // const { lobby_code } = router.query
    const lobby_code = context.params.lobby_code
    //
    const res = await fetch(`https://guess-that-task-server.herokuapp.com/lobbies/${lobby_code}`);
    const errorCode = res.ok ? false : res.status;
    let json = null
    if (errorCode === false) {
        json = await res.json()
    }

    return {
        props: { errorCode, lobby: json}
    };
}

const Header = styled.div`
    display: flex;
    flex-direction: row;
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

//use getStaticPaths as well as getStaticProps
// export async function getStaticPaths() {
//     // Call an external API endpoint to get posts
//     const res = await fetch('https://.../posts')
//     const lobbies = await res.json()

//     // Get the paths we want to pre-render based on posts
//     const paths = lobbies.map((lobby) => ({
//     params: { id: post.id },
//     }))

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
// }

// export async function getStaticProps() {
//     // Call an external API endpoint to get posts
//     const res = await fetch('https://.../posts')
//     const posts = await res.json()

//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//         props: {
//         posts,
//         },
//     }
// }


export default Lobby
