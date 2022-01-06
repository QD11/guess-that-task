import React from 'react'
import { useRouter } from 'next/router'
import PlayerList from '../src/components/lobby/PlayerList'

const Lobby = () => {
    const router = useRouter()
    const { lobby_code } = router.query

    return (
        <div>
            <h1>Lobby Code: {lobby_code}</h1>
            <PlayerList />
        </div>
    )
}

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
