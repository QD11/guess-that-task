import React, {useEffect, useContext, useState} from 'react';
import CrewmateModal from './CrewmateModal'
import {SocketContext} from '../../../pages/_app'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Image from 'next/image'

const CrewmateDashBoard = ({imposters, crewmates, user}) => {
    const socket = useContext(SocketContext)
    const [task, setTask] = useState(null)
    const [taskComplete, setTaskComplete] = useState(false)
    const [playersTasks, setPlayersTasks] = useState(crewmates.map(crewmate => {
        return ({
            ...crewmate,
            taskComplete: false
        })
    }))
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        socket.on('getTask', data => {
            setTask(data)
        })
        socket.on('confirmGuess', id => {
            if (user._id === id) {
                setModal(modal => !modal)
            }
        })
        socket.on('updatedTasksStatus', data => {
            setPlayersTasks(playersTasks => playersTasks.map(playersTask => {
                if (data.user._id === playersTask._id) {
                    return({
                        ...playersTask,
                        taskComplete: data.taskComplete
                    })
                } else {
                    return {...playersTask}
                }
            }))
        })

        return () => {
            socket.removeAllListeners("getTask");
            socket.removeAllListeners("updatedTasksStatus");
            socket.removeAllListeners("confirmGuess");
        };
    }, [socket])

    useEffect(() => {
        socket.emit('tasksStatus', {user, taskComplete})
    }, [taskComplete])

    return(
        <MainDiv>
            <CrewmateModal modal={modal} toggleModal={toggleModal}/>
            <PlayersDiv>
                <span className="user-status">{user.name}{taskComplete?"✔️":"❌"}</span>
                {playersTasks?.map(crewmate => <span key={crewmate._id} className="player-status">{crewmate.name}{crewmate.taskComplete?"✔️":"❌"}</span>)}
            </PlayersDiv>
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
                {task?.extra && 
                    <>
                        <span>Extra Rules: </span>
                        <span className='extra'>{task?.extra}</span>
                    </>
                }
                <button className="toggle-task" onClick={() => setTaskComplete(taskComplete => !taskComplete)} >{taskComplete? "Not Completed?" : "Completed?"}</button>
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

const PlayersDiv = styled.div`
    display: flex;
    flex-direction: column;
    // width: 20%;
    background-color: #faf158;
    border-radius: 10px;
    padding: 10px;
    .user-status {
        font-size: 23px;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .player-status {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 5px;
    }
    & span {
        margin: 5px 0 0 0;
        background: #fff no-repeat 50%;
        background-size: 40px 40px;
        padding: 10px 25px;
        border: 2px solid black;
        border-radius: 4px;
        transition: .3s ease-out;
    }
    overflow: auto;
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
        margin: 5px 0px;
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

const mapStateToProps = (state) => {
    return {
        user: state.user.info,
    };
};

export default connect(mapStateToProps, null)(CrewmateDashBoard);
