import React, {useEffect, useContext, useState} from 'react';
import {SocketContext} from '../../../pages/_app'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Image from 'next/image'

const CrewmateDashBoard = ({players}) => {
    const socket = useContext(SocketContext)
    const user = useSelector(state => state.user)
    const [task, setTask] = useState(null)
    const [taskComplete, setTaskComplete] = useState(false)

    useEffect(() => {
        socket.on('getTask', data => {
            setTask(data)
        })
        socket.on('updatedTasksStatus', data => {
            console.log(data)
        })
    }, [socket])

    const changeTaskStatus = () => {
        setTaskComplete(taskComplete => !taskComplete)
        socket.emit('tasksStatus', {user, taskComplete})
    }


    return(
        <MainDiv>
            <TaskDiv>
                <span className='title'>Your Task</span>
                <span className='task'>{task?.task}</span>
                {task?.image && 
                    <Image
                        className="task-image"
                        src={task?.image.src}
                        alt={task?.image.alt}
                        width={300}
                        height={400}
                    />
                }
                {task?.extra && <span className='extra'>{task?.extra}</span>}
                <button className="toggle-task" onClick={changeTaskStatus}>{taskComplete? "Not Completed?" : "Completed?"}</button>
            </TaskDiv>
        </MainDiv>
    )
};

const MainDiv = styled.div`
    display: flex;
    margin: 20px 0px;
    .complete-task {
        display: flex;
        flex-direction: column;
        padding: 10px;
        //border: 0.5px solid black;
        background-color: #faf158;
        border-radius: 10px;
        min-height: 3em;
    }
`

const TaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    //border: 0.5px solid black;
    background-color: #faf158;
    border-radius: 10px;
    min-height: 7em;
    width: 60%;
    margin: auto auto;
    .title {
        margin: 0 auto;
        font-weight: bold;
        font-size: 20px;
    }
    .task {
        margin: 10px 0px;
        display: flex;
        font-size: 25px;
    }
    .task-image {
        margin: 20px 0px;
    }
    .extra {
        margin: 10px 0px;
    }
    .toggle-task {
        margin: 20px 0 0 0;
        background: #fff no-repeat 50%;
        background-size: 40px 40px;
        padding: 10px 25px;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: .3s ease-out;
        // :hover {
        //     transform: scale(1.05);
        // }
    }
`

export default CrewmateDashBoard;
