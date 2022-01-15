import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PlayerList from '../src/components/lobby/PlayerList'
import Rules from '../src/components/lobby/Rules'
import styled from 'styled-components'

import Tutorial from '../src/components/home/Tutorial'

const Lobby = () => {
    const router = useRouter()
    const { lobby_code } = router.query

    return (
        <>
            <Head>
                <title>Guess That Task - Lobby</title>
                <link rel="shortcut icon" href="/red-among-us-png.png" />
            </Head>
            <div>
                <div>
                    <Tutorial />
                    <h1>Lobby Code: {lobby_code}</h1>
                </div>
                <MainContainer>
                    <PlayerList />
                    <Rules />
                </MainContainer>
            </div>
        </>
    )
}

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
