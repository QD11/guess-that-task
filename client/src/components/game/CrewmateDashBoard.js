import React, {useEffect, useContext, useState} from 'react';
import {SocketContext} from '../../../pages/_app'
import styled from 'styled-components'
import Image from 'next/image'

const CrewmateDashBoard = () => {
    const socket = useContext(SocketContext)
    const [task, setTask] = useState(null)

    useEffect(() => {
        socket.on('getTask', data => {
            setTask(data)
        })
    }, [socket])

    return(
        <div>
            <TaskDiv>
                <span className='title'>Your Task</span>
                <span className='task'>{task?.task}</span>
                {task?.image && 
                    <Image 
                        src={task?.image.src}
                        alt={task?.image.alt}
                        width={100}
                        height={100}
                    />
                }
                {task?.extra && <span className='extra'>{task?.extra}</span>}
            </TaskDiv>
        </div>
    )
};

const TaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    //border: 0.5px solid black;
    background-color: #faf158;
    border-radius: 10px;
    min-height: 7em;
    width: 50%;
    margin: auto auto;
    .title {
        margin: 0 auto;
        font-weight: bold;
    }
    .task {
        font-size: 25px;
    }
`

export default CrewmateDashBoard;
